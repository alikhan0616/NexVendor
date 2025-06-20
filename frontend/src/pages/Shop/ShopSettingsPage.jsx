import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import ShopSettings from "../../components/Shop/ShopSettings.jsx";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.jsx";

const ShopSettingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <DashboardSideBar active={11} />
        </div>
        <ShopSettings />
      </div>
    </div>
  );
};

export default ShopSettingsPage;
