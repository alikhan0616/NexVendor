import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { GrWorkshop } from "react-icons/gr";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[95vh] bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10">
      {/* SINGLE ITEMS */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "#5A67D8" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 1 ? "text-[#5A67D8]" : "text-[#555]"
            } `}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/admin-orders" className="w-full flex items-center">
          <FiPackage size={30} color={`${active === 2 ? "#1E3A8A" : "#555"}`} />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 2 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin-sellers" className="w-full flex items-center">
          <GrWorkshop
            size={30}
            color={`${active === 3 ? "#5A67D8" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 3 ? "text-[#5A67D8]" : "text-[#555]"
            } `}
          >
            All Sellers
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/admin-users" className="w-full flex items-center">
          <HiOutlineUserGroup
            size={30}
            color={`${active === 4 ? "#5A67D8" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 4 ? "text-[#5A67D8]" : "text-[#555]"
            } `}
          >
            All Users
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/admin-products" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 5 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 5 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/admin-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 6 ? "#5A67D8" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 6 ? "text-[#5A67D8]" : "text-[#555]"
            } `}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={30}
            color={`${active === 7 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 7 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/profile" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 8 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 8 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
