import React from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import styles from "../../styles/styles";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const logoutHandler = () => {};
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            className="w-[150px] h-[150px] object-cover rounded-full"
            src={`${backend_url}${seller?.avatar}`}
            alt="shop-icon"
          />
        </div>
        <h3 className="text-center py-2 text-xl ">{seller?.name}</h3>
        <p className="text-base text-slate-800 p-2.5 flex items-center">
          {seller?.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Address:</h5>
        <h4 className="text-[#000000a6]">{seller?.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Phone Number:</h5>
        <h4 className="text-[#000000a6]">{seller?.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Total Products:</h5>
        <h4 className="text-[#000000a6]">9</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Shop Rating:</h5>
        <h4 className="text-[#000000a6]">3.5/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Joined On:</h5>
        <h4 className="text-[#000000a6]">{seller.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-black`}
          >
            <span className="text-white">Edit Shop</span>
          </div>
          <div
            onClick={logoutHandler}
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-red-600`}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
