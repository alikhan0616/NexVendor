import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero";
import Categories from "../components/Route/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProducts from "../components/Rout/FeaturedProducts/FeaturedProducts";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
