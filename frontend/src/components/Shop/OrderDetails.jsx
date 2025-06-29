import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));
  }, [dispatch]);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order status updated!");
        navigate("/dashboard-orders");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const refundOrderHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order status updated!");
        navigate("/dashboard-orders");
        dispatch(getAllOrdersShop(seller._id));
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
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#dddff1] !rounded-[4px] text-[#5A67D8] font-semibold !h-[45px] text-lg`}
          >
            Order List
          </div>
        </Link>
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
            {data?.paymentInfo?.status ? data?.paymentInfo.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <br />

      <h4 className="pt-3 text-xl font-semibold">Order Status:</h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" && (
          <select
            className=" border border-gray-300 p-1 mt-2 rounded-md"
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
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}

      {data?.status === "Processing Refund" && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=" border border-gray-300 p-1 mt-2 rounded-md"
        >
          {["Processing refund", "Refund Success"]
            .slice(
              ["Processing refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}{" "}
        </select>
      )}
      <div
        onClick={
          data?.status !== "Processing refund"
            ? orderUpdateHandler
            : refundOrderHandler
        }
        className={`${styles.button} !bg-[#dddff1] !rounded-[4px] text-[#5A67D8] font-semibold !h-[45px] text-lg`}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
