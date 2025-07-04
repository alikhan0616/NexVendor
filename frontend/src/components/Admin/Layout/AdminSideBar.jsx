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
  const sidebarItems = [
    {
      label: "Dashboard",
      icon: RxDashboard,
      id: 1,
      to: "/admin/dashboard",
    },
    {
      label: "All Orders",
      icon: FiPackage,
      id: 2,
      to: "/admin-orders",
    },
    {
      label: "All Sellers",
      icon: GrWorkshop,
      id: 3,
      to: "/admin-sellers",
    },
    {
      label: "All Users",
      icon: HiOutlineUserGroup,
      id: 4,
      to: "/admin-users",
    },
    {
      label: "All Products",
      icon: FiShoppingBag,
      id: 5,
      to: "/admin-products",
    },
    {
      label: "All Events",
      icon: MdOutlineLocalOffer,
      id: 6,
      to: "/admin-events",
    },
    {
      label: "Withdraw Money",
      icon: CiMoneyBill,
      id: 7,
      to: "/admin-withdraw-request",
    },
    {
      label: "Settings",
      icon: AiOutlineSetting,
      id: 8,
      to: "/profile",
    },
  ];

  return (
    <div className="bg-white shadow-xl rounded-2xl flex flex-col gap-2 items-center w-16 min-w-16 h-[95vh] overflow-hidden sticky top-0 left-0 z-10 md:w-full md:min-w-0 md:p-6 md:items-stretch">
      <nav className="flex flex-col gap-2 w-full">
        <div className="flex flex-col justify-start w-full items-center md:items-stretch">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`
                  flex items-center justify-center md:justify-start
                  w-14 h-14 md:w-full md:h-auto
                  px-0 md:px-4 py-0 md:py-4
                  rounded-lg transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-orange-50 text-[#FF6F00] shadow border-l-0 md:border-l-4 border-[#FF6F00]"
                      : "hover:bg-orange-50 text-slate-700"
                  }
                `}
                title={item.label}
                onClick={() => {}}
              >
                <Icon size={28} color={isActive ? "#FF6F00" : "#B66E41"} />
                <span
                  className={`
    ml-0 md:ml-4 font-medium text-base md:text-[15px] transition-colors duration-200 truncate
    ${isActive ? "text-[#FF6F00]" : "group-hover:text-[#B66E41]"}
    hidden md:inline
  `}
                  style={{ maxWidth: "160px" }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AdminSideBar;
