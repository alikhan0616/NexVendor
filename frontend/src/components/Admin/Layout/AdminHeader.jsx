import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import logo from "../../../assets/N-removebg-preview.png";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <header className="w-full h-[72px] px-4 bg-white shadow-md sticky top-0 left-0 z-30 flex items-center justify-between transition-all">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img
          className="w-14 h-14 object-contain"
          src={logo}
          alt="website-logo"
        />
      </Link>

      {/* Navigation Icons */}
      <nav className="flex items-center gap-2 md:gap-4">
        <Link to="/admin-events" title="Events">
          <MdOutlineLocalOffer
            color="#B66E41"
            size={26}
            className="mx-2 cursor-pointer hover:bg-orange-50 hover:text-[#FF6F00] rounded-full p-1 transition-colors duration-200"
          />
        </Link>
        <Link to="/admin-products" title="Products">
          <FiShoppingBag
            color="#B66E41"
            size={26}
            className="mx-2 cursor-pointer hover:bg-orange-50 hover:text-[#FF6F00] rounded-full p-1 transition-colors duration-200"
          />
        </Link>
        <Link to="/admin-orders" title="Orders">
          <FiPackage
            color="#B66E41"
            size={26}
            className="mx-2 cursor-pointer hover:bg-orange-50 hover:text-[#FF6F00] rounded-full p-1 transition-colors duration-200"
          />
        </Link>
        <Link to="/profile" title="Profile" className="ml-2">
          <img
            src={user?.avatar.url}
            alt="user-icon"
            className="w-11 h-11 rounded-full object-cover border-2 border-orange-100 shadow-sm hover:shadow-md transition"
          />
        </Link>
      </nav>
    </header>
  );
};

export default AdminHeader;
