import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardOrders from "../components/Admin/AdminDashboardOrders.jsx";
const AdminDashboardOrdersPage = () => {
  return (
    <div>
      <div>
        <AdminHeader />
        <div className="flex items-start justify-between w-full">
          <div className="800px:w-[330px] w-[80px]">
            <AdminSideBar active={2} />
          </div>
          <AdminDashboardOrders />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrdersPage;
