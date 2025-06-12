import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import SuggestedProduct from "../components/Products/SuggestedProducts";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.product);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = allProducts && allProducts.find((i) => i._id === id);
    setData(data);
  }, [id, allProducts]);
  return (
    <div>
      <Header />
      {data ? <ProductDetails data={data} /> : <Loader />}
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
