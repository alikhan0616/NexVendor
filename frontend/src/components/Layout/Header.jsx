import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import logo from "../../assets/N-removebg-preview.png";
import { categoriesData, productData } from "../../static/data.jsx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown.jsx";
import NavBar from "./NavBar.jsx";
const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden sm:h-[50px sm:my-[20px] sm:flex items-center justify-between">
          <div className="">
            <Link to="/">
              <img className="h-24 w-24" src={logo} alt="logo" />
            </Link>
          </div>
          {/* SEARCH BAR */}
          <div className="w-[50%] relative items-center ">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#D1D5DB] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={18}
              className="absolute right-2 top-2.5 cursor-pointer"
            />
            {searchData && searchData.length > 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;

                    const Product_name = d.replace(/\s+/g, "-");

                    return (
                      <Link key={index} to={`/product/${Product_name}`}>
                        <div className="w-full flex items-start p-3 hover:bg-[#D1D5DB]">
                          <img
                            className="w-[40px] h-[40px] mr-[10px]"
                            src={i.image_Url[0].url}
                            alt="product-icon"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div
            className={`${styles.button} rounded-xl bg-[#0D1321] hover:bg-slate-800`}
          >
            <Link to="/seller">
              <h1 className="text-white flex items-center">
                Become a Seller <IoIosArrowForward className="ml-1 " />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true
            ? "shadow-sm fixed top-0 left-0 z-10 bg-[#1D2D44] transition-all duration-500 ease-in-out"
            : "transition-all duration-500 ease-in-out"
        } transition hidden sm:flex items-center justify-between w-full bg-[#1D2D44]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* Categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden md:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] cursor-pointer w-full flex justify-between items-center pl-12 pb-1 bg-white rounded-t-md font-sans font-[500] select-none`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* NAV ITEMS */}
          <div className={`${styles.normalFlex}`}>
            <NavBar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#B66E41] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#B66E41] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <Link to={"/login"}>
                  <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
