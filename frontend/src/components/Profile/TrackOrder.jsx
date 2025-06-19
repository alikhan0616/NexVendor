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
    <div className="w-full h-[80vh] flex justify-center items-center">
      <>
        {data && data?.status === "Processing" ? (
          <h1 className=" text-xl ">Your Order is processing in shop.</h1>
        ) : data?.status === "Dispatched to Delivery Partner" ? (
          <h1 className=" text-xl ">
            Your Order is on the way to the delivery partner.
          </h1>
        ) : data?.status === "In Transit" ? (
          <h1 className=" text-xl ">
            Your Order is being shipped to destination hub.
          </h1>
        ) : data?.status === "Arrived at Destination Hub" ? (
          <h1 className=" text-xl ">
            Your Order has arrived at destination hub, waiting to be delivered.
          </h1>
        ) : data?.status === "Out for Delivery" ? (
          <h1 className=" text-xl ">
            Your Order has been dispatched for delivery to your address.
          </h1>
        ) : data?.status === "Delivered" ? (
          <h1 className=" text-xl ">
            Your Order was delivered successfully to your address.
          </h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className=" text-xl ">Your Refund is being processed.</h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className=" text-xl ">You have been refunded successfully.</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
