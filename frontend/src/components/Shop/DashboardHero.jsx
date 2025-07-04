import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);
  const { orders, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

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
              : "bg-red-100 text-red-700"
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
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      flex: 1,
      minWidth: 130,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button className="!text-slate-700 hover:!text-white hover:!bg-slate-700 !rounded-full !min-w-0 !p-2">
            <AiOutlineArrowRight size={18} />
          </Button>
        </Link>
      ),
    },
  ];

  const row =
    orders?.map((item) => ({
      id: item._id,
      itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
      total: "US$ " + item.totalPrice,
      status: item.status,
    })) || [];

  return (
    <div className="w-full px-4 py-6 md:px-8">
      <h3 className="text-[24px] font-semibold text-[#B66E41] pb-4">
        Overview
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-2">
            <AiOutlineMoneyCollect size={28} className="text-slate-700" />
            <div>
              <h4 className="text-base font-medium text-slate-700">
                Account Balance
              </h4>
              <p className="text-sm text-slate-500">(after 8% charge)</p>
            </div>
          </div>
          <p className="text-2xl font-semibold  text-[#B66E41] mt-2">
            ${isLoading ? "-" : seller.availableBalance.toFixed(2)}
          </p>
          <Link to="/dashboard-withdraw-money">
            <p className="text-sm text-[#FF6F00] mt-3 hover:underline">
              Withdraw
            </p>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-2">
            <FiPackage size={28} className="text-slate-700" />
            <div>
              <h4 className="text-base font-medium text-slate-700">
                All Orders
              </h4>
            </div>
          </div>
          <p className="text-2xl font-semibold  text-[#B66E41] mt-2">
            {orders?.length || 0}
          </p>
          <Link to="/dashboard-orders">
            <p className="text-sm text-[#FF6F00] mt-3 hover:underline">
              View Orders
            </p>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-2">
            <FiShoppingBag size={28} className="text-slate-700" />
            <div>
              <h4 className="text-base font-medium text-slate-700">
                All Products
              </h4>
            </div>
          </div>
          <p className="text-2xl font-semibold  text-[#B66E41] mt-2">
            {products?.length || 0}
          </p>
          <Link to="/dashboard-products">
            <p className="text-sm text-[#FF6F00] mt-3 hover:underline">
              View Products
            </p>
          </Link>
        </div>
      </div>

      <h3 className="text-[24px] font-semibold text-[#B66E41] pt-8 pb-4">
        Latest Orders
      </h3>

      <div className="w-full rounded-xl shadow bg-white p-2">
        {isLoading ? (
          <Loader />
        ) : (
          <DataGrid
            rows={row}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 4, // Set to 4 items per page
                  page: 0, // Start at the first page
                },
              },
            }}
            pageSizeOptions={[4]} // Optional: Only allow 4 items per page
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
        )}
      </div>
    </div>
  );
};

export default DashboardHero;
