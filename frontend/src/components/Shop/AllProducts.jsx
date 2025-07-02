import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProducts,
  getAllProductsShop,
} from "../../redux/actions/product";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../../components/Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAllProducts());
    window.location.reload(true);
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Name", minWidth: 180, flex: 1.4 },
    { field: "price", headerName: "Price", minWidth: 100, flex: 0.6 },
    { field: "sold", headerName: "Sold out", minWidth: 130, flex: 0.6 },
    { field: "stock", headerName: "Stock", minWidth: 100, flex: 0.6 },
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
            <Link to={`/product/${d}`}>
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
      headerName: "Delete",
      minWidth: 120,
      flex: 0.8,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        const d = params.row.id;
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "$" + item.discountPrice,
        stock: item.stock,
        sold: item?.sold_out,
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

export default AllProducts;
