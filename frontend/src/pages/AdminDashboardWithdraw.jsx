import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminWithdraw from "../components/Admin/AdminWithdraw.jsx";
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
          <AdminWithdraw />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
