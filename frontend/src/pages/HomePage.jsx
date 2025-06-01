import React from "react";
import Header from "../components/Layout/Header.jsx";
import Hero from "../components/Route/Hero.jsx";
import Categories from "../components/Route/Categories.jsx";
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
    </div>
  );
};

export default HomePage;
