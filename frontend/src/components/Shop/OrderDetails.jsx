import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { getAllOrdersShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { getAllProducts } from "../../redux/actions/product";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));
  }, [dispatch]);

  const orderUpdateHandler = async () => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        { status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order status updated!");
        dispatch(getAllProducts());
        dispatch(loadSeller());
        navigate("/dashboard-orders");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const refundOrderHandler = async () => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        { withCredentials: true }
      )
      .then(() => {
        toast.success("Order status updated!");
        navigate("/dashboard-orders");
        dispatch(getAllOrdersShop(seller._id));
        dispatch(loadSeller());
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  const data = orders?.find((item) => item._id === id);

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
        <Link to="/dashboard-orders">
          <button className="bg-[#FFF7F0] text-[#B66E41] font-semibold px-4 py-2 rounded-md shadow hover:bg-orange-200">
            Order List
          </button>
        </Link>
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
        {data?.cart.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col md:flex-row items-center md:items-start bg-white rounded-xl shadow p-4 gap-4"
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
                <span className="font-normal text-slate-500">× {item.qty}</span>
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t border-slate-100 w-full text-right mt-8 pt-6">
        <h5 className="text-lg font-semibold text-slate-700">
          Total Price:{" "}
          <span className="text-orange-600 font-bold">
            US${data?.totalPrice}
          </span>
        </h5>
      </div>

      {/* Shipping & Payment */}
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
                {data?.paymentInfo?.status || "Not Paid"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-[#B66E41] mb-2">
          Order Status
        </h4>
        {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" ? (
          <select
            className="border border-slate-300 p-2 rounded-md text-slate-700"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {[
              "Processing",
              "Dispatched to Delivery Partner",
              "In Transit",
              "Arrived at Destination Hub",
              "Out for Delivery",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Dispatched to Delivery Partner",
                  "In Transit",
                  "Arrived at Destination Hub",
                  "Out for Delivery",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
          </select>
        ) : (
          <select
            className="border border-slate-300 p-2 rounded-md text-slate-700"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {["Processing refund", "Refund Success"]
              .slice(
                ["Processing refund", "Refund Success"].indexOf(data?.status)
              )
              .map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
          </select>
        )}
        <button
          onClick={
            data?.status !== "Processing refund"
              ? orderUpdateHandler
              : refundOrderHandler
          }
          className="mt-4 bg-[#B66E41] hover:bg-orange-600 text-white px-6 py-2 rounded-md font-semibold shadow transition"
        >
          Update Status
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
