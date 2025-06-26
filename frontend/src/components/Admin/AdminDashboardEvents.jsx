import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";

const AdminDashboardEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/event/admin-all-events`, { withCredentials: true })
      .then((res) => {
        setEvents(res.data.events);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  }, []);

  console.log(events);

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "sold", headerName: "Sold out", minWidth: 130, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 100, flex: 0.6 },
    { field: "shopName", headerName: "Shop Name", minWidth: 100, flex: 0.6 },
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
            <Link to={`/product/${d}?isEvent=true`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "$" + item.discountPrice,
        stock: item.stock,
        sold: item?.sold_out,
        shopName: item?.shop.name,
      });
    });
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
          />
        </div>
      )}
    </>
  );
};

export default AdminDashboardEvents;
