import React, { useEffect, useState } from "react";
import { server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.product);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);

    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const logoutHandler = () => {
    axios
      .get(`${server}/shop/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);
  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=1231bh21k@jhas");
  };

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6">
          {/* Shop Avatar & Name */}
          <div className="flex flex-col items-center">
            <img
              className="w-36 h-36 object-cover rounded-full border-4 border-[#B66E41] shadow"
              src={data?.avatar?.url}
              alt="shop-icon"
            />
            <h3 className="text-center py-3 text-2xl font-bold text-[#B66E41]">
              {data?.name}
            </h3>
            <p className="text-base text-slate-700 px-2 text-center">
              {data?.description}
            </p>
          </div>
          {/* Shop Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 rounded-lg p-4 flex flex-col items-center border border-orange-100 shadow-sm">
              <span className="text-xs text-slate-500 font-medium mb-1">
                Total Products
              </span>
              <span className="text-xl font-bold text-orange-600">
                {products && products.length}
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 flex flex-col items-center border border-orange-100 shadow-sm">
              <span className="text-xs text-slate-500 font-medium mb-1">
                Shop Rating
              </span>
              <span className="text-xl font-bold text-orange-600">
                {averageRating ? averageRating.toFixed(1) : "0"}/5
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="bg-slate-50 rounded-lg p-4 flex flex-col items-center border border-orange-100 shadow-sm">
              <span className="text-xs text-slate-500 font-medium mb-1">
                Phone Number
              </span>
              <span className="text-base font-semibold text-slate-700">
                {data?.phoneNumber}
              </span>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 flex flex-col items-center border border-orange-100 shadow-sm">
              <span className="text-xs text-slate-500 font-medium mb-1">
                Joined On
              </span>
              <span className="text-base font-semibold text-slate-700">
                {data.createdAt ? data.createdAt.slice(0, 10) : ""}
              </span>
            </div>
          </div>
          {/* Address */}
          <div className="mt-6 bg-[#B66E41]/10 rounded-lg p-4 text-center">
            <h5 className="font-semibold text-[#B66E41] mb-1">Address</h5>
            <h4 className="text-slate-700">{data?.address}</h4>
          </div>
          {/* Owner Actions */}
          {isOwner && (
            <div className="flex flex-col gap-3 mt-6">
              <Link to="/settings">
                <button className="w-full py-3 rounded-md bg-[#B66E41] hover:bg-orange-600 text-white font-semibold shadow transition">
                  Edit Shop
                </button>
              </Link>
              <button
                onClick={logoutHandler}
                className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold shadow transition"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
