import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import SuggestedProduct from "../components/Products/SuggestedProducts";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { allEvents } = useSelector((state) => state.event);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [id, allProducts]);
  return (
    <div>
      <Header />
      {data ? <ProductDetails data={data} /> : <Loader />}
      {!eventData && <>{data && <SuggestedProduct data={data} />}</>}

      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
