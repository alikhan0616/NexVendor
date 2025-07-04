import React from "react";
import styles from "../../../styles/styles";
import ProductCard from "../../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const FeaturedProducts = () => {
  const { allProducts } = useSelector((state) => state.product);
  return (
    <div className="bg-slate-50 py-8">
      <div className={`${styles.section}`}>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-700 mb-2">
            Featured Products
          </h1>
          <div className="mx-auto w-16 h-1 bg-orange-600 rounded"></div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {allProducts && allProducts.length !== 0 && (
            <>
              {allProducts.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
