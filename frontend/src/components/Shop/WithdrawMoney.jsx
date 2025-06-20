import React, { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../redux/actions/order";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";

const WithdrawMoney = () => {
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.order);

  const [deliveredOrder, setDeliveredOrder] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));
  }, [dispatch]);

  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      const orderData = orders.filter((item) => item.status === "Delivered");
      setDeliveredOrder(orderData);
    }
  }, [orders]);

  const totalEarningWithoutTax =
    deliveredOrder &&
    deliveredOrder.reduce((acc, item) => acc + item.totalPrice, 0);

  const serviceCharge = totalEarningWithoutTax * 0.1;
  const availableBalance = totalEarningWithoutTax - serviceCharge;

  return (
    <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded shadow flex items-center justify-center flex-col">
        <h5 className="text-xl pb-4">
          Available Balance $
          {availableBalance ? availableBalance.toFixed(2) : "-"}
        </h5>
        <div
          className={`${styles.button} text-white bg-black !rounded-lg !h-[42px] `}
        >
          Withdraw
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
