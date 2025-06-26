import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardEvents from "../components/Admin/AdminDashboardEvents.jsx";

const AdminDashboardEventsPage = () => {
  return (
    <div>
      <div>
        <AdminHeader />
        <div className="flex items-start justify-between w-full">
          <div className="800px:w-[330px] w-[80px]">
            <AdminSideBar active={6} />
          </div>
          <AdminDashboardEvents />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEventsPage;
