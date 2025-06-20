import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { getAllEventsShop } from "../../redux/actions/event";
import { backend_url } from "../../server";
import Ratings from "../Payment/Ratings";
import EventCard from "../Route/Events/EventCard";
const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);

  const allReviews =
    products && products.map((product) => product.reviews).flat();
  return (
    <div className="w-full ">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-5">
          <div onClick={() => setActive(1)} className="flex items-center">
            <h5
              className={`font-semibold text-xl ${
                active === 1 ? "text-[#5A67D8]" : "text-[#333]"
              } cursor-pointer`}
            >
              Shop Products
            </h5>
          </div>
          <div onClick={() => setActive(2)} className="flex items-center">
            <h5
              className={`font-semibold text-xl   ${
                active === 2 ? "text-[#5A67D8]" : "text-[#333]"
              }   cursor-pointer`}
            >
              Running Events
            </h5>
          </div>
          <div onClick={() => setActive(3)} className="flex items-center">
            <h5
              className={`font-semibold text-xl  ${
                active === 3 ? "text-[#5A67D8]" : "text-[#333]"
              }   cursor-pointer`}
            >
              Show Reviews
            </h5>
          </div>
        </div>
        <div className="">
          {isOwner && (
            <div className="">
              <Link to="/dashboard">
                <div
                  className={`${styles.button} !rounded-[4px] h-10 bg-[#B66E41] hover:bg-orange-600 duration-300`}
                >
                  <span className="text-white">Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />

      {/* Products */}
      {active === 1 && (
        <>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
          {products && products.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Products available for this shop!
            </h5>
          )}
        </>
      )}

      {/* Events */}
      {active === 2 && (
        <>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
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
          {products && products.length === 0 && (
            <h5 className="w-full text-center py-5 text-[18px]">
              No Events available for this shop!
            </h5>
          )}
        </>
      )}
      {/* Reviews */}
      {active === 3 && (
        <div className="w-full">
          {allReviews &&
            allReviews.map((item, index) => (
              <div className="w-full flex my-5" key={index}>
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt="user-icon"
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2">
                  <div className="w-full flex items-center gap-2">
                    <h1 className=" text-slate-700 font-[500] ">
                      {item?.user?.name}
                    </h1>
                    <Ratings rating={item?.rating} />
                  </div>
                  <p className="text-[#000000a7]">{item?.comment}</p>
                  <p className="text-[#000000a7] text-sm">
                    {item.createdAt.slice(0, 10) || "2 days ago"}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
