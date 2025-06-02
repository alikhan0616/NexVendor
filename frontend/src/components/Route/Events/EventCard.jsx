import React from "react";
import styles from "../../../styles/styles.js";
import CountDown from "./CountDown.jsx";

const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 `}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src="https://i01.hsncdn.com/is/image/HomeShoppingNetwork/rocs1200/apple-macbook-pro-13-m2-256gb-8-core-cpu-10-core-gpu-bu-d-20240130111145193~20629088w_alt2.jpg"
          alt="product-img"
        />
      </div>
      <div className="w-full lg:w-[50%] m-auto flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>
          Iphone 14 Pro Max 128GB SSD
        </h2>
        <p className="text-slate-800">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut ullam
          dolor odio hic veritatis aliquam eos corporis illum. Incidunt sit
          consectetur pariatur recusandae quia ea voluptate voluptatibus officia
          unde culpa! Ab fugiat necessitatibus ipsum veritatis eveniet excepturi
          nulla vitae dolores eligendi rem tempore facilis laudantium sint harum
          pariatur quia voluptas culpa soluta quisquam, eaque deserunt quasi?
          Praesentium repellendus voluptates dicta?
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-md text-red-600 pr-3 line-through">
              1099 PKR
            </h5>
            <h5 className="font-bold text-lg text-[#333] font-[Roboto]">
              875 PKR
            </h5>
          </div>
          <span className={`pr-3 font-normal text-base text-[#44a55e]`}>
            120 Sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
