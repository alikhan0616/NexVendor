import React from "react";
import styles from "../../../styles/styles";
import { productData } from "../../../static/data";
import ProductCard from "../../Route/ProductCard/ProductCard";

const FeaturedProducts = () => {
  return (
    <div className="">
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-5 xl:gap-[30x] mb-12 border-0">
          {productData &&
            productData.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
