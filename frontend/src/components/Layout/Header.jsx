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
import { backend_url } from "../../server.js";
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
      <div className={`${styles.section} main-header`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
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
            {searchData && searchData.length > 0 && searchTerm !== "" ? (
              <div className="absolute min-w-full min-h-[30vh] max-h-[100px] overflow-y-auto bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i._id;

                    return (
                      <Link
                        key={index}
                        onClick={() => {
                          setSearchTerm("");
                          setSearchData([]);
                        }}
                        to={`/product/${d}`}
                      >
                        <div className="flex items-start p-3 hover:bg-[#D1D5DB]">
                          <img
                            className="w-[40px] h-[40px] mr-[10px]"
                            src={`${backend_url}${i.images[0]}`}
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
            className={`${styles.button}  rounded-xl bg-[#0D1321] hover:bg-slate-800`}
          >
            <Link to={isSeller ? "/dashboard" : "/shop-create"}>
              <h1 className="text-white flex items-center">
                {isSeller ? "DashBoard" : "Become a Seller"}{" "}
                <IoIosArrowForward className="ml-1 " />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active
            ? "shadow-sm fixed top-0 left-0 z-10 bg-[#1D2D44] transition-all duration-300 ease-in-out transform translate-y-0"
            : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#1D2D44]`}
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
              <div
                onClick={() => setOpenWishList(true)}
                className="relative cursor-pointer mr-[15px]"
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#B66E41] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div
                onClick={() => setOpenCart(true)}
                className="relative cursor-pointer mr-[15px]"
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#B66E41] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated && !loading ? (
                  <Link className="" to={"/profile"}>
                    <img
                      className="h-[40px] w-[40px] rounded-full"
                      src={`${backend_url}${user.avatar}`}
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {/* CART POP UP */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* WISHLIST POP UP */}
            {openWishlist ? (
              <WishList setOpenWishList={setOpenWishList} />
            ) : null}
          </div>
        </div>
      </div>

      {/* MOBILE HEADER */}
      <div
        className={`${
          active === true ? "shadow-sm  top-0 left-0 z-10" : null
        } w-full h-[60px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div className="">
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div className="">
            <Link to={"/"}>
              <img
                src={logo}
                alt="NexVendor-logo"
                className="w-15 h-15 mt-[2px]"
              />
            </Link>
          </div>
          <div className="">
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart className="cursor-pointer" size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#B66E41] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>
        {/* HEADER SIDEBAR */}
        {/* CART POP UP */}
        {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        {/* WISHLIST POP UP */}
        {openWishlist ? <WishList setOpenWishList={setOpenWishList} /> : null}
        {open && (
          <div className="fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0">
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div className="">
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishList(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#B66E41] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="mt-5"
                  ml-4
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40p%] ">
                <input
                  type="search"
                  placeholder="Search product..."
                  className="h-[40px] w-full px-2 border-[#D1D5DB] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && searchData.length > 0 ? (
                  <div className="absolute min-h-[30vh] mr-1 bg-slate-50 shadow-sm-2 z-[9] p-4">
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;

                        const Product_name = d.replace(/\s+/g, "-");

                        return (
                          <Link
                            key={index}
                            onClick={() => setOpen(false)}
                            to={`/product/${Product_name}`}
                          >
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
              <NavBar active={activeHeading} />
              <div
                className={`${styles.button} ml-4 rounded-xl bg-[#0D1321] hover:bg-slate-800`}
              >
                <Link to={isSeller ? "/dashboard" : "/shop-create"}>
                  <h1 className="text-white flex items-center">
                    {isSeller ? "DashBoard" : "Become a Seller"}{" "}
                    <IoIosArrowForward className="ml-1 " />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />
              <div className="flex w-full justify-center">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="text-lg text-slate-900 pr-[10px]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-lg text-slate-900 pr-[10px]"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <div className="">
                    <Link to="/profile">
                      <img
                        className="w-[60px] h-[60px] rounded-full object-cover border-[3px] border-[#1D2D44]"
                        src={`${backend_url}${user.avatar}`}
                        alt="user-icon"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
