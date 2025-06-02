import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetails = ({ data }) => {
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
  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=1231bh21k@jhas");
  };

  return (
    <div className="bg-white">
      {data ? (
        <>
          <div className={`${styles.section} w-[90%] 800px:w-[80%] `}>
            <div className="w-full py-5 ">
              <div className="block w-[100%] 800px:flex">
                {/* LEFT BOX */}
                <div className="w-full 800px:w-[50%]">
                  <img
                    src={data?.image_Url[select].url}
                    className="w-[80%] "
                    alt=""
                  />
                  <div className="w-full flex">
                    <div
                      className={`${
                        select === 0 ? "border border-gray-200" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={data?.image_Url[0].url}
                        alt="product-img"
                        className="h-[200px]"
                        onClick={() => setSelect(0)}
                      />
                    </div>
                    <div
                      className={`${
                        select === 1 ? "border border-gray-200" : "null"
                      } cursor-pointer`}
                    >
                      <img
                        src={data?.image_Url[1].url}
                        alt="product-img"
                        className="h-[200px]"
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>
                </div>
                {/* RIGHT BOX */}
                <div className="w-full 800px:w-[50%] pt-5">
                  <h1 className={`${styles.productTitle}`}>{data?.name}</h1>
                  <p className="text-slate-700">{data?.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discount_price} PKR
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.price ? data.price + "PKR" : null}
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
                    className={`${styles.button} bg-black !mt-6 !rounded-[4px] !h-11 flex items-center`}
                  >
                    <span className="text-white flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div className="flex items-center pt-8">
                    <img
                      src={data?.shop.shop_avatar.url}
                      alt="shop-img"
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div className="pr-8">
                      <h3 className={`${styles.shop_name} mb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 -mt-3 text-[15px]">
                        ({data.shop.ratings}) Ratings
                      </h5>
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
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProductDetails;
