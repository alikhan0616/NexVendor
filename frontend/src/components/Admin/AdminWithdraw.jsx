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
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      renderCell: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            params.value === "Succeeded"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Request Date",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "edit",
      headerName: "Update Status",
      minWidth: 100,
      flex: 0.6,
      sortable: false,
      renderCell: (params) =>
        params.row.status === "Processing" && (
          <Button
            onClick={() => {
              setOpen(true);
              setWithdrawData(params.row);
            }}
            className="!bg-[#B66E41] hover:!bg-orange-600 !text-white !rounded-full !min-w-0 !p-2 shadow"
            style={{ minWidth: 0 }}
          >
            <FaRegEdit size={18} />
          </Button>
        ),
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
        <div className="w-full flex justify-center pt-5">
          <div className="w-[97%]">
            <h3 className="text-[24px] font-semibold text-[#B66E41] pb-2">
              Withdraw Requests
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
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[999] bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white w-[95%] max-w-md rounded-xl shadow p-6">
            <div className="flex justify-end">
              <RxCross1
                className="cursor-pointer text-slate-700"
                onClick={() => {
                  setOpen(false);
                  setWithdrawData(null);
                }}
              />
            </div>
            <h3 className="text-center text-lg font-semibold text-slate-700 py-4">
              Update Withdraw Status
            </h3>
            <div className="flex flex-col items-center gap-4">
              <select
                onChange={(e) => setWithdrawStatus(e.target.value)}
                value={withdrawStatus}
                className="border border-gray-300 rounded px-4 py-2 w-60"
              >
                <option value={withdrawData.status}>
                  {withdrawData.status}
                </option>
                <option value="Succeeded">Succeeded</option>
              </select>
              <button
                onClick={handleSubmit}
                className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-md transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminWithdraw;
