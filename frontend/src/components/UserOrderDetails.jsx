import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersUser } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const UserOrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch]);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersUser(user._id));
        setComment("");
        setRating(1);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const refundHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund/${id}`,
        {
          status: "Processing refund",
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersUser(user._id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

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
          <div
            className="w-full flex flex-col 800px:flex-row items-start mb-5"
            key={index}
          >
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt="product-img"
              className="w-[80px] h-[80px] object-contain"
            />
            <div className="w-full">
              <h5 className="pl-3 text-xl">{item.name}</h5>
              <h5 className="pl-3 text-xl text-slate-700">
                US${item.discountPrice} * {item.qty}
              </h5>
            </div>
            {!item.isReviewed && data?.status === "Delivered" && (
              <div
                onClick={() => setOpen(true) || setSelectedItem(item)}
                className={`${styles.button} bg-black text-white`}
              >
                Write a review
              </div>
            )}
          </div>
        ))}

      {/* Review Pop-Up */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center ">
          <div className="800px:w-[50%] w-full h-min bg-[#fff] shadow rounded-md p-3 overflow-y-auto overflow-x-hidden ">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-3xl font-[500] font-[Poppins] text-center">
              Write a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${backend_url}/${selectedItem.images[0]}`}
                alt="product-img"
                className="w-[80px] h-[80px] object-contain "
              />
              <div className="pl-3 text-xl">{selectedItem?.name}</div>
            </div>
            <br />
            <br />

            {/* Ratings */}
            <h5 className="pl-3 text-xl font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3 items-center">
              <label className="block text-xl font-[500]">
                Write a comment{" "}
                <span className="font-[400] text-base text-[#00000052]">
                  (Optional)
                </span>
              </label>
              <textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                id=""
                cols="20"
                rows="5"
                placeholder="Write your review..."
                className="mt-2 w-[95%] border border-gray-200 p-2 outline-none"
              />
            </div>
            <div
              onClick={rating > 1 ? reviewHandler : null}
              className={`${styles.button} bg-black !rounded-md text-white ml-3`}
            >
              Submit Review
            </div>
          </div>
        </div>
      )}

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
          <br />
          {data?.status === "Delivered" && (
            <div
              className={`${styles.button} text-white !rounded-md bg-black`}
              onClick={refundHandler}
            >
              Get a Refund
            </div>
          )}
        </div>
      </div>
      <br />
      <div className={`${styles.button} text-white !rounded-md bg-black`}>
        Send Message
      </div>
    </div>
  );
};

export default UserOrderDetails;
