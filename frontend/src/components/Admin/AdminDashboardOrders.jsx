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
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "Placed On",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
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
              <h3 className="text-[22px] font-[Poppins] pb-2">All Orders</h3>
              <div className="w-full rounded min-h bg-white">
                <DataGrid
                  rows={row}
                  columns={columns}
                  disableRowSelectionOnClick
                  pageSize={5}
                  autoHeight
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
