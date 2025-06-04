import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const NavBar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.normalFlex} 800px:justify-between`}>
      {navItems &&
        navItems.map((i, index) => (
          <div key={index} className="flex">
            <Link
              className={`${
                active == index + 1
                  ? "text-[#B66E41]  px-6 "
                  : "text-black 800px:text-white font-[500] px-6 cursor-pointer"
              } mb-[30px] 800px:mb-0`}
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
