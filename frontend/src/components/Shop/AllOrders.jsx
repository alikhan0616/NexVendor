import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import { getAllOrdersShop } from "../../redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Layout/Loader";

const AllOrders = () => {
  const { seller } = useSelector((state) => state.seller);
  const { orders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersShop(seller._id));
  }, []);
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

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
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
      )}
    </>
  );
};

export default AllOrders;
