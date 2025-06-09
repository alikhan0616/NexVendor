import { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    const firstFive = allProducts && allProducts.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  return (
    <div>
      <div className={`${styles.section} `}>
        {/* HEADING DIV */}
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        {/* PRODUCT CARD DIV */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30x] mb-12 border-0">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
