import React, { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllEventsShop } from "../../redux/actions/event";
import Ratings from "../Payment/Ratings";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex w-full items-center justify-between border-b border-slate-200 pb-2 mb-6">
        <div className="flex gap-2 sm:gap-5">
          <button
            onClick={() => setActive(1)}
            className={`px-4 py-2 rounded-t-md font-semibold text-base sm:text-xl transition-all duration-200 ${
              active === 1
                ? "bg-orange-600 text-white shadow"
                : "bg-slate-100 text-slate-700 hover:bg-orange-50"
            }`}
          >
            Shop Products
          </button>
          <button
            onClick={() => setActive(2)}
            className={`px-4 py-2 rounded-t-md font-semibold text-base sm:text-xl transition-all duration-200 ${
              active === 2
                ? "bg-orange-600 text-white shadow"
                : "bg-slate-100 text-slate-700 hover:bg-orange-50"
            }`}
          >
            Running Events
          </button>
          <button
            onClick={() => setActive(3)}
            className={`px-4 py-2 rounded-t-md font-semibold text-base sm:text-xl transition-all duration-200 ${
              active === 3
                ? "bg-orange-600 text-white shadow"
                : "bg-slate-100 text-slate-700 hover:bg-orange-50"
            }`}
          >
            Show Reviews
          </button>
        </div>
        {isOwner && (
          <Link to="/dashboard">
            <div
              className={`${styles.button} !rounded-[4px] h-10 bg-[#B66E41] hover:bg-orange-600 duration-300 flex items-center px-5`}
            >
              <span className="text-white font-semibold">Dashboard</span>
            </div>
          </Link>
        )}
      </div>

      {/* Products */}
      {active === 1 && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-6 mb-12">
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
          {products && products.length === 0 && (
            <h5 className="w-full text-center py-5 text-lg text-slate-500">
              No Products available for this shop!
            </h5>
          )}
        </>
      )}

      {/* Events */}
      {active === 2 && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-6 mb-12">
            {events &&
              events.map((i, index) => (
                <ProductCard
                  data={i}
                  key={index}
                  isShop={true}
                  isEvent={true}
                />
              ))}
          </div>
          {(!events || events.length === 0) && (
            <h5 className="w-full text-center py-5 text-lg text-slate-500">
              No Events available for this shop!
            </h5>
          )}
        </>
      )}

      {/* Reviews */}
      {active === 3 && (
        <div className="w-full">
          {allReviews && allReviews.length > 0 ? (
            allReviews.map((item, index) => (
              <div
                className="w-full flex items-start gap-4 my-5 bg-slate-50 rounded-xl p-4 shadow-sm"
                key={index}
              >
                <img
                  src={item.user.avatar.url}
                  alt="user-icon"
                  className="w-12 h-12 rounded-full border-2 border-orange-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-slate-700 font-semibold">
                      {item?.user?.name}
                    </h1>
                    <Ratings rating={item?.rating} />
                  </div>
                  <p className="text-slate-600">{item?.comment}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {item.createdAt?.slice(0, 10) || "Recently"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h5 className="w-full text-center py-5 text-lg text-slate-500">
              No Reviews available for this shop!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
