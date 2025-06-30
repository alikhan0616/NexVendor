import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { server } from "../../server";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const AdminWithdraw = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    setIsLoading(true);
    async function getWithdrawRequests() {
      await axios
        .get(`${server}/withdraw/withdraw-requests`, { withCredentials: true })
        .then((res) => {
          setData(res.data.withdraws);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.response.data.message);
        });
    }
    getWithdrawRequests();
  }, []);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "status",
      type: "text",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "createdAt",
      headerName: "Request Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      flex: 1,
      minWidth: 130,
      headerName: "Update Status",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            className={params.row.status !== "Processing" ? "hidden" : "block"}
          >
            <Button
              onClick={() => setOpen(true) || setWithdrawData(params.row)}
            >
              <FaRegEdit size={20} />
            </Button>
          </div>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        name: item.seller?.name,
        shopId: item.seller?._id,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/update-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw status updated successfully!");
        setData(res.data.withdraw);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <>
      {isLoading ? (
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
      {open && (
        <div className="w-full h-screen fixed top-0 left-0 z-999 bg-[#00000038] flex items-center justify-center">
          <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
            <div className="w-full flex items-center justify-end">
              <RxCross1
                size={20}
                className="cursor-pointer"
                onClick={() => setOpen(false) || setWithdrawData([])}
              />
            </div>
            <h1 className="font-[Poppins] text-center font-semibold text-2xl">
              Update Withdraw Status
            </h1>
            <select
              name=""
              id=""
              onChange={(e) => setWithdrawStatus(e.target.value)}
              value={withdrawStatus}
              className="w-[200px] h-[35px] border border-gray-200 rounded mt-5"
            >
              <option value={withdrawData.status}>{withdrawData.status}</option>
              <option value={"Succeeded"}>Succeeded</option>
            </select>
            <button
              type="submit"
              onClick={handleSubmit}
              className={` block ${styles.button} bg-black text-white rounded-md`}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminWithdraw;
