import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersUser } from "../redux/actions/order";
import { backend_url } from "../server";

const UserOrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch]);

  const orderUpdateHandler = (e) => {};

  const data = orders && orders.find((item) => item._id === id);
  return (
    <div className={`${styles.section} py-4 min-h-screen `}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="#5A67D8" />
          <h1 className="pl-2 text-2xl">Order Details</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>{data?._id.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      {/* Order Items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt="product-img"
              className="w-[80px] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-xl">{item.name}</h5>
              <h5 className="pl-3 text-xl text-slate-700">
                US${item.discountPrice} * {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t border-gray-200 w-full text-right ">
        <h5 className="pt-5 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />

      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-xl font-semibold">Shipping Address:</h4>
          <h4 className="pt-3 text-xl">
            {data?.shippingAddress.address1 + data?.shippingAddress.address2}
          </h4>
          <h4 className="pt-3 text-xl">{data?.shippingAddress.country}</h4>
          <h4 className="pt-3 text-xl">{data?.shippingAddress.city}</h4>
          <h4 className="pt-3 text-xl">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-xl">Payment Info:</h4>
          <h4 className="">
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <div className={`${styles.button} text-white bg-black`}>Send Message</div>
    </div>
  );
};

export default UserOrderDetails;
