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
      className={`w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-4 mt-3 flex flex-col lg:flex-row gap-8 transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl`}
    >
      {/* Image Section */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={data.images[0].url}
          alt="product-img"
          className="max-w-[320px] max-h-[320px] rounded-xl bg-slate-50 border border-slate-100 object-contain"
        />
      </div>
      {/* Details Section */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{data.name}</h2>
        <p className="text-slate-600 mb-4 line-clamp-5">{data.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-end gap-2">
            <span className="text-base font-medium text-slate-400 line-through">
              ${data.originalPrice}
            </span>
            <span className="text-xl font-bold text-orange-600">
              ${data.discountPrice}
            </span>
          </div>
          <span className="font-semibold text-xs px-3 py-1 rounded bg-[#B66E41]/10 text-[#B66E41]">
            {data?.sold_out} Sold
          </span>
        </div>
        <CountDown data={data} />
        <div className="flex gap-3 items-center mt-6">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <button className="px-5 py-2 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow transition">
              See Details
            </button>
          </Link>
          <button
            className="px-5 py-2 rounded-md bg-slate-700 hover:bg-orange-600 text-white font-semibold flex items-center gap-2 shadow transition"
            onClick={() => addToCartHandler(data._id)}
          >
            Add to Cart
            <AiOutlineShoppingCart className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
