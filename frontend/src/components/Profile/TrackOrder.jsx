import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-10">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-700 mb-2 text-center">
          Track Your Order
        </h2>
        <p className="text-slate-500 text-center mb-6">
          Stay updated with your order status
        </p>
        {data && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <span className="font-semibold text-slate-700">
                  Order #{data._id.slice(-7)}
                </span>
                <div className="text-xs text-slate-400">
                  Placed on {new Date(data.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-1">
                  {data.status}
                </span>
                <span className="text-slate-700 font-bold text-lg">
                  ${data.totalPrice || data.totalAmount || "N/A"}
                </span>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative flex items-center w-full mb-6">
              {/* Horizontal line behind all steps */}
              <div
                className="absolute top-1/2 left-0 w-full h-1 bg-slate-300 z-0"
                style={{ transform: "translateY(-50%)" }}
              ></div>
              {[
                "Processing",
                "Dispatched to Delivery Partner",
                "In Transit",
                "Arrived at Destination Hub",
                "Out for Delivery",
                "Delivered",
              ].map((step, idx, arr) => {
                const statusOrder = [
                  "Processing",
                  "Dispatched to Delivery Partner",
                  "In Transit",
                  "Arrived at Destination Hub",
                  "Out for Delivery",
                  "Delivered",
                ];
                const currentIdx = statusOrder.indexOf(data.status);

                let circleColor = "bg-slate-300";
                let borderColor = "border-slate-300";
                let icon = (
                  <span className="text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                );
                if (idx < currentIdx) {
                  circleColor = "bg-slate-700";
                  borderColor = "border-slate-700";
                  icon = (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  );
                } else if (idx === currentIdx) {
                  circleColor = "bg-orange-600";
                  borderColor = "border-orange-600";
                  icon = (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="12" cy="12" r="5" fill="white" />
                    </svg>
                  );
                }

                // For completed steps, overlay a colored line segment
                const isCompleted = idx < currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div
                    className="flex-1 flex flex-col items-center relative z-10"
                    key={step}
                  >
                    {/* Overlay colored line for completed steps */}
                    {idx !== 0 && isCompleted && (
                      <div
                        className="absolute left-0 top-1/2 h-1 bg-slate-700 z-10"
                        style={{
                          width: "50%",
                          transform: "translateY(-50%)",
                        }}
                      ></div>
                    )}
                    {/* Overlay colored line for current step */}
                    {idx !== 0 && isCurrent && (
                      <div
                        className="absolute left-0 top-1/2 h-1 bg-orange-600 z-10"
                        style={{
                          width: "50%",
                          transform: "translateY(-50%)",
                        }}
                      ></div>
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${circleColor} ${borderColor} transition-all duration-300`}
                    >
                      {icon}
                    </div>
                    <span
                      className={`mt-2 text-xs text-center ${
                        idx < currentIdx
                          ? "text-slate-700 font-semibold"
                          : idx === currentIdx
                          ? "text-orange-600 font-semibold"
                          : "text-slate-400"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Current Status Box */}
            <div className="w-full bg-slate-100 rounded-md p-4 mt-2">
              <span className="block text-slate-700 font-semibold mb-1">
                Current Status:{" "}
                <span className="text-orange-600">{data.status}</span>
              </span>
              <span className="text-slate-600 text-sm">
                {(() => {
                  switch (data.status) {
                    case "Processing":
                      return "Your order is processing in shop.";
                    case "Dispatched to Delivery Partner":
                      return "Your order is on the way to the delivery partner.";
                    case "In Transit":
                      return "Your order is being shipped to destination hub.";
                    case "Arrived at Destination Hub":
                      return "Your order has arrived at destination hub, waiting to be delivered.";
                    case "Out for Delivery":
                      return "Your order has been dispatched for delivery to your address.";
                    case "Delivered":
                      return "Your order was delivered successfully to your address.";
                    case "Processing refund":
                      return "Your refund is being processed.";
                    case "Refund Success":
                      return "You have been refunded successfully.";
                    default:
                      return "";
                  }
                })()}
              </span>
            </div>
          </>
        )}
        {!data && (
          <div className="text-center text-slate-700">
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-slate-500">
              We couldn't find an order with this ID.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
