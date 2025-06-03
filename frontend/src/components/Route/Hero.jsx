import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] sm:min-h-[70vh] w-full bg-no-repeat object-cover ${styles.normalFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] sm:w-[60%]`}>
        <h1
          className={`text-4xl leading-[1.2] sm:text-6xl text-[#3d3a3a] font-semibold capitalize`}
        >
          Best Collection for <br /> Home Decoration
        </h1>
        <p className="pt-5 text-md font-[Poppins] font-medium text-slate-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          quasi deserunt excepturi, inventore numquam quisquam in eos illum
          beatae, doloremque doloribus impedit adipisci labore. Blanditiis
          tempora cumque placeat soluta alias.
        </p>
        <Link to={`/products`}>
          <div
            className={`${styles.button} rounded-xl mt-5 bg-black hover:bg-slate-800`}
          >
            <span className="text-white font-[Poppins] text-md">Shop Now</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
