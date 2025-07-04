import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { backend_url } from "../../../server.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addTowishlist,
  removeFromwishlist,
} from "../../../redux/actions/wishlist.js";
import { addTocart } from "../../../redux/actions/cart.js";
import { toast } from "react-toastify";
import Ratings from "../../Payment/Ratings.jsx";

const ProductCard = ({ data, isEvent }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);

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
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  return (
    <>
      <div className="w-full h-[390px] bg-white rounded-xl shadow-lg p-4 relative cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl border border-slate-100">
        {/* Quick Actions Row (absolute, only in card) */}
        <div className="absolute right-3 top-3 flex flex-col gap-3 z-3">
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer"
              onClick={() => removeFromWishlistHandler(data)}
              color="#ea580c"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer"
              onClick={() => addToWishListHandler(data)}
              color="#334155"
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            color="#334155"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer"
            onClick={() => addToCartHandler(data._id)}
            color="#ea580c"
            title="Add to cart"
          />
        </div>

        {/* Product Image */}
        <Link
          to={
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
        >
          <div className="w-full h-[170px] flex items-center justify-center mb-2 bg-slate-50 rounded-lg overflow-hidden">
            <img
              src={data.images && data.images[0].url}
              alt="product-img"
              className="max-h-[160px] object-contain"
            />
          </div>
        </Link>

        {/* Shop Name */}
        <Link to={`/shop/preview/${data?.shop?._id}`}>
          <h5
            className="text-[#B66E41] font-semibold text-sm mb-1 hover:underline"
            style={{ letterSpacing: "0.5px" }}
          >
            {data.shop.name}
          </h5>
        </Link>

        {/* Product Name */}
        <Link
          to={
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }
        >
          <h4 className="pb-2 font-semibold text-slate-700 text-base leading-tight min-h-[40px]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <Ratings rating={data?.ratings} />
          <div className="py-2 flex items-center justify-between">
            <div className="flex items-end gap-2">
              <h5 className="text-lg font-bold text-orange-600">
                $
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
              </h5>
              {data.originalPrice && (
                <h4 className="text-sm line-through text-slate-400">
                  ${data.originalPrice}
                </h4>
              )}
            </div>
            <span className="font-medium text-xs px-2 py-1 rounded bg-[#B66E41]/10 text-[#B66E41]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* Product Detail Modal */}
      </div>
      {open ? <ProductDetailCard setOpen={setOpen} data={data} /> : null}
    </>
  );
};

export default ProductCard;
