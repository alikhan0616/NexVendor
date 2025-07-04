import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import Loader from "../Layout/Loader";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineArrowRight } from "react-icons/ai";

const AdminDashboardOrders = () => {
  const { adminOrders, isLoading } = useSelector((state) => state.order);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            params.value === "Delivered"
              ? "bg-green-100 text-green-700"
              : params.value === "Processing refund"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => (
        <span className="font-semibold text-[#B66E41]">{params.value}</span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Placed On",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
      renderCell: (params) => (
        <span className="font-bold text-orange-600">{params.value}</span>
      ),
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        createdAt: item?.createdAt.slice(0, 10),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full flex justify-center pt-5">
            <div className="w-[97%]">
              <h3 className="text-[24px] font-semibold text-[#B66E41] pb-2">
                All Orders
              </h3>
              <div className="w-full rounded min-h bg-white">
                <DataGrid
                  rows={row}
                  columns={columns}
                  disableRowSelectionOnClick
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5, // Set to 5 items per page
                        page: 0, // Start at the first page
                      },
                    },
                  }}
                  pageSizeOptions={[5]} // Optional: Only allow 5 items per page
                  pagination // Enable pagination
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
        </>
      )}
    </>
  );
};

export default AdminDashboardOrders;
