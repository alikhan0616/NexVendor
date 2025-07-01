import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import { backend_url, server } from "../server";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { RiGalleryLine } from "react-icons/ri";
import styles from "../styles/styles";
const ENDPOINT = "http://localhost:4000/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
const UserInbox = () => {
  const { user } = useSelector((state) => state.user);

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
  const handleImageUpload = async (e) => {
    console.log("Selected file", e.target.files[0]);
    const file = e.target.files[0];
    setImages(file);
    sendImageHandler(file);
  };

  const sendImageHandler = async (image) => {
    const formData = new FormData();

    formData.append("images", image);
    formData.append("sender", user._id);
    formData.append("text", newMessage);
    formData.append("conversationId", currentChat._id);

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
        .post(`${server}/message/create-new-message`, formData, {
          withCredentials: true,
        })
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
    <div className="w-full">
      <Header />
      {!open && (
        <>
          <h1 className="text-center text-3xl font-[Poppins] my-5">
            All Messages
          </h1>
          {conversation ? (
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
            <div>No conversations yet!</div>
          )}
        </>
      )}

      {open && (
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

    console.log(user);

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
          src={`${backend_url}${user?.avatar}`}
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
    <div className="w-full flex flex-col justify-between min-h-full mt-30">
      {/* Message header */}
      <div
        className={`w-full flex p-3 items-center justify-between bg-slate-200`}
      >
        <div className="flex">
          <img
            src={`${backend_url}${userData?.avatar}`}
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
                    src={`${backend_url}${userData?.avatar}`}
                    alt="avatar"
                  />
                )}
                {item.images && (
                  <div>
                    <img
                      src={`${backend_url}${item.images}`}
                      alt="corrupted-image"
                      className="w-[300px] h-[300px] object-cover rounded-[10px] m-5"
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
            accept="image/*"
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
