import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAdmin } from "../../redux/actions/user";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";

const AdminDashboardUsers = () => {
  const { adminUsers, usersLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {};
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
            <Button onClick={() => handleDelete(params.id)}>
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
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            disableRowSelectionOnClick
            pageSize={5}
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AdminDashboardUsers;
