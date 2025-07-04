import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersAdmin } from "../../redux/actions/user";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboardSellers = () => {
  const dispatch = useDispatch();
  const { adminSellers, isLoading } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [sellerId, setSellerId] = useState("");

  useEffect(() => {
    dispatch(getAllSellersAdmin());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-shop/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllSellersAdmin());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setSellerId("");
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      type: "string",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      minWidth: 180,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-medium text-[#B66E41]">{params.value}</span>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 220,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Joined On",
      type: "string",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Preview",
      headerName: "Preview",
      minWidth: 90,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/shop/preview/${params.row.id}`}>
          <Button
            className="!bg-[#B66E41] hover:!bg-orange-600 !text-white !rounded-full !min-w-0 !p-2 shadow"
            style={{ minWidth: 0 }}
          >
            <AiOutlineEye size={18} />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete Seller",
      minWidth: 100,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setOpen(true);
            setSellerId(params.row.id);
          }}
          className="!text-red-600 hover:!text-white hover:!bg-red-600 !rounded-full !min-w-0 !p-2"
        >
          <AiOutlineDelete size={18} />
        </Button>
      ),
    },
  ];

  const row = [];
  adminSellers &&
    adminSellers.forEach((user) => {
      row.push({
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        createdAt: user.createdAt.slice(0, 10),
      });
    });

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="w-full flex justify-center pt-5">
        <div className="w-[97%]">
          <h3 className="text-[24px] font-semibold text-[#B66E41] pb-2">
            All Sellers
          </h3>
          <div className="w-full rounded-xl shadow bg-white p-2">
            <DataGrid
              rows={row}
              columns={columns}
              disableRowSelectionOnClick
              pageSize={5}
              autoHeight
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
        </div>
      </div>

      {/* Confirmation Modal */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-[95%] max-w-md rounded-xl shadow p-6">
            <div className="flex justify-end">
              <RxCross1
                className="cursor-pointer text-slate-700"
                onClick={() => {
                  setOpen(false);
                  setSellerId("");
                }}
              />
            </div>
            <h3 className="text-center text-lg font-semibold text-slate-700 py-4">
              Are you sure you want to delete this seller?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-md transition"
                onClick={() => {
                  setOpen(false);
                  setSellerId("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
                onClick={() => handleDelete(sellerId)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardSellers;
