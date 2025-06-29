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

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };

    await axios
      .post(
        `${server}/shop/update-payment-method`,
        { withdrawMethod },
        { withCredentials: true }
      )
      .then((res) => {
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
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const deleteHandler = async () => {
    await axios
      .delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfully!");
        dispatch(loadSeller());
      });
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 30 || withdrawAmount > seller.availableBalance) {
      toast.error("You can't withdraw with this amount");
    } else {
      const amount = withdrawAmount;

      await axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { amount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Withdraw money request is successful! ");
          dispatch(loadSeller());
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-[90vh] p-8">
          <div className="w-full bg-white h-full rounded shadow flex items-center justify-center flex-col">
            <h5 className="text-xl pb-4">
              Available Balance ${seller.availableBalance.toFixed(2)}
            </h5>
            <div
              onClick={() =>
                seller.availableBalance < 30 || NaN
                  ? toast.error(
                      "Insufficent Funds to withdraw! (minimum amount: $30)"
                    )
                  : setOpen(true)
              }
              className={`${styles.button} text-white bg-black !rounded-lg !h-[42px] `}
            >
              Withdraw
            </div>
          </div>
          {open && (
            <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-999 bg-[#0000003a]">
              <div
                className={`w-[95%] 800px:w-[50%] ${
                  paymentMethod ? "h-[80vh] overflow-y-auto py-2" : "h-[unset]"
                } bg-white shadow rounded min-h-[40vh]`}
              >
                <div
                  className="w-full flex justify-end p-4"
                  onClick={() => setOpen(false) || setPaymentMethod(false)}
                >
                  <RxCross1 size={25} className="cursor-pointer" />
                </div>
                {paymentMethod ? (
                  <div className="">
                    <h3 className="font-[Poppins] text-center text-[24px]">
                      Add New Withdraw Method:
                    </h3>
                    <form onSubmit={handleSubmit} className="px-5">
                      <div className="">
                        <label>
                          Bank Name: <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={bankInfo.bankName}
                          onChange={(e) =>
                            setBankInfo({
                              ...bankInfo,
                              bankName: e.target.value,
                            })
                          }
                          required
                          type="text"
                          placeholder="Enter your bank name"
                          className={`${styles.input} border-gray-200 mt-2`}
                        />
                      </div>
                      <div className="">
                        <label>
                          Bank Country: <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={bankInfo.bankCountry}
                          onChange={(e) =>
                            setBankInfo({
                              ...bankInfo,
                              bankCountry: e.target.value,
                            })
                          }
                          required
                          type="text"
                          placeholder="Enter your bank country"
                          className={`${styles.input} border-gray-200 mt-2`}
                        />
                      </div>
                      <div className="mt-2">
                        <label>
                          Bank Swift Code:{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={bankInfo.bankSwiftCode}
                          onChange={(e) =>
                            setBankInfo({
                              ...bankInfo,
                              bankSwiftCode: e.target.value,
                            })
                          }
                          required
                          type="text"
                          placeholder="Enter bank swift code"
                          className={`${styles.input} border-gray-200 mt-2`}
                        />
                      </div>
                      <div className="mt-2">
                        <label>
                          Bank Account Number:{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          value={bankInfo.bankAccountNumber}
                          onChange={(e) =>
                            setBankInfo({
                              ...bankInfo,
                              bankAccountNumber: e.target.value,
                            })
                          }
                          required
                          type="number"
                          placeholder="Enter your account number"
                          className={`${styles.input} border-gray-200 mt-2`}
                        />
                      </div>
                      <div className="mt-2">
                        <label>
                          Bank Holder Name:{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          value={bankInfo.bankHolderName}
                          onChange={(e) =>
                            setBankInfo({
                              ...bankInfo,
                              bankHolderName: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Enter your account name"
                          className={`${styles.input} border-gray-200 mt-2`}
                        />
                      </div>
                      <div className="mt-2 mb-5">
                        <label>
                          Bank Address: <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          value={bankInfo.bankAddress}
                          onChange={(e) =>
                            setBankInfo({
                              ...bankInfo,
                              bankAddress: e.target.value,
                            })
                          }
                          type="text"
                          placeholder="Enter your bank address"
                          className={`${styles.input} border-gray-200 mt-2`}
                        />
                      </div>

                      <button
                        required
                        type="submit"
                        className={`${styles.button} bg-black text-white mx-auto rounded-md`}
                      >
                        Add Method
                      </button>
                    </form>
                  </div>
                ) : (
                  <>
                    <h3 className="font-[Poppins] text-center text-[24px]">
                      Available Withdraw Methods:
                    </h3>
                    <div>
                      {isLoading ? (
                        <Loader />
                      ) : seller && seller?.withdrawMethod ? (
                        <div className="p-5">
                          <div className="flex flex-col 800px:flex-row w-full justify-between items-center">
                            <div className="w-[50%]">
                              <h5>
                                <span className="font-semibold">
                                  Account Number:
                                </span>{" "}
                                {"*".repeat(
                                  seller.withdrawMethod.bankAccountNumber
                                    .length - 3
                                ) +
                                  seller.withdrawMethod.bankAccountNumber.slice(
                                    -3
                                  )}
                              </h5>
                              <h5>
                                <span className="font-semibold">
                                  Bank Name:
                                </span>{" "}
                                {seller.withdrawMethod.bankName}
                              </h5>
                            </div>
                            <div className="w-[50%]">
                              <AiOutlineDelete
                                onClick={() => deleteHandler()}
                                size={20}
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                          <br />
                          <span className="font-semibold">
                            Available Balance:
                          </span>{" "}
                          <h4> ${seller.availableBalance.toFixed(2)}</h4>
                          <br />
                          <div className="800px:flex w-full items-center justify-start gap-2">
                            <input
                              type="number"
                              value={withdrawAmount}
                              onChange={(e) =>
                                setWithdrawAmount(e.target.value)
                              }
                              placeholder="Enter withdraw amount..."
                              className={`${styles.input} border-gray-200 w-full 800px:max-w-[250px]`}
                            />
                            <div
                              onClick={() => withdrawHandler()}
                              className={`${styles.button} text-white bg-black rounded-lg`}
                            >
                              Withdraw
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-center text-red-500 text-[18px] font-semibold">
                            No Withdraw Methods Available!
                          </p>
                          <div className="w-full flex items-center justify-center">
                            <div
                              onClick={() => setPaymentMethod(true)}
                              className={`${styles.button} bg-black rounded-md text-[#fff]`}
                            >
                              Add new
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default WithdrawMoney;
