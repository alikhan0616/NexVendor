import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
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
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                className="w-[150px] h-[150px] object-cover rounded-full"
                src={data?.avatar?.url}
                alt="shop-icon"
              />
            </div>
            <h3 className="text-center py-2 text-xl ">{data?.name}</h3>
            <p className="text-base text-slate-800 p-2.5 flex items-center">
              {data?.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Address:</h5>
            <h4 className="text-[#000000a6]">{data?.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Phone Number:</h5>
            <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Total Products:</h5>
            <h4 className="text-[#000000a6]">{products && products.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Shop Rating:</h5>
            <h4 className="text-[#000000a6]">{averageRating}/5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-semibold">Joined On:</h5>
            <h4 className="text-[#000000a6]">
              {data.createdAt ? data.createdAt.slice(0, 10) : ""}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-black`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                onClick={logoutHandler}
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px] bg-red-600`}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
