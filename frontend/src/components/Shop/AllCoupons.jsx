import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { AiOutlineDelete } from "react-icons/ai";
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
        .catch(() => {
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
      .then(() => {
        toast.success("Coupon code deleted successfully!");
        window.location.reload();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
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
      renderCell: (params) => (
        <Button
          className="!text-red-600 hover:!text-white hover:!bg-red-600 !rounded-full !min-w-0 !p-2"
          onClick={() => handleDelete(params.id)}
        >
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const row = coupons.map((item) => ({
    id: item._id,
    name: item.name,
    price: `${item.value}%`,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="w-full flex justify-end">
            <button
              className="bg-[#B66E41] hover:bg-[#a15630] text-white font-medium py-2 px-5 rounded-md transition"
              onClick={() => setOpen(true)}
            >
              Create Coupon Code
            </button>
          </div>

          <div className="mt-5">
            <DataGrid
              rows={row}
              columns={columns}
              disableRowSelectionOnClick
              autoPageSize
              className="border border-slate-200 rounded-md"
              sx={{
                borderRadius: 3,
                border: "none",
                boxShadow: 1,
                background: "#fff",
                "& .MuiDataGrid-columnHeaders": {
                  background: "#FFF7F0",
                  color: "#B66E41",
                  fontWeight: "bold",
                  fontSize: 16,
                  borderRadius: "12px 12px 0 0",
                },
                "& .MuiDataGrid-row": {
                  borderBottom: "1px solid #F3E8E0",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: 15,
                },
                "& .MuiDataGrid-footerContainer": {
                  background: "#FFF7F0",
                  borderTop: "none",
                  borderRadius: "0 0 12px 12px",
                },
                "& .MuiDataGrid-selectedRowCount": {
                  color: "#B66E41",
                },
              }}
            />
          </div>

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000030] z-[2000] flex items-center justify-center">
              <div className="800px:w-[40%] w-[90%] max-h-[90vh] overflow-y-auto shadow-md bg-white rounded-xl p-6">
                <div className="flex justify-end">
                  <RxCross1
                    size={25}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <h5 className="text-2xl font-semibold text-[#B66E41] text-center mb-4">
                  Create Coupon Code
                </h5>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Coupon name..."
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B66E41]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Discount Percent <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="value"
                      max={100}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Coupon discount percentage..."
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B66E41]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Minimum Amount
                    </label>
                    <input
                      type="number"
                      name="minAmount"
                      value={minAmount}
                      onChange={(e) => setMinAmount(e.target.value)}
                      placeholder="Minimum amount of a product..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B66E41]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Maximum Amount
                    </label>
                    <input
                      type="number"
                      name="maxAmount"
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Maximum amount of a product..."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B66E41]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Selected Product
                    </label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B66E41]"
                    >
                      <option value="">Choose your product</option>
                      {products &&
                        products.map((i, index) => (
                          <option value={i.name} key={index}>
                            {i.name.length > 60
                              ? `${i.name.slice(0, 60)}...`
                              : i.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="w-full bg-[#B66E41] text-white py-2 rounded-md font-medium cursor-pointer hover:bg-[#a15630] transition"
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
