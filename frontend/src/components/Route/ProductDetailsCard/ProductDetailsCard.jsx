import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../../server";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addTowishlist,
  removeFromwishlist,
} from "../../../redux/actions/wishlist";
import axios from "axios";
import { getAllProductsShop } from "../../../redux/actions/product";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const dispatch = useDispatch();
  const id = data._id;
  useEffect(() => {
    dispatch(getAllProductsShop(data && data.shop?._id));
  }, [dispatch, data]);
  // const [select, setSelect] = useState(false);

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

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

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data.shopId + user._id;
      const userId = user._id;
      const sellerId = data?.shopId;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox/?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else toast.error("Please login to contact seller");
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

  const descToShow = showFullDesc
    ? data.description
    : `${data.description.substring(0, 100)}...`;
  const isLongDesc = data.description && data.description.length > 100;

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[95%] sm:w-[70%] md:w-[60%] max-w-4xl h-[98vh] md:h-[80vh] overflow-y-auto bg-white rounded-xl shadow-2xl relative p-6 flex flex-col md:flex-row gap-8">
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 text-slate-700 hover:text-orange-600 transition"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <RxCross1 size={28} />
            </button>

            {/* LEFT: Product Image & Shop */}
            <div className="flex-1 flex flex-col items-center md:items-start">
              <Link to={`/product/${data._id}`}>
                <img
                  src={data.images && data.images[0].url}
                  alt="product-img"
                  className="w-56 h-56 object-contain rounded-lg bg-slate-50 border border-slate-100 mb-4"
                />
              </Link>
              <div className="flex items-center mb-4">
                <Link to={`/shop/preview/${data.shop._id}`}>
                  <img
                    src={data.shop.avatar && data.shop.avatar.url}
                    alt="shop-img"
                    className="w-12 h-12 rounded-full border-2 border-[#B66E41] mr-3"
                  />
                </Link>
                <div>
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <h3 className="text-[#B66E41] font-bold text-lg hover:underline">
                      {data.shop.name}
                    </h3>
                  </Link>
                  <h5 className="text-xs text-slate-500">
                    ({averageRating && averageRating.toFixed(1)}/5) Ratings
                  </h5>
                </div>
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded bg-[#B66E41]/10 text-[#B66E41] font-semibold text-sm mb-2">
                {data?.sold_out} Sold
              </div>
              <button
                className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md py-2 font-semibold flex items-center justify-center transition"
                onClick={handleMessageSubmit}
              >
                Send Message <AiOutlineMessage className="ml-2" />
              </button>
            </div>

            {/* RIGHT: Product Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Link to={`/product/${data._id}`}>
                  <h1 className="text-2xl font-bold text-slate-700 mb-2">
                    {data.name}
                  </h1>
                </Link>
                <p className="text-base text-slate-600 mb-4">
                  {descToShow}
                  {isLongDesc && (
                    <button
                      className="ml-2 text-orange-600 font-semibold hover:underline focus:outline-none"
                      onClick={() => setShowFullDesc((prev) => !prev)}
                    >
                      {showFullDesc ? "See less" : "See more"}
                    </button>
                  )}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <h4 className="text-2xl font-bold text-orange-600">
                    $
                    {data.originalPrice === 0
                      ? data.originalPrice
                      : data.discountPrice}
                  </h4>
                  {data.originalPrice && (
                    <span className="text-lg line-through text-slate-400">
                      ${data.originalPrice}
                    </span>
                  )}
                </div>
                {/* Quantity Selector & Wishlist */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border border-slate-200 rounded overflow-hidden">
                    <button
                      onClick={descrementCount}
                      className="w-10 h-10 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xl transition"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-slate-700 font-semibold">
                      {count}
                    </span>
                    <button
                      onClick={incrementCount}
                      className="w-10 h-10 bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xl transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ml-2"
                    onClick={
                      click
                        ? () => removeFromWishlistHandler(data)
                        : () => addToWishListHandler(data)
                    }
                    aria-label="Wishlist"
                  >
                    {click ? (
                      <AiFillHeart size={28} color="#ea580c" />
                    ) : (
                      <AiOutlineHeart size={28} color="#334155" />
                    )}
                  </button>
                </div>
              </div>
              {/* Add to Cart Button */}
              <div className="pb-4">
                <button
                  className="w-full bg-slate-700 hover:bg-orange-600 text-white rounded-md py-3 font-semibold flex items-center justify-center transition"
                  onClick={() => addToCartHandler(data._id)}
                >
                  Add to cart <AiOutlineShoppingCart className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
