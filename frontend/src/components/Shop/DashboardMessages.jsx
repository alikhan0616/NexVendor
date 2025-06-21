import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GrGallery } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import styles from "../../styles/styles";
const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);

  const [conversation, setConversation] = useState([]);
  const [open, setOpen] = useState(false);

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
              <MessageList key={index} data={item} setOpen={setOpen} />
            ))
          ) : (
            <div>No conversations yet!</div>
          )}
        </>
      )}

      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageList = ({ data, setOpen }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div
      onClick={(e) => handleClick(data._id)}
      className={`w-full flex p-3 px-3 
        hover:bg-[#f0f2f5]
      cursor-pointer`}
    >
      <div className="relative">
        <img
          src="http://localhost:8000//351a07308734aa35d584d022706c89f1-1749814056835-220269577.png"
          alt="user-icon"
          className="w-[50px] h-[50px] rounded-full"
        />
        <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]"></div>
      </div>
      <div className="pl-3">
        <h1 className=" text-slate-800 text-[16px]">Ali Khan</h1>
        <p className="text-[14px] text-[#000c] ">You: Hey, How are you?</p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen }) => {
  return (
    <div className="w-full flex flex-col justify-between min-h-full">
      {/* Message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src="http://localhost:8000//351a07308734aa35d584d022706c89f1-1749814056835-220269577.png"
            alt="avatar"
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[16px] font-[600]">Ali Khan</h1>
            <h1 className="text-[12px]">Active Now</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          className="cursor-pointer"
          onClick={() => setOpen(false)}
          size={20}
        />
      </div>

      {/* Messages */}
      <div className="px-2 h-[62vh] overflow-y-auto py-3">
        <div className="flex w-full my-2">
          <img
            className="w-[40px] h-[40px] rounded-full mr-3"
            src="http://localhost:8000//351a07308734aa35d584d022706c89f1-1749814056835-220269577.png"
            alt="avatar"
          />
          <div className="w-max p-2 rounded-md bg-[#DCF8C6] h-min">
            <p className="text-[#000000]">Hello there!</p>
          </div>
        </div>

        <div className="flex justify-end w-full my-2">
          <div className="w-max p-2 rounded-md bg-[#DCF8C6] h-min">
            <p className="text-[#000000]">Hey!</p>
          </div>
        </div>
      </div>
      {/* Send Message input */}
      <form
        aria-required={true}
        className="p-3 w-full relative flex justify-between items-center"
      >
        <div className="w-[3%]">
          <GrGallery size={20} className="cursor-pointer" />
        </div>
        <div className="w-[97%] relative">
          <input
            type="text"
            required
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
