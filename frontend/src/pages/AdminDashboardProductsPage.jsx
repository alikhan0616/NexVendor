import React from "react";
import AdminHeader from "../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardProducts from "../components/Admin/AdminDashboardProducts.jsx";

const AdminDashboardProductsPage = () => {
  return (
    <div>
      <div>
        <AdminHeader />
        <div className="flex items-start justify-between w-full">
          <div className="800px:w-[330px] w-[80px]">
            <AdminSideBar active={5} />
          </div>
          <AdminDashboardProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProductsPage;
