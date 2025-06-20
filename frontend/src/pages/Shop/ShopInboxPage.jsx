import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardMessages from "../../components/Shop/DashboardMessages.jsx";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSideBar active={8} />
        </div>
        <div className="w-full justify-center flex">
          <DashboardMessages />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
