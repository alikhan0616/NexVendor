import React, { useEffect, useState } from "react";
import { getAllOrdersShop } from "../../redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Loader from "../../components/Layout/Loader";
import { AiOutlineDelete } from "react-icons/ai";
import { loadSeller } from "../../redux/actions/user";

const WithdrawMoney = () => {
  const { seller, isLoading } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(30);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankSwiftCode: "",
    bankAccountNumber: "",
    bankHolderName: "",
    bankAddress: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const withdrawMethod = { ...bankInfo };

    try {
      await axios.post(
        `${server}/shop/update-payment-method`,
        { withdrawMethod },
        { withCredentials: true }
      );
      toast.success("Withdraw method added successfully!");
      setBankInfo({
        bankName: "",
        bankCountry: "",
        bankSwiftCode: "",
        bankAccountNumber: "",
        bankHolderName: "",
        bankAddress: "",
      });
      dispatch(loadSeller());
      setPaymentMethod(false);
      setOpen(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      });
      toast.success("Withdraw method deleted successfully!");
      dispatch(loadSeller());
    } catch (err) {
      toast.error("Failed to delete withdraw method");
    }
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 30 || withdrawAmount > seller.availableBalance) {
      toast.error("You can't withdraw with this amount");
      return;
    }
    try {
      await axios.post(
        `${server}/withdraw/create-withdraw-request`,
        { amount: withdrawAmount },
        { withCredentials: true }
      );
      toast.success("Withdraw money request is successful!");
      dispatch(loadSeller());
    } catch (err) {
      toast.error("Failed to request withdrawal");
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full h-full px-6 py-10">
      <div className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Available Balance: ${seller.availableBalance.toFixed(2)}
        </h2>
        <button
          className="bg-black text-white py-2 px-6 rounded-md font-medium hover:bg-slate-800 transition"
          onClick={() =>
            seller.availableBalance < 30
              ? toast.error("Insufficient funds to withdraw! (Min: $30)")
              : setOpen(true)
          }
        >
          Withdraw
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div
            className={`bg-white w-full max-w-2xl mx-auto rounded-xl shadow-lg relative p-6 overflow-y-auto ${
              paymentMethod ? "max-h-[85vh]" : "min-h-[30vh]"
            }`}
          >
            <button
              onClick={() => setOpen(false) || setPaymentMethod(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-black"
            >
              <RxCross1 size={22} />
            </button>

            {paymentMethod ? (
              <div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  Add New Withdraw Method
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {Object.entries(bankInfo).map(([key, val], idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-slate-700">
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (s) => s.toUpperCase())}
                        :<span className="text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={val}
                        onChange={(e) =>
                          setBankInfo({ ...bankInfo, [key]: e.target.value })
                        }
                        className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
                        placeholder={`Enter your ${key}`}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-slate-800 transition"
                  >
                    Add Method
                  </button>
                </form>
              </div>
            ) : seller.withdrawMethod ? (
              <div>
                <h3 className="text-xl font-semibold text-center mb-4">
                  Available Withdraw Method
                </h3>
                <div className="flex justify-between items-center border p-4 rounded-md">
                  <div>
                    <p className="text-sm text-slate-700">
                      <span className="font-medium">Account Number:</span>{" "}
                      {"*".repeat(
                        seller.withdrawMethod.bankAccountNumber.length - 3
                      ) + seller.withdrawMethod.bankAccountNumber.slice(-3)}
                    </p>
                    <p className="text-sm text-slate-700">
                      <span className="font-medium">Bank Name:</span>{" "}
                      {seller.withdrawMethod.bankName}
                    </p>
                  </div>
                  <AiOutlineDelete
                    onClick={deleteHandler}
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    size={20}
                  />
                </div>
                <div className="mt-5">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Withdraw Amount:
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
                    placeholder="Enter amount..."
                  />
                  <button
                    onClick={withdrawHandler}
                    className="w-full mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-slate-800 transition"
                  >
                    Confirm Withdraw
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-red-500 font-medium text-lg mb-4">
                  No Withdraw Methods Available!
                </p>
                <button
                  onClick={() => setPaymentMethod(true)}
                  className="bg-black text-white py-2 px-6 rounded-md hover:bg-slate-800 transition"
                >
                  Add New
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawMoney;
