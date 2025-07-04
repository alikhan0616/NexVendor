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
    <div className="bg-slate-50 py-8">
      <div className={`${styles.section}`}>
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-700 mb-2">Best Deals</h1>
          <div className="mx-auto w-16 h-1 bg-orange-600 rounded"></div>
        </div>
        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.length !== 0 && (
            <>
              {data.map((i, index) => (
                <ProductCard data={i} key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
