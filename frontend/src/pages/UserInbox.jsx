import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import { server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiGalleryLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import styles from "../styles/styles";
const ENDPOINT = "https://nexvendor-socket.onrender.com";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);

  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [images, setImages] = useState();

  const scrollRef = useRef();

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // Get conversation
  useEffect(() => {
    async function getConversations() {
      await axios
        .get(`${server}/conversation/get-all-conversations-user/${user?._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setConversation(res.data.conversations);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
    getConversations();
  }, [user, messages]);

  // get online status
  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // Get messages
  useEffect(() => {
    async function getMessages() {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, [currentChat]);

  // Create new message

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    socketId.emit("sendMessage", {
      senderId: user?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
            setNewMessage("");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: user._id,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Image upload Funtionality
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Allowed types
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Image should be in JPEG, JPG, or PNG format only.");
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImages(reader.result);
        sendImageHandler(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const sendImageHandler = async (image) => {
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      images: image,
    });

    try {
      await axios
        .post(
          `${server}/message/create-new-message`,
          {
            images: image,
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setImages();
          setMessages([...messages, res.data.message]);
          setNewMessage("");
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error.message);
      console.log("wrong");
    }
  };

  const updateLastMessageForImage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: "Photo",
      lastMessageId: user._id,
    });
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: user._id,
      }
    );
  };
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 to-orange-100">
      <Header />
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 py-8 px-2 md:px-0">
        {/* Sidebar: Conversation List */}
        <div className="w-full mt-8 sm:mt-0 md:w-1/3 bg-white rounded-2xl shadow-xl p-4 flex flex-col h-[70vh] min-h-[400px]">
          <h2 className="text-xl font-bold text-[#B66E41] mb-4 flex items-center gap-2">
            <BiMessageSquareDetail size={24} /> Conversations
          </h2>
          <div className="flex-1 overflow-y-auto">
            {conversation && conversation.length > 0 ? (
              conversation.map((item, index) => (
                <MessageList
                  key={index}
                  setCurrentChat={setCurrentChat}
                  data={item}
                  setOpen={setOpen}
                  me={user?._id}
                  userData={userData}
                  setUserData={setUserData}
                  online={onlineCheck(item)}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                <BiMessageSquareDetail size={48} className="mb-2" />
                <span className="text-lg font-semibold">
                  No active conversations
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="w-full md:w-2/3 flex flex-col h-[70vh] min-h-[400px]">
          {!open ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-slate-400 text-lg">
                Select a conversation to start chatting
              </span>
            </div>
          ) : (
            <Inbox
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              userId={user._id}
              userData={userData}
              scrollRef={scrollRef}
              handleImageUpload={handleImageUpload}
              activeStatus={onlineCheck(currentChat)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const MessageList = ({
  data,
  setOpen,
  setCurrentChat,
  me,
  userData,
  setUserData,
  online,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const handleClick = (id) => {
    navigate(`?${id}`);
    setCurrentChat(data);
    setUserData(user);
    setOpen(true);
  };

  useEffect(() => {
    const userId = data.members.find((user) => user != me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/info/${userId}`);
        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [me, data]);

  return (
    <div
      onClick={(e) => handleClick(data._id)}
      className={`w-full flex p-3 px-3 
                hover:bg-[#f0f2f5]
              cursor-pointer`}
    >
      <div className="relative">
        <img
          src={user && user?.avatar?.url}
          alt="user-icon"
          className="w-[50px] h-[50px] rounded-full"
        />
        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
        ) : (
          <div className="w-[12px] h-[12px] bg-gray-400 rounded-full absolute top-[2px] right-[2px]"></div>
        )}
      </div>
      <div className="pl-3">
        <h1 className=" text-slate-800 text-[16px]">{user?.name}</h1>
        {user && user.name && (
          <p className="text-[14px] text-[#000c] ">
            {data?.lastMessageId !== user?._id ? "You" : user?.name.split(" ")}:{" "}
            {data?.lastMessage || "-"}
          </p>
        )}
      </div>
    </div>
  );
};

const Inbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="w-full flex flex-col justify-between min-h-full mt-0">
      {/* Message header */}
      <div
        className={`w-full flex p-3 items-center justify-between bg-slate-200`}
      >
        <div className="flex">
          <img
            src={userData?.avatar.url}
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[16px] font-[600]">{userData?.name}</h1>
            <h1 className="text-[12px]">
              {activeStatus ? "Active Now" : "Inactive"}
            </h1>
          </div>
        </div>
        <AiOutlineArrowRight
          className="cursor-pointer"
          onClick={() => setOpen(false)}
          size={20}
        />
      </div>

      {/* Messages */}
      <div className={`px-2 h-[62vh] overflow-y-auto py-3`}>
        {messages &&
          messages.map((item, index) => (
            <>
              <div
                ref={scrollRef}
                key={index}
                className={`flex  w-full ${
                  item?.sender === userId ? "justify-end" : "flex"
                } my-2`}
              >
                {item.sender !== userId && (
                  <img
                    className="w-[40px] h-[40px] rounded-full mr-3"
                    src={userData?.avatar.url}
                    alt="avatar"
                  />
                )}
                {item.images && (
                  <div>
                    <img
                      src={item.images.url}
                      alt="corrupted-image"
                      className="w-[300px] h-[300px] object-contain rounded-[10px] m-5"
                    />

                    <p
                      className={`${
                        item.sender === userId ? "text-end" : "text-start"
                      } text-xs text-[#000000d3]`}
                    >
                      {format(item?.createdAt)}
                    </p>
                  </div>
                )}
                <div className="">
                  <div className="w-max p-2 rounded-md bg-[#DCF8C6] h-min">
                    <p className="text-[#000000]">{item.text}</p>
                  </div>
                  {!item.images && (
                    <p
                      className={`${
                        item.sender === userId ? "text-end" : "text-start"
                      } text-xs text-[#000000d3]`}
                    >
                      {format(item?.createdAt)}
                    </p>
                  )}
                </div>
              </div>
            </>
          ))}
      </div>

      {/* Send Message input */}
      <form
        aria-required={true}
        onSubmit={sendMessageHandler}
        className="p-3 w-full relative flex justify-between items-center"
      >
        <div className="w-[3%]">
          <input
            type="file"
            id="image"
            accept=".jpg,.jpeg,.png"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="image">
            <RiGalleryLine className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="800px:w-[97%] w-[90%] relative">
          <input
            type="text"
            required
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message..."
            className={`${styles.input} border-gray-400`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <FiSend
              size={20}
              className="cursor-pointer absolute right-4 top-2"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserInbox;
