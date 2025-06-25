import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAdmin } from "../../redux/actions/user";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { useGridColumnHeaders } from "@mui/x-data-grid/internals";
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
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setUserId("");
    setOpen(false);
    window.location.reload();
  };
  useEffect(() => {
    dispatch(getAllUsersAdmin());
  }, [dispatch]);
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Username",
      type: "string",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "createdAt",
      headerName: "Joined on",
      type: "string",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "Delete",
      headerName: "Delete User",
      minWidth: 80,
      flex: 0.8,
      type: "string",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.id;
        return (
          <>
            <Button onClick={() => setOpen(true) || setUserId(d)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  adminUsers &&
    adminUsers.forEach((user) => {
      row.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {usersLoading ? (
        <Loader />
      ) : (
        <>
          {/* {
          open && (
            <div className="w-full z-8 bg-[#201b1c]"></div>
          )
        } */}
          <div className="w-full flex justify-center pt-5">
            <div className="w-[97%]">
              <h3 className="text-[22px] font-[Poppins] pb-2">All Users</h3>
              <div className="w-full rounded min-h bg-white">
                <DataGrid
                  rows={row}
                  columns={columns}
                  disableRowSelectionOnClick
                  pageSize={5}
                  autoHeight
                />
              </div>
              {open && (
                <div className="w-full fixed top-0 left-0 z-999 bg-[#00000039] flex items-center justify-center h-screen">
                  <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                    <div className="w-full flex justify-end">
                      <RxCross1
                        onClick={() => setOpen(false) || setUserId("")}
                        className="cursor-pointer"
                      />
                    </div>
                    <h3 className="text-[18px] text-center py-5 font-[Poppins]">
                      Are you sure? you want to delete this user?
                    </h3>
                    <div className="w-full flex items-center justify-center gap-5">
                      <div
                        onClick={() => setOpen(false) || setUserId("")}
                        className={`${styles.button} bg-black text-white !rounded-md`}
                      >
                        Cancel
                      </div>
                      <div
                        onClick={() => setOpen(true) || handleDelete(userId)}
                        className={`${styles.button} bg-red-600 text-white !rounded-md`}
                      >
                        Confirm
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminDashboardUsers;
