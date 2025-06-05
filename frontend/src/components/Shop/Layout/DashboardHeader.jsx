import React from "react";
import { useSelector } from "react-redux";
import logo from "../../../assets/N-removebg-preview.png";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] px-4 bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between">
      <div>
        <Link to="/dashboard">
          <img className="w-18 h-18" src={logo} alt="website-logo" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/coupons">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer 800px:block hidden"
            />
          </Link>
          <Link to="/dashboard-events">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer 800px:block hidden"
            />
          </Link>
          <Link to="/dashboard-products">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer 800px:block hidden"
            />
          </Link>
          <Link to="/dashboard-orders">
            <FiPackage
              color="#555"
              size={30}
              className="mx-5 cursor-pointer 800px:block hidden"
            />
          </Link>
          <Link to="/dashboard-messages">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className="mx-5 cursor-pointer 800px:block hidden"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${backend_url}${seller.avatar}`}
              alt="shop-icon"
              className="w-12 h-12 rounded-full object-cover "
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
