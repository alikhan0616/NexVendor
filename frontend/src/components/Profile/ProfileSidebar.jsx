import React from "react";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  AiOutlineCreditCard,
  AiOutlineLogin,
  AiOutlineMessage,
} from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "#FF6F00" : ""} />
        <span className={`${active === 1 ? "text-[#FF6F00]" : ""} pl-3`}>
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "#FF6F00" : ""} />
        <span className={`${active === 2 ? "text-[#FF6F00]" : ""} pl-3`}>
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund
          size={20}
          color={active === 3 ? "#FF6F00" : ""}
        />
        <span className={`${active === 3 ? "text-[#FF6F00]" : ""} pl-3`}>
          Refund
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#FF6F00" : ""} />
        <span className={`${active === 4 ? "text-[#FF6F00]" : ""} pl-3`}>
          Inbox
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges
          size={20}
          color={active === 5 ? "#FF6F00" : ""}
        />
        <span className={`${active === 5 ? "text-[#FF6F00]" : ""} pl-3`}>
          Track Order
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard size={20} color={active === 6 ? "#FF6F00" : ""} />
        <span className={`${active === 6 ? "text-[#FF6F00]" : ""} pl-3`}>
          Payment Methods
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "#FF6F00" : ""} />
        <span className={`${active === 7 ? "text-[#FF6F00]" : ""} pl-3`}>
          Address
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(8)}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "#FF6F00" : ""} />
        <span className={`${active === 8 ? "text-[#FF6F00]" : ""} pl-3`}>
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
