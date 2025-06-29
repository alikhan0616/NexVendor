import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";

const AdminDashboardWithdraw = () => {
  return (
    <div>
      <div>
        <AdminHeader />
        <div className="flex items-start justify-between w-full">
          <div className="800px:w-[330px] w-[80px]">
            <AdminSideBar active={7} />
          </div>
          {/* Withdrawx */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
