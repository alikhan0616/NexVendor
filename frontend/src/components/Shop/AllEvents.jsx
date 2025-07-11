import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../../components/Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  deleteEvent,
  getAllEvents,
  getAllEventsShop,
} from "../../redux/actions/event";

const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    dispatch(getAllEvents());
    window.location.reload(true);
  };

  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Event ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "sold", headerName: "Sold Out", minWidth: 130, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 100, flex: 0.6 },
    {
      field: "Preview",
      headerName: "Preview",
      minWidth: 90,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.row.id}?isEvent=true`}>
          <Button
            className="!bg-[#B66E41] hover:!bg-orange-600 !text-white !rounded-full !min-w-0 !p-2 shadow"
            style={{ minWidth: 0 }}
          >
            <AiOutlineEye size={18} />
          </Button>
        </Link>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      minWidth: 120,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.id;
        return (
          <>
            <Button
              className="!text-red-600 hover:!text-white hover:!bg-red-600 !rounded-full !min-w-0 !p-2"
              onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>
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
        sold: 10,
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
      )}
    </>
  );
};

export default AllEvents;
