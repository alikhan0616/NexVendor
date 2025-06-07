import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10">
      {/* SINGLE ITEMS */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
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
        <Link to="/dashboard-orders" className="w-full flex items-center">
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
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 3 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 3 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-products"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 4 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 4 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            Create Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 5 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 5 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-events"
          className="w-full flex items-center"
        >
          <VscNewFile
            size={30}
            color={`${active === 6 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 6 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            Create Events
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
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 8 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupons" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 9 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            Discount Codes
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 10 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-settings" className="w-full flex items-center">
          <CiSettings
            size={30}
            color={`${active === 11 ? "#1E3A8A" : "#555"}`}
          />
          <h5
            className={`pl-2 text-lg font-[400] 800px:block hidden ${
              active === 11 ? "text-[#1E3A8A]" : "text-[#555]"
            } `}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
