import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const NavBar = ({ active }) => {
  return (
    <div className={`${styles.normalFlex} justify-between`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              className={
                active == index + 1
                  ? "text-[#B66E41]  px-6 "
                  : "text-white font-[500] px-6 cursor-pointer"
              }
              to={i.url}
            >
              {i.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default NavBar;
