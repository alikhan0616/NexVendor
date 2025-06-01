import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero";
import Categories from "../components/Route/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProducts from "../components/Route/FeaturedProducts/FeaturedProducts";
import Events from "../components/Events/Events.jsx";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;
