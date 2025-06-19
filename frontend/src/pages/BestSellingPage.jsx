import { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import { useEffect } from "react";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    const d = allProducts.slice().sort((a, b) => b.sold_out - a.sold_out);
    setData(d);
  }, [allProducts]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section} mt-10 800px:mt-0`}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30x] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
