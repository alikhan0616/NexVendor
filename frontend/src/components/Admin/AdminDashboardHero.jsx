import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
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
  }, [dispatch]);

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
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4 ">
          <h1 className="text-[22px] font-[Poppins] pb-2">Overview</h1>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[25vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Total Revenue <br />
                </h3>
              </div>
              <h5 className="pt-2 pl-[35px] text-[22px] font-[500]">$950</h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[25vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <FiPackage size={30} className="mr-2 text-[#00000085]" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All Sellers <br />
                </h3>
              </div>
              <h5 className="pt-2 pl-[35px] text-[22px] font-[500]">
                {adminSellers && adminSellers.length}
              </h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c] hover:text-[#5A67D8] duration-300">
                  View Sellers
                </h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[25vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <FiShoppingBag size={30} className="mr-2 text-[#00000085]" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  All orders <br />
                </h3>
              </div>
              <h5 className="pt-2 pl-[35px] text-[22px] font-[500]">
                {adminOrders && adminOrders.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c] hover:text-[#5A67D8] duration-300">
                  View Orders
                </h5>
              </Link>
            </div>
          </div>
          <br />
          <h3 className="text-[22px] font-[Poppins] pb-2">Latest Orders</h3>

          <div className="w-full min-h-[42vh] shadow bg-white rounded">
            <div className="">
              <DataGrid
                rows={row}
                columns={columns}
                disableRowSelectionOnClick
                pageSize={4}
                autoHeight
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardHero;
