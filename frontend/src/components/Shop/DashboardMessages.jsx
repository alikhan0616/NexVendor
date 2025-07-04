import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import styles from "../../styles/styles";
import { format } from "timeago.js";
import { RiGalleryLine } from "react-icons/ri";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:4000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);

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

  useEffect(() => {
    async function getConversations() {
      await axios
        .get(
          `${server}/conversation/get-all-conversations-seller/${seller._id}`,
          { withCredentials: true }
        )
        .then((res) => {
          setConversation(res.data.conversations);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
    getConversations();
  }, [seller, messages]);

  // get online status
  useEffect(() => {
    if (seller) {
      const userId = seller?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller._id);
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
      sender: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
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
      lastMessageId: seller._id,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        // updated
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
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      images: image,
    });

    try {
      await axios
        .post(
          `${server}/message/create-new-message`,
          {
            images: image,
            sender: seller._id,
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
    }
  };

  const updateLastMessageForImage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: "Photo",
      lastMessageId: seller._id,
    });
    await axios.put(
      `${server}/conversation/update-last-message/${currentChat._id}`,
      {
        lastMessage: "Photo",
        lastMessageId: seller._id,
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 to-orange-100 flex justify-center items-start py-8">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6">
        {/* Sidebar: Conversation List */}
        <div className="w-full h-screen md:w-1/3 bg-white rounded-2xl shadow-xl p-4 flex flex-col  min-h-[400px]">
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
                  me={seller._id}
                  userData={userData}
                  setUserData={setUserData}
                  online={onlineCheck(item)}
                  isLoading={isLoading}
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
        <div className="w-full h-screen md:w-2/3 flex flex-col  min-h-[400px]">
          {!open ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <span className="text-slate-400 text-lg">
                Select a conversation to start chatting
              </span>
            </div>
          ) : (
            <SellerInbox
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              sellerId={seller._id}
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
  isLoading,
}) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setCurrentChat(data);
    setUserData(user);
    setOpen(true);
  };
  useEffect(() => {
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [me, data]);

  return (
    <div
      onClick={(e) => handleClick(data._id)}
      className={`w-full flex p-3 px-3 hover:bg-[#f0f2f5] cursor-pointer rounded-lg transition`}
    >
      <div className="relative">
        <img
          src={user?.avatar?.url}
          alt="user-icon"
          className="w-[50px] h-[50px] rounded-full object-cover border border-orange-100"
        />
        <div
          className={`w-[12px] h-[12px] rounded-full absolute top-[2px] right-[2px] ${
            online ? "bg-green-400" : "bg-gray-400"
          } border-2 border-white`}
        ></div>
      </div>
      <div className="pl-3 flex flex-col justify-center">
        <h1 className="text-slate-800 text-[16px] font-semibold">
          {user?.name}
        </h1>
        {user && user.name && (
          <p className="text-[14px] text-[#000c]">
            {!isLoading && data?.lastMessageId !== user?._id
              ? "You"
              : user?.name.split(" ")}
            : {data?.lastMessage || "-"}
          </p>
        )}
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="w-full flex flex-col justify-between min-h-full bg-white rounded-2xl shadow-xl">
      {/* Message header */}
      <div className="w-full flex p-4 items-center justify-between bg-slate-200 rounded-t-2xl">
        <div className="flex items-center">
          <img
            src={userData?.avatar?.url}
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full object-cover border border-orange-100"
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
          size={24}
        />
      </div>

      {/* Messages */}
      <div className="px-4 h-[52vh] overflow-y-auto py-3 flex-1">
        {messages && messages.length > 0 ? (
          messages.map((item, index) => (
            <div
              key={index}
              ref={scrollRef}
              className={`flex w-full ${
                item?.sender === sellerId ? "justify-end" : "flex"
              } my-2`}
            >
              {item.sender !== sellerId && (
                <img
                  className="w-[40px] h-[40px] rounded-full mr-3 object-cover border border-orange-100"
                  src={userData?.avatar?.url}
                  alt="avatar"
                />
              )}

              {item.images && (
                <div>
                  <img
                    src={item.images.url}
                    alt="corrupted-image"
                    className="w-[300px] h-[300px] object-contain rounded-[10px] mt-5 mr-5 mb-1"
                  />
                  <p
                    className={`${
                      item.sender === sellerId ? "text-end" : "text-start"
                    } text-xs text-[#000000d3] mb-5`}
                  >
                    {format(item?.createdAt)}
                  </p>
                </div>
              )}
              {item.text !== "" && (
                <div>
                  <div className="w-max p-2 rounded-md bg-[#DCF8C6] h-min">
                    <p className="text-[#000000]">{item.text}</p>
                  </div>
                  {!item.images && (
                    <p
                      className={`${
                        item.sender === sellerId ? "text-end" : "text-start"
                      } text-xs text-[#000000d3] mb-5`}
                    >
                      {format(item?.createdAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400">
            <span className="text-lg font-semibold">No messages yet</span>
          </div>
        )}
      </div>

      {/* Send Message input */}
      <form
        aria-required={true}
        onSubmit={sendMessageHandler}
        className="p-4 w-full flex items-center gap-2 border-t border-slate-100 rounded-b-2xl"
      >
        <div>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <RiGalleryLine
              size={22}
              className="cursor-pointer text-[#B66E41]"
            />
          </label>
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            required
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Enter your message..."
            className="w-full px-4 py-2 border border-slate-200 rounded-md focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none"
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <FiSend
              size={22}
              className="cursor-pointer absolute right-3 top-2 text-[#B66E41]"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
