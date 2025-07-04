import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active }) => {
  const menuItems = [
    { label: "Dashboard", icon: RxDashboard, path: "/dashboard" },
    { label: "All Orders", icon: FiPackage, path: "/dashboard-orders" },
    { label: "All Products", icon: FiShoppingBag, path: "/dashboard-products" },
    {
      label: "Create Products",
      icon: AiOutlineFolderAdd,
      path: "/dashboard-create-products",
    },
    {
      label: "All Events",
      icon: MdOutlineLocalOffer,
      path: "/dashboard-events",
    },
    {
      label: "Create Events",
      icon: VscNewFile,
      path: "/dashboard-create-events",
    },
    {
      label: "Withdraw Money",
      icon: CiMoneyBill,
      path: "/dashboard-withdraw-money",
    },
    {
      label: "Shop Inbox",
      icon: BiMessageSquareDetail,
      path: "/dashboard-messages",
    },
    {
      label: "Discount Codes",
      icon: AiOutlineGift,
      path: "/dashboard-coupons",
    },
    {
      label: "Refunds",
      icon: HiOutlineReceiptRefund,
      path: "/dashboard-refunds",
    },
    { label: "Settings", icon: CiSettings, path: "/settings" },
  ];

  return (
    <div className="w-full h-[95vh] bg-white shadow-md sticky top-0 left-0 z-10 flex flex-col py-4 overflow-y-auto">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = active === index + 1;
        return (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-orange-50 ${
              isActive ? "bg-orange-100" : ""
            }`}
          >
            <Icon size={24} color={isActive ? "#B66E41" : "#555"} />
            <span
              className={`text-base font-medium hidden 800px:inline ${
                isActive ? "text-[#B66E41]" : "text-[#555]"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardSideBar;
