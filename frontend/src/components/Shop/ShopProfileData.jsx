import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import styles from "../../styles/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
  }, [dispatch]);

  const [active, setActive] = useState(1);
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
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {products &&
          products.map((i, index) => (
            <ProductCard data={i} key={index} isShop={true} />
          ))}
      </div>
      {products && products.length === 0 && (
        <h5 className="w-full text-center py-5 text-[18px]">
          No Products have for this shop!
        </h5>
      )}
    </div>
  );
};

export default ShopProfileData;
