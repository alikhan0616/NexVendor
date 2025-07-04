import React, { useEffect } from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Layout/Loader";
import { getAllOrdersAdmin } from "../../redux/actions/order";
import { getAllSellersAdmin, getAllUsersAdmin } from "../../redux/actions/user";

const AdminDashboardHero = () => {
  const dispatch = useDispatch();
  const { adminOrders, isLoading } = useSelector((state) => state.order);
  const { adminSellers } = useSelector((state) => state.seller);
  const { adminUsers } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
    dispatch(getAllSellersAdmin());
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

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
        itemsQty: item.cart.reduce((acc, i) => acc + i.qty, 0),
        total: "US$ " + item.totalPrice.toFixed(2),
        createdAt: item?.createdAt.slice(0, 10),
        status: item.status,
      });
    });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full p-4">
      <h1 className="text-[24px] font-semibold text-slate-700 pb-3">
        Admin Overview
      </h1>

      <div className="w-full block 800px:flex gap-5 justify-between">
        {/* Revenue */}
        <div className="w-full mb-4 800px:w-1/3 bg-[#FFF7F0] border border-[#F3E8E0] rounded-2xl p-5 shadow">
          <div className="flex items-center mb-2">
            <AiOutlineMoneyCollect size={26} className="text-slate-700 mr-2" />
            <h3 className="text-slate-700 font-medium text-lg">
              Total Revenue
            </h3>
          </div>
          <h2 className="text-2xl font-bold text-[#FF6F00] pl-1">
            ${adminEarning?.toFixed(2)}
          </h2>
        </div>

        {/* Sellers */}
        <div className="w-full mb-4 800px:w-1/3 bg-[#FFF7F0] border border-[#F3E8E0] rounded-2xl p-5 shadow">
          <div className="flex items-center mb-2">
            <FiPackage size={24} className="text-slate-700 mr-2" />
            <h3 className="text-slate-700 font-medium text-lg">All Sellers</h3>
          </div>
          <h2 className="text-2xl font-bold text-[#FF6F00] pl-1">
            {adminSellers?.length}
          </h2>
          <Link to="/admin-sellers">
            <p className="pt-4 text-sm text-[#B66E41] hover:text-orange-600 duration-200">
              View Sellers
            </p>
          </Link>
        </div>

        {/* Orders */}
        <div className="w-full mb-4 800px:w-1/3 bg-[#FFF7F0] border border-[#F3E8E0] rounded-2xl p-5 shadow">
          <div className="flex items-center mb-2">
            <FiShoppingBag size={24} className="text-slate-700 mr-2" />
            <h3 className="text-slate-700 font-medium text-lg">All Orders</h3>
          </div>
          <h2 className="text-2xl font-bold text-[#FF6F00] pl-1">
            {adminOrders?.length}
          </h2>
          <Link to="/admin-orders">
            <p className="pt-4 text-sm text-[#B66E41] hover:text-orange-600 duration-200">
              View Orders
            </p>
          </Link>
        </div>
      </div>

      <h3 className="text-[20px] font-semibold text-[#B66E41] mt-4 mb-2">
        Latest Orders
      </h3>

      <div className="w-full min-h-[42vh] shadow bg-white rounded-xl p-3">
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
      </div>
    </div>
  );
};

export default AdminDashboardHero;
