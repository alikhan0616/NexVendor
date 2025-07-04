import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { getAllOrdersUser } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import AllProducts from "./Shop/AllProducts";

const UserOrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

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
        dispatch(AllProducts());
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

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data.cart[0].shopId + user._id;
      const userId = user._id;
      const sellerId = data.cart[0].shopId;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox/?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else toast.error("Please login to contact seller");
  };

  return (
    <div className={`${styles.section} py-4 min-h-screen`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 rounded-full p-2 shadow">
            <BsFillBagFill size={28} color="#B66E41" />
          </div>
          <h1 className="text-2xl font-bold text-[#B66E41] tracking-wide">
            Order Details
          </h1>
        </div>
      </div>

      {/* Order Info */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-4 border-b border-slate-100">
        <h5 className="text-slate-500 text-base">
          <span className="font-semibold text-slate-700">Order ID:</span>{" "}
          {data?._id.slice(0, 8)}
        </h5>
        <h5 className="text-slate-500 text-base">
          <span className="font-semibold text-slate-700">Placed on:</span>{" "}
          {data?.createdAt?.slice(0, 10)}
        </h5>
      </div>

      {/* Order Items */}
      <div className="mt-6 space-y-6">
        {data &&
          data?.cart.map((item, index) => (
            <div
              className="w-full flex flex-col md:flex-row items-center md:items-start bg-white rounded-xl shadow p-4 gap-4"
              key={index}
            >
              <img
                src={item.images[0].url}
                alt="product-img"
                className="w-[80px] h-[80px] object-contain rounded-lg border border-orange-100"
              />
              <div className="flex-1 w-full">
                <h5 className="text-lg font-semibold text-slate-700">
                  {item.name}
                </h5>
                <h5 className="text-base text-orange-700 font-bold mt-1">
                  US${item.discountPrice}{" "}
                  <span className="font-normal text-slate-500">
                    × {item.qty}
                  </span>
                </h5>
              </div>
              {!item.isReviewed && data?.status === "Delivered" && (
                <button
                  onClick={() => {
                    setOpen(true);
                    setSelectedItem(item);
                  }}
                  className="bg-[#B66E41] hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow transition font-semibold"
                >
                  Write a review
                </button>
              )}
            </div>
          ))}
      </div>

      {/* Review Pop-Up */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 relative">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-orange-600"
              onClick={() => setOpen(false)}
            >
              <RxCross1 size={28} />
            </button>
            <h2 className="text-2xl font-bold text-center text-[#B66E41] mb-4">
              Write a Review
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedItem.images[0].url}
                alt="product-img"
                className="w-[70px] h-[70px] object-contain rounded-lg border border-orange-100"
              />
              <div className="text-lg font-medium text-slate-700">
                {selectedItem?.name}
              </div>
            </div>
            {/* Ratings */}
            <div className="mb-4">
              <label className="block text-base font-semibold text-slate-700 mb-1">
                Give a Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={28}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="mr-1 cursor-pointer"
                      color="rgb(246,186,0)"
                      size={28}
                      onClick={() => setRating(i)}
                    />
                  )
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-base font-semibold text-slate-700 mb-1">
                Write a comment{" "}
                <span className="font-normal text-sm text-slate-400">
                  (Optional)
                </span>
              </label>
              <textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows="4"
                placeholder="Write your review..."
                className="w-full border border-slate-200 rounded-md p-2 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 outline-none resize-none"
              />
            </div>
            <button
              onClick={rating > 1 ? reviewHandler : null}
              className="w-full bg-[#B66E41] hover:bg-orange-600 text-white py-2 rounded-md font-semibold shadow transition"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Total Price */}
      <div className="border-t border-slate-100 w-full text-right mt-8 pt-6">
        <h5 className="text-lg font-semibold text-slate-700">
          Total Price:{" "}
          <span className="text-orange-600 font-bold">
            US${data?.totalPrice}
          </span>
        </h5>
      </div>

      {/* Shipping & Payment Info */}
      <div className="w-full flex flex-col md:flex-row gap-8 mt-8">
        <div className="w-full md:w-2/3 bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold text-[#B66E41] mb-2">
            Shipping Address
          </h4>
          <div className="text-base text-slate-700 space-y-1">
            <div>
              {data?.shippingAddress.address1 +
                " " +
                data?.shippingAddress.address2}
            </div>
            <div>{data?.shippingAddress.country}</div>
            <div>{data?.shippingAddress.city}</div>
            <div>{data?.user?.phoneNumber}</div>
          </div>
        </div>
        <div className="w-full md:w-1/3 bg-white rounded-xl shadow p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-semibold text-[#B66E41] mb-2">
              Payment Info
            </h4>
            <div className="text-base text-slate-700">
              Status:{" "}
              <span
                className={
                  data?.paymentInfo?.status === "Paid"
                    ? "text-green-600 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {data?.paymentInfo?.status
                  ? data?.paymentInfo.status
                  : "Not Paid"}
              </span>
            </div>
          </div>
          {data?.status === "Delivered" && (
            <button
              className="mt-6 bg-[#B66E41] hover:bg-orange-600 text-white py-2 rounded-md font-semibold shadow transition"
              onClick={refundHandler}
            >
              Get a Refund
            </button>
          )}
        </div>
      </div>

      {/* Send Message */}
      <div className="w-full flex justify-end mt-8">
        <button
          onClick={handleMessageSubmit}
          className="bg-[#B66E41] hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold shadow transition"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default UserOrderDetails;
