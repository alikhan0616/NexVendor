import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);
  const handleMessageSubmit = () => {};
  const descrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    if (count < 20) {
      setCount(count + 1);
    }
  };
  return (
    <div className="bg-white ">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 items-center flex justify-center">
          <div className="w-[90%] sm:w-[60%] h-[99vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex ">
              {/* LEFT DIV OF DETAILS */}
              <div className="w-full 800px:w-[50%]">
                <img src={data?.image_Url[0].url} alt="product-img" />
                <div className="flex">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt="shop-img"
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div className="">
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-black mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-base text-red-600 mt-5">
                  ({data.total_sell}) Sold
                </h5>
              </div>
              {/* RIGHT DIV OF DETAILS */}
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-xl`}>
                  {data.name}
                </h1>
                <p className="text-sm mt-2 text-slate-800">
                  {data.description}
                </p>
                <div className="flex pt-3">
                  <h4 className={styles.productDiscountPrice}>
                    {data.discount_price} PKR
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + " PKR" : null}
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
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer "
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-black mt-6 rounded-[4px] h-11 flex items-center`}
                >
                  <span className="text-white flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
