import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url } from "../../server";
import {
  addTowishlist,
  removeFromwishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";

const ProductDetails = ({ data }) => {
  const { products } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data.shop?._id));
  }, [dispatch, data]);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const descrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    if (count < 25) {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromwishlist(data));
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addTowishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.warning("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart");
      }
    }
  };
  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=1231bh21k@jhas");
  };

  return (
    <div className="bg-white">
      {data ? (
        <>
          <div
            className={`${styles.section} mt-12 800px:mt-0 w-[90%] 800px:w-[80%] `}
          >
            {/* UPPER DIV */}
            <div className="w-full py-5 ">
              <div className="block w-[100%] 800px:flex">
                {/* LEFT BOX */}
                <div className="w-full 800px:w-[50%]">
                  <img
                    src={`${backend_url}${data && data.images[select]}`}
                    className="w-[80%] max-h-[600px] "
                    alt=""
                  />
                  <div className="w-full flex flex-wrap">
                    {data &&
                      data.images.map((i, index) => (
                        <div
                          className={`${
                            select === index ? "border" : "null"
                          } cursor-pointer mt-4 `}
                        >
                          <img
                            src={`${backend_url}${i}`}
                            alt=""
                            className="max-h-[80px] max-w-[80px] object-cover overflow-hidden mr-3 mt-3"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))}
                    <div
                      className={`${
                        select === 1 ? "border border-gray-200" : "null"
                      } cursor-pointer`}
                    ></div>
                  </div>
                </div>
                {/* RIGHT BOX */}
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data?.name}</h1>
                  <p className="text-slate-700">{data?.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ${data.discountPrice}
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice ? "$" + data.originalPrice : null}
                    </h3>
                  </div>
                  <div className="flex items-center mt-12 justify-between pr-3">
                    <div className="">
                      <button
                        onClick={descrementCount}
                        className="bg-gradient-to-r w-12 from-[#1D2D44] to-[#3E5C76] text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                      >
                        -
                      </button>
                      <span className="bg-gray-200 text-gray-800 font-md px-4 py-[10px]">
                        {count}
                      </span>
                      <button
                        onClick={incrementCount}
                        className="bg-gradient-to-l w-12 from-[#1D2D44] to-[#3E5C76] text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                      >
                        +
                      </button>
                    </div>
                    <div className="">
                      {click ? (
                        <AiFillHeart
                          size={30}
                          className="cursor-pointer "
                          onClick={() => removeFromWishlistHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={30}
                          className="cursor-pointer "
                          onClick={() => addToWishListHandler(data)}
                          color={click ? "red" : "#333"}
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    onClick={() => addToCartHandler(data._id)}
                    className={`${styles.button} bg-black !mt-6 !rounded-[4px] !h-11 flex items-center`}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div className="flex items-center pt-8">
                    <Link to={`/shop/preview/${data?.shop?._id}`}>
                      <img
                        src={`${backend_url}${data?.shop?.avatar}`}
                        alt="shop-img"
                        className="w-[50px] h-[50px] rounded-full mr-2"
                      />
                    </Link>
                    <div className="pr-8">
                      <Link to={`/shop/preview/${data?.shop?._id}`}>
                        <h3 className={`${styles.shop_name} mb-1 pt-1`}>
                          {data.shop.name}
                        </h3>
                      </Link>
                      <h5 className="pb-3 -mt-3 text-[15px]">(4/5) Ratings</h5>
                    </div>
                    <div
                      className={`${styles.button} bg-green-600 !mt-4 !rounded !h-11`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-white flex items-center">
                        Send Message <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* LOWER DIV */}
            <ProductDetailsInfo data={data} products={products} />
            <br />
            <br />
          </div>
        </>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data, products }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full flex justify-between border-b border-b-gray-200 pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-slate-800 text-lg px-1 leading-5 font-semibold cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-slate-800 text-lg px-1 leading-5 font-semibold cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-slate-800 text-lg px-1 leading-5 font-semibold cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {/* PRODUCT DETAILS */}
      {active === 1 && (
        <>
          <p className="text-slate-700 text-lg leading-8 pb-10 py-2 whitespace-pre-line">
            {data?.description}
          </p>
        </>
      )}
      {/* PRODUCT REVIEWS */}
      {active === 2 && (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      )}
      {/* SELLER INFORMATION */}
      {active === 3 && (
        <>
          <div className="w-full block 800px:flex p-5">
            <div className="w-full 800px:w-[50%] ">
              <div className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar}`}
                  alt="shop-img"
                  className="w-[50px] h-[50px] rounded-full "
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-3 -mt-3 text-[15px]">(2/5) Ratings</h5>
                </div>
              </div>
              <p className="pt-2 text-slate-700">{data.shop.description}</p>
            </div>
            <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
              <div className="text-left">
                <h5 className="font-semibold">
                  Joined on:{" "}
                  <span className="font-[500]">
                    {data?.shop?.createdAt?.slice(0, 10)}
                  </span>
                </h5>
                <h5 className="font-semibold pt-3">
                  Total Products:{" "}
                  <span className="font-[500]">
                    {products && products.length}
                  </span>
                </h5>
                <h5 className="font-semibold pt-3">
                  Total Reviews: <span className="font-[500]">128</span>
                </h5>
                <Link to={`/shop/preview/${data?.shop?._id}`}>
                  <div
                    className={`${styles.button} bg-[#B66E41] duration-300 hover:bg-orange-600 !rounded-[4px] !h-[39.5px] !mt-3`}
                  >
                    <h4 className="text-white">Visit Shop</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
