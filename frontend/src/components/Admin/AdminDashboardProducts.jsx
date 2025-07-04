import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

const AdminDashboardProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/product/admin-all-products`, { withCredentials: true })
      .then((res) => {
        setProducts(res.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "sold", headerName: "Sold Out", minWidth: 130, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 100, flex: 0.6 },
    { field: "shopName", headerName: "Shop Name", minWidth: 150, flex: 0.8 },
    {
      field: "Preview",
      headerName: "Preview",
      minWidth: 90,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Link to={`/product/${params.row.id}`}>
          <Button
            className="!bg-[#B66E41] hover:!bg-orange-600 !text-white !rounded-full !min-w-0 !p-2 shadow"
            style={{ minWidth: 0 }}
          >
            <AiOutlineEye size={18} />
          </Button>
        </Link>
      ),
    },
  ];

  const row =
    products?.map((item) => ({
      id: item._id,
      name: item.name,
      price: "$" + item.discountPrice,
      stock: item.stock,
      sold: item?.sold_out,
      shopName: item?.shop.name,
    })) || [];

  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[24px] font-semibold text-[#B66E41] pb-2">
          All Products
        </h3>
        <div className="w-full rounded-xl shadow bg-white p-2">
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
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
