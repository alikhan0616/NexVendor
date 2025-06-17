import React from "react";
import styles from "../../../styles/styles.js";
import CountDown from "./CountDown.jsx";
import { backend_url } from "../../../server.js";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart.js";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);

    if (isItemExists) {
      toast.warning("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart");
      }
    }
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 mt-4 `}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          src={`${backend_url}${data.images[0]}`}
          alt="product-img"
          className="max-w-[450px] max-h-[450px]"
        />
      </div>
      <div className="w-full lg:w-[50%] m-auto flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>{data.name}</h2>
        <p className="text-slate-800 line-clamp-5">{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-md text-red-600 pr-3 line-through">
              ${data.originalPrice}
            </h5>
            <h5 className="font-bold text-lg text-[#333] font-[Roboto]">
              ${data.discountPrice}
            </h5>
          </div>
          <span className={`pr-3 font-normal text-base text-[#44a55e]`}>
            120 Sold
          </span>
        </div>
        <CountDown data={data} />
        <div className="flex gap-2 items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div
              className={`${styles.button}  mt-5 bg-black hover:bg-slate-800`}
            >
              <span className="text-white font-[Poppins] text-md">
                See Details
              </span>
            </div>
          </Link>
          <div
            className={`${styles.button}  mt-5 flex gap-2 bg-black hover:bg-slate-800`}
            onClick={() => addToCartHandler(data._id)}
          >
            <span className="text-white font-[Poppins] text-md">
              Add to Cart
            </span>
            <AiOutlineShoppingCart className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
