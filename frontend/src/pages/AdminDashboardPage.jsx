import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader.jsx";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar.jsx";
import AdminDashboardHero from "../components/Admin/AdminDashboardHero.jsx";
const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex items-start justify-between w-full">
        <div className="800px:w-[330px] w-[80px]">
          <AdminSideBar active={1} />
        </div>
        <AdminDashboardHero />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
