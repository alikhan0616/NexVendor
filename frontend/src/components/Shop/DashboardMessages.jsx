import React from "react";

const DashboardMessages = () => {
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-auto rounded">
      <h1 className="text-center text-3xl font-[Poppins] my-5">All Messages</h1>

      {/* All messages */}

      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
    </div>
  );
};

const MessageList = () => {
  return (
    <div className="w-full flex p-3 px-3 hover:bg-[#f0f2f5] cursor-pointer">
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

export default DashboardMessages;
