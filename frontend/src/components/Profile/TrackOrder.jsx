import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBox,
  FaCheck,
  FaClock,
  FaTruck,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaSync,
} from "react-icons/fa";
import { getAllOrdersUser } from "../../redux/actions/order";

const statusSteps = [
  { key: "Processing", label: "Processing", icon: FaClock },
  {
    key: "Dispatched to Delivery Partner",
    label: "Dispatched to Delivery Partner",
    icon: FaBox,
  },
  { key: "In Transit", label: "In Transit", icon: FaTruck },
  {
    key: "Arrived at Destination Hub",
    label: "Arrived at Destination Hub",
    icon: FaMapMarkerAlt,
  },
  { key: "Out for Delivery", label: "Out for Delivery", icon: FaTruck },
  { key: "Delivered", label: "Delivered", icon: FaCheckCircle },
];

const refundSteps = [
  { key: "Processing refund", label: "Processing Refund", icon: FaSync },
  { key: "Refund Success", label: "Refund Success", icon: FaCheckCircle },
];

const statusMessages = {
  Processing: "Your order is processing in the shop.",
  "Dispatched to Delivery Partner":
    "Your order is on the way to the delivery partner.",
  "In Transit": "Your order is with our delivery partner.",
  "Arrived at Destination Hub":
    "Your order has reached your city. It will be delivered soon.",
  "Out for Delivery": "Your order is out for delivery.",
  Delivered: "Your order has been delivered.",
  "Processing refund": "We're processing your refund.",
  "Refund Success": "Your refund has been completed.",
};

const TrackOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersUser(user._id));
    }
  }, [dispatch, user?._id]);

  const order = orders?.find((item) => item._id === id);

  const getCurrentStepIndex = () => {
    const isRefundOrder =
      order?.status === "Processing refund" ||
      order?.status === "Refund Success";
    const steps = isRefundOrder ? refundSteps : statusSteps;
    return steps.findIndex((step) => step.key === order?.status);
  };

  const getActiveSteps = () => {
    const isRefundOrder =
      order?.status === "Processing refund" ||
      order?.status === "Refund Success";
    return isRefundOrder ? refundSteps : statusSteps;
  };

  // COLOR SCHEME CHANGES BELOW
  const getStatusColor = (status) => {
    if (status === "Delivered" || status === "Refund Success")
      return "text-orange-600";
    if (status === "Processing refund") return "text-orange-600";
    return "text-slate-700";
  };

  const getStatusBgColor = (status) => {
    if (status === "Delivered" || status === "Refund Success")
      return "bg-orange-50 border-orange-200";
    if (status === "Processing refund") return "bg-orange-50 border-orange-200";
    return "bg-slate-100 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-700 mb-2">
            Track Your Order
          </h1>
          <p className="text-slate-500">Stay updated with your order status</p>
        </div>

        {order ? (
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-700">
                    Order #{order._id.slice(-8)}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Placed on{" "}
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(
                      order.status
                    )} ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </div>
                  {order.totalPrice && (
                    <p className="text-lg font-semibold text-slate-700 mt-1">
                      ${order.totalPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="relative">
                <div className="absolute top-6 left-0 w-full h-0.5 bg-slate-200 hidden sm:block" />
                <div
                  className="absolute top-6 left-0 h-0.5 bg-orange-600 transition-all duration-500 hidden sm:block"
                  style={{
                    width: `${
                      (getCurrentStepIndex() / (getActiveSteps().length - 1)) *
                      100
                    }%`,
                  }}
                />

                <div className="relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-4">
                    {getActiveSteps().map((step, index) => {
                      const isActive = index <= getCurrentStepIndex();
                      const isCompleted = index < getCurrentStepIndex();
                      const IconComponent = step.icon;

                      return (
                        <div
                          key={step.key}
                          className="flex flex-col items-center text-center"
                        >
                          <div
                            className={`
                            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 mb-3
                            ${
                              isCompleted
                                ? "bg-slate-700 text-white"
                                : isActive
                                ? "bg-orange-600 text-white"
                                : "bg-slate-200 text-slate-400"
                            }
                          `}
                          >
                            {isCompleted ? (
                              <FaCheck className="w-5 h-5" />
                            ) : (
                              <IconComponent className="w-5 h-5" />
                            )}
                          </div>
                          <h3
                            className={`
                            text-sm font-medium transition-colors duration-300
                            ${isActive ? "text-slate-700" : "text-slate-400"}
                          `}
                          >
                            {step.label}
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`mx-6 mb-6 p-4 rounded-sm border ${getStatusBgColor(
                order.status
              )}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-sm flex items-center justify-center ${getStatusColor(
                    order.status
                  )} mt-0.5`}
                >
                  {order.status === "Delivered" ||
                  order.status === "Refund Success" ? (
                    <FaCheckCircle className="w-4 h-4" />
                  ) : order.status === "Processing refund" ? (
                    <FaExclamationCircle className="w-4 h-4" />
                  ) : (
                    <FaClock className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <h4
                    className={`font-medium ${getStatusColor(
                      order.status
                    )} mb-1`}
                  >
                    Current Status: {order.status}
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {statusMessages[order.status]}
                  </p>
                </div>
              </div>
            </div>

            {order.items && order.items.length > 0 && (
              <div className="border-t border-gray-200 p-6">
                <h3 className="font-semibold text-slate-700 mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-slate-700">
                          {item.name}
                        </span>
                        <span className="text-slate-500 ml-2">
                          ×{item.quantity}
                        </span>
                      </div>
                      <span className="font-medium text-slate-700">
                        ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-700">Total</span>
                    <span className="font-bold text-lg text-slate-700">
                      ${order.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaBox className="w-8 h-8 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-700 mb-2">
              Order Not Found
            </h2>
            <p className="text-slate-500 max-w-md mx-auto">
              Please check the order ID or try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
