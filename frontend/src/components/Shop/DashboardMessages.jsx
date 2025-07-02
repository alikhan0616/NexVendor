import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import styles from "../../styles/styles";
import { format } from "timeago.js";
import { RiGalleryLine } from "react-icons/ri";
import socketIO from "socket.io-client";
const ENDPOINT = "http://localhost:4000/";
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
  }, [seller]);

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
      (member) => member.id !== seller._id
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
      console.log("wrong");
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
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-auto rounded">
      {/* All messages */}

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
                me={seller._id}
                userData={userData}
                setUserData={setUserData}
                online={onlineCheck(item)}
                isLoading={isLoading}
              />
            ))
          ) : (
            <div>No conversations yet!</div>
          )}
        </>
      )}

      {open && (
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
    const userId = data.members.find((user) => user != me);

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
      className={`w-full flex p-3 px-3 
        hover:bg-[#f0f2f5]
      cursor-pointer`}
    >
      <div className="relative">
        <img
          src={user?.avatar?.url}
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
    <div className="w-full flex flex-col justify-between min-h-full">
      {/* Message header */}
      <div
        className={`w-full flex p-3 items-center justify-between bg-slate-200`}
      >
        <div className="flex">
          <img
            src={userData?.avatar?.url}
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
                key={index}
                ref={scrollRef}
                className={`flex 

                -mb-5 w-full ${
                  item?.sender === sellerId ? "justify-end" : "flex"
                } my-2`}
              >
                {item.sender !== sellerId && (
                  <img
                    className="w-[40px] h-[40px] rounded-full mr-3"
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
                  <div className="">
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
            accept=".jpg,.jpeg,.png"
            id="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <RiGalleryLine size={20} className="cursor-pointer" />
          </label>
        </div>
        <div className="w-[97%] relative">
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
export default DashboardMessages;
