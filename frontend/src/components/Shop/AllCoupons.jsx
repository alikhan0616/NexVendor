import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../../components/Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    async function fetchCoupons() {
      await axios
        .get(`${server}/coupon/get-coupons/${seller._id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setCoupons(res.data.couponCodes);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
    fetchCoupons();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          value,
          minAmount,
          maxAmount,
          selectedProduct,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Coupon Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Coupon Name", minWidth: 120, flex: 1.4 },
    {
      field: "price",
      headerName: "Discount Percentage",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      headerName: "Delete",
      minWidth: 120,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} mr-4 bg-[#5A67D8] hover:bg-[#1E3A8A] duration-300 !w-max !p-3 !h-[45]px !rounded-[5px]`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            disableRowSelectionOnClick
            autoPageSize
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000030] z-[2000] flex items-center justify-center ">
              <div className="800px:w-[40%] w-[90%] h-[80vh] shadow-md overflow-y-auto bg-white rounded-sm ">
                <div className="w-full flex justify-end p-4">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-3xl font-[Poppins] text-center">
                  Create Coupon Code
                </h5>
                {/* CREATE COUPON CREATION FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="p-4"
                  aria-required={true}
                >
                  <br />
                  <div className="">
                    <label className="pb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Coupon name..."
                      required
                    />
                  </div>
                  <br />
                  <div className="">
                    <label className="pb-2">
                      Discount Percent <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      value={value}
                      max={100}
                      className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Coupon discount percentage..."
                      required
                    />
                  </div>
                  <br />
                  <div className="">
                    <label className="pb-2">Minimum Amount</label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Minimum amount of a product..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label className="pb-2">Maximum Amount</label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      className="mt-2 appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Maximum amount of a product..."
                    />
                  </div>
                  <br />
                  <div className="">
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                      <option value="Choose your product">
                        Choose your product
                      </option>
                      {products &&
                        products.map((i, index) => (
                          <option value={i.name} key={index}>
                            {i.name.slice(0, 60) + "..."}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div className="">
                    <input
                      type="submit"
                      value={"Create"}
                      className="mt-2 cursor-pointer appearance-none block w-full h-[35px] border px-3 border-gray-300 rounded-sm placeholder-gray-400 focus:outline-none focus:ring-slate-700 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;
