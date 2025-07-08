import { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import logo from "../../assets/N-removebg-preview.png";
import { categoriesData } from "../../static/data.jsx";
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
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart.jsx";
import WishList from "../WishList/WishList.jsx";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { allProducts } = useSelector((state) => state.product);
  const { isSeller } = useSelector((state) => state.seller);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handleSearchFocus = () => {
    // Keep search results visible when input is focused
  };

  const handleSearchBlur = (e) => {
    // Close search results when clicking outside
    setTimeout(() => {
      if (!e.currentTarget.contains(document.activeElement)) {
        setSearchData(null);
      }
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      const headerElement = document.querySelector(".main-header");
      const headerHeight = headerElement?.offsetHeight || 70;
      if (window.scrollY >= headerHeight) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* TOP HEADER */}
      <div
        className={`${styles.section} w-full px-4 py-2 main-header bg-gradient-to-r from-slate-50 to-slate-100 shadow-lg`}
      >
        <div className="hidden 800px:h-[80px] max-h 800px:my-[15px] 800px:flex items-center justify-between">
          {/* LOGO */}
          <div className="group">
            <Link to="/" className="flex items-center">
              <div className="relative overflow-hidden rounded-full p-2 bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                <img
                  className="h-16 w-16 object-contain transform group-hover:scale-110 transition-transform duration-300"
                  src={logo}
                  alt="logo"
                />
              </div>
            </Link>
          </div>

          {/* SEARCH BAR */}
          <div className="w-[50%] relative" onBlur={handleSearchBlur}>
            <div className="relative group">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className="h-[50px] w-full px-6 pr-14 bg-white border-2 border-slate-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-slate-700 placeholder-slate-400"
              />
              <div className="absolute right-2 top-2 bg-orange-600 hover:bg-orange-700 rounded-full p-2 cursor-pointer transition-all duration-300 transform hover:scale-105">
                <AiOutlineSearch size={20} className="text-white" />
              </div>
            </div>

            {searchData && searchData.length > 0 && searchTerm !== "" ? (
              <div className="absolute min-w-full bg-white shadow-2xl z-[99999] mt-2 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="max-h-[400px] overflow-y-auto">
                  {searchData &&
                    searchData.map((i, index) => {
                      const d = i._id;
                      return (
                        <Link
                          key={index}
                          onClick={() => {
                            setSearchTerm("");
                            setSearchData(null);
                          }}
                          to={`/product/${d}`}
                        >
                          <div className="flex items-center p-4 hover:bg-slate-50 transition-all duration-200 border-b border-slate-100 last:border-b-0">
                            <div className="w-12 h-12 rounded-lg overflow-hidden mr-4 bg-slate-100">
                              <img
                                className="w-full h-full object-cover"
                                src={i.images[0].url}
                                alt="product-icon"
                              />
                            </div>
                            <h1 className="text-slate-700 font-medium">
                              {i.name}
                            </h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              </div>
            ) : null}
          </div>

          {/* SELLER BUTTON */}
          <div className="group">
            <Link to={isSeller ? "/dashboard" : "/shop-create"}>
              <button className="bg-gradient-to-r from-slate-700 cursor-pointer to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <span>{isSeller ? "Dashboard" : "Become a Seller"}</span>
                <IoIosArrowForward className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div
        className={`${
          active
            ? "shadow-2xl fixed top-0 left-0 z-40 backdrop-blur-md bg-slate-900/95 transition-all duration-500 ease-in-out transform translate-y-0"
            : ""
        } transition-all duration-500 hidden 800px:flex items-center justify-between w-full bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between py-2`}
        >
          {/* CATEGORIES DROPDOWN */}
          <div className="relative z-[9999]">
            <div
              onClick={() => setDropDown(!dropDown)}
              className="relative h-[50px] w-[280px] hidden md:block group cursor-pointer"
            >
              <div className="h-full w-full bg-white hover:bg-slate-50 rounded-lg flex items-center px-4 transition-all duration-300 shadow-lg hover:shadow-xl">
                <BiMenuAltLeft size={28} className="text-slate-700 mr-3" />
                <span className="text-slate-700 font-semibold flex-1">
                  All Categories
                </span>
                <IoIosArrowDown
                  size={20}
                  className={`text-slate-700 transition-transform duration-300 ${
                    dropDown ? "rotate-180" : ""
                  }`}
                />
              </div>
              {dropDown && (
                <div className="absolute top-full left-0 mt-2 w-full z-[9999]">
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                </div>
              )}
            </div>
          </div>
          {/* NAVIGATION ITEMS */}
          <div className={`${styles.normalFlex}`}>
            <NavBar active={activeHeading} />
          </div>

          {/* USER ACTIONS */}
          <div className="flex items-center space-x-4">
            {/* WISHLIST */}
            <div
              onClick={() => setOpenWishList(true)}
              className="relative cursor-pointer group"
            >
              <div className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-300 transform hover:scale-110">
                <AiOutlineHeart size={24} className="text-white" />
              </div>
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* CART */}
            <div
              onClick={() => setOpenCart(true)}
              className="relative cursor-pointer group"
            >
              <div className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-300 transform hover:scale-110">
                <AiOutlineShoppingCart size={24} className="text-white" />
              </div>
              {cart && cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-pulse">
                  {cart.length}
                </span>
              )}
            </div>

            {/* PROFILE */}
            <div className="relative cursor-pointer group">
              {isAuthenticated && !loading ? (
                <Link to="/profile">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-600 hover:border-orange-500 transition-all duration-300 transform hover:scale-110">
                    <img
                      className="w-full h-full object-cover"
                      src={user?.avatar.url}
                      alt="profile"
                    />
                  </div>
                </Link>
              ) : (
                <Link to="/login">
                  <div className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-300 transform hover:scale-110">
                    <CgProfile size={24} className="text-white" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div
        className={`${
          active ? "shadow-2xl backdrop-blur-md bg-white/95" : "bg-white"
        } w-full h-[70px] fixed z-40 top-0 left-0 shadow-lg 800px:hidden transition-all duration-300`}
      >
        <div className="w-full h-full flex items-center justify-between px-4">
          {/* MOBILE MENU */}
          <div className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-300">
            <BiMenuAltLeft
              size={28}
              className="text-slate-700 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>

          {/* MOBILE LOGO */}
          <div className="flex-1 flex justify-center">
            <Link to="/">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-lg">
                <img
                  src={logo}
                  alt="NexVendor-logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* MOBILE CART */}
          <div className="relative" onClick={() => setOpenCart(true)}>
            <div className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-300">
              <AiOutlineShoppingCart
                className="cursor-pointer text-slate-700"
                size={28}
              />
            </div>
            {cart && cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </div>
        </div>

        {/* MOBILE SIDEBAR */}
        {open && (
          <div className="fixed w-full bg-black/50 backdrop-blur-sm z-50 h-full top-0 left-0">
            <div className="fixed w-[85%] bg-white h-screen top-0 left-0 z-50 overflow-y-auto shadow-2xl">
              {/* SIDEBAR HEADER */}
              <div className="w-full flex justify-between items-center p-6 border-b border-slate-200">
                <div className="flex items-center space-x-4">
                  <div
                    className="relative"
                    onClick={() => {
                      setOpenWishList(true);
                      setOpen(false);
                    }}
                  >
                    <div className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-300">
                      <AiOutlineHeart size={24} className="text-slate-700" />
                    </div>
                    {wishlist && wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {wishlist.length}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-300">
                  <RxCross1
                    size={24}
                    className="text-slate-700 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>

              {/* MOBILE SEARCH */}
              <div className="p-6 border-b border-slate-200">
                <div className="relative" onBlur={handleSearchBlur}>
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="h-[50px] w-full px-6 pr-14 bg-slate-50 border-2 border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-slate-700"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                  />
                  <div className="absolute right-2 top-2 bg-orange-600 rounded-full p-2">
                    <AiOutlineSearch size={20} className="text-white" />
                  </div>
                </div>

                {searchData && searchData.length > 0 && (
                  <div className="mt-4 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-30">
                    <div className="max-h-[300px] overflow-y-auto">
                      {searchData.map((i, index) => {
                        const d = i.name;
                        const Product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link
                            key={index}
                            onClick={() => setOpen(false)}
                            to={`/product/${Product_name}`}
                          >
                            <div className="flex items-center p-4 hover:bg-slate-50 transition-all duration-200 border-b border-slate-100 last:border-b-0">
                              <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 bg-slate-100">
                                <img
                                  className="w-full h-full object-cover"
                                  src={i.images[0].url}
                                  alt="product-icon"
                                />
                              </div>
                              <h1 className="text-slate-700 font-medium">
                                {i.name}
                              </h1>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* MOBILE NAVIGATION */}
              <div className="p-6 border-b border-slate-200">
                <NavBar active={activeHeading} />
              </div>

              {/* MOBILE SELLER BUTTON */}
              <div className="p-6 border-b border-slate-200">
                <Link to={isSeller ? "/dashboard" : "/shop-create"}>
                  <button className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>{isSeller ? "Dashboard" : "Become a Seller"}</span>
                    <IoIosArrowForward />
                  </button>
                </Link>
              </div>

              {/* MOBILE AUTH SECTION */}
              <div className="p-6">
                <div className="flex justify-center">
                  {!isAuthenticated ? (
                    <div className="flex space-x-4">
                      <Link
                        to="/login"
                        className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                      >
                        Login
                      </Link>
                      <Link
                        to="/sign-up"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                      >
                        Sign Up
                      </Link>
                    </div>
                  ) : (
                    <Link to="/profile">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-orange-600 shadow-lg">
                        <img
                          className="w-full h-full object-cover"
                          src={user?.avatar?.url}
                          alt="user-icon"
                        />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CART & WISHLIST MODALS */}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <WishList setOpenWishList={setOpenWishList} />}
    </>
  );
};

export default Header;
