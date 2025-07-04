import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAdmin } from "../../redux/actions/user";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";

const AdminDashboardUsers = () => {
  const { adminUsers, usersLoading } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllUsersAdmin());
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setUserId("");
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Username", minWidth: 130, flex: 0.7 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 180,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-medium text-[#B66E41]">{params.value}</span>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            params.value === "Admin"
              ? "bg-orange-100 text-orange-700"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Joined On",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "Delete",
      headerName: "Delete User",
      minWidth: 100,
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            setOpen(true);
            setUserId(params.row.id);
          }}
          className="!text-red-600 hover:!text-white hover:!bg-red-600 !rounded-full !min-w-0 !p-2"
        >
          <AiOutlineDelete size={18} />
        </Button>
      ),
    },
  ];

  const row =
    adminUsers?.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.slice(0, 10),
    })) || [];

  return usersLoading ? (
    <Loader />
  ) : (
    <>
      <div className="w-full flex justify-center pt-5">
        <div className="w-[97%]">
          <h3 className="text-[24px] font-semibold text-[#B66E41] pb-2">
            All Users
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
                  setUserId("");
                }}
              />
            </div>
            <h3 className="text-center text-lg font-semibold text-slate-700 py-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-md transition"
                onClick={() => {
                  setOpen(false);
                  setUserId("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
                onClick={() => handleDelete(userId)}
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

export default AdminDashboardUsers;
