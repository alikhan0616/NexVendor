import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import Footer from "../components/Layout/Footer";
const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("categories");
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      console.log(categoryData);
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts, searchParams]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section} mt-10 800px:mt-0`}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30x] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No Products Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductPage;
