import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersAdmin } from "../../redux/actions/user";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { server } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminDashboardSellers = () => {
  const { adminSellers, isLoading } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [sellerId, setSellerId] = useState("");
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-shop/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
    setSellerId("");
    setOpen(false);
    dispatch(getAllSellersAdmin());
  };
  useEffect(() => {
    dispatch(getAllSellersAdmin());
  }, [dispatch]);
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
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 260,
      flex: 0.7,
    },
    {
      field: "createdAt",
      headerName: "Joined on",
      type: "string",
      maxWidth: 120,
      flex: 0.8,
    },
    {
      field: "Preview",
      headerName: "Preview",
      minWidth: 100,
      flex: 0.4,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.id;
        return (
          <>
            <Link to={`/shop/preview/${d}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },

    {
      field: "Delete",
      headerName: "Delete Seller",
      minWidth: 80,
      flex: 0.8,
      type: "string",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.id;
        return (
          <>
            <Button onClick={() => setOpen(true) || setSellerId(d)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full flex justify-center pt-5">
            <div className="w-[97%]">
              <h3 className="text-[22px] font-[Poppins] pb-2">All Sellers</h3>
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
                        onClick={() => setOpen(false) || setSellerId("")}
                        className="cursor-pointer"
                      />
                    </div>
                    <h3 className="text-[18px] text-center py-5 font-[Poppins]">
                      Are you sure? you want to delete this seller?
                    </h3>
                    <div className="w-full flex items-center justify-center gap-5">
                      <div
                        onClick={() => setOpen(false) || setSellerId("")}
                        className={`${styles.button} bg-black text-white !rounded-md`}
                      >
                        Cancel
                      </div>
                      <div
                        onClick={() => setOpen(true) || handleDelete(sellerId)}
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

export default AdminDashboardSellers;
