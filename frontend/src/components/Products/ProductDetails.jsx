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
import { server } from "../../server";
import {
  addTowishlist,
  removeFromwishlist,
} from "../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";
import Ratings from "../Payment/Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const { products } = useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { user, isAuthenticated } = useSelector((state) => state.user);
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

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data.shop._id + user._id;
      const userId = user._id;
      const sellerId = data?.shop._id;
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

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  // Description "See more" logic
  const [showFullDesc, setShowFullDesc] = useState(false);
  const descPreviewLength = 180;
  const isLongDesc =
    data?.description && data.description.length > descPreviewLength;
  const descToShow =
    showFullDesc || !isLongDesc
      ? data?.description
      : data?.description.slice(0, descPreviewLength) + "...";
  return (
    <div className="bg-slate-50 min-h-screen">
      {data ? (
        <div className={`${styles.section} mt-10 w-full max-w-6xl mx-auto`}>
          {/* PRODUCT MAIN SECTION */}
          <div className="flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-lg p-6">
            {/* LEFT: Images */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full flex justify-center mb-4">
                <img
                  src={data && data.images[select].url}
                  className="w-[90%] max-h-[420px] object-contain rounded-xl border border-slate-100 bg-slate-50"
                  alt="big-product-img"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {data &&
                  data.images.map((i, index) => (
                    <img
                      key={index}
                      src={i.url}
                      alt="product-img"
                      className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer transition ${
                        select === index
                          ? "border-orange-600 ring-2 ring-orange-200"
                          : "border-slate-200"
                      }`}
                      onClick={() => setSelect(index)}
                    />
                  ))}
              </div>
            </div>
            {/* RIGHT: Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Product Name with accent bar */}
                <div className="flex items-center mb-4">
                  <div className="w-2 h-8 bg-orange-600 rounded-r mr-3" />
                  <h1 className="text-2xl font-bold text-slate-700">
                    {data?.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Ratings rating={averageRating} />
                  <span className="text-sm text-slate-500">
                    ({averageRating && averageRating.toFixed(1)}/5)
                  </span>
                  <span className="text-xs text-slate-400 ml-2">
                    {totalReviewsLength} reviews
                  </span>
                </div>
                <div className="mb-4 text-slate-700 leading-7">
                  {descToShow}
                  {isLongDesc && (
                    <button
                      className="ml-2 text-orange-600 font-semibold hover:underline focus:outline-none"
                      onClick={() => setShowFullDesc((prev) => !prev)}
                    >
                      {showFullDesc ? "See less" : "See more"}
                    </button>
                  )}
                </div>
                <div className="flex items-end gap-4 mb-6">
                  <span className="text-3xl font-extrabold text-orange-600 drop-shadow">
                    ${data.discountPrice}
                  </span>
                  {data.originalPrice && (
                    <span className="text-lg line-through text-slate-400">
                      ${data.originalPrice}
                    </span>
                  )}
                  <span className="ml-4 text-xs font-semibold px-3 py-1 rounded-full bg-[#B66E41]/10 text-[#B66E41] shadow">
                    {data?.sold_out} sold
                  </span>
                </div>
                {/* Quantity & Wishlist */}
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
                {/* Add to Cart */}
                <button
                  onClick={() => addToCartHandler(data._id)}
                  className="w-full bg-slate-700 hover:bg-orange-600 text-white rounded-md py-3 font-semibold flex items-center justify-center transition mb-4"
                >
                  Add to cart <AiOutlineShoppingCart className="ml-2" />
                </button>
                {/* Seller Info */}
                <div className="flex items-center gap-4 mt-6">
                  <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <img
                      src={data?.shop?.avatar.url}
                      alt="shop-img"
                      className="w-12 h-12 rounded-full border-2 border-[#B66E41]"
                    />
                  </Link>
                  <div>
                    <Link to={`/shop/preview/${data?.shop?._id}`}>
                      <h3 className="text-[#B66E41] font-bold text-lg hover:underline">
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="text-xs text-slate-500">
                      Seller • Joined {data?.shop?.createdAt?.slice(0, 10)}
                    </h5>
                  </div>
                  <button
                    className="ml-auto bg-orange-600 hover:bg-orange-700 text-white rounded-md px-4 py-2 font-semibold flex items-center transition"
                    onClick={handleMessageSubmit}
                  >
                    <AiOutlineMessage className="mr-2" /> Message Seller
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* PRODUCT TABS */}
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-white rounded-xl shadow mt-10 px-3 md:px-10 py-6">
      <div className="w-full flex flex-col md:flex-row justify-between border-b border-b-gray-200 pb-2">
        <div className="relative mb-2 md:mb-0">
          <h5
            className={`text-slate-800 text-lg px-1 leading-5 font-semibold cursor-pointer md:text-[20px] transition ${
              active === 1 ? "text-orange-600" : ""
            }`}
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className="h-1 bg-orange-600 rounded w-full mt-1" />
          ) : null}
        </div>
        <div className="relative mb-2 md:mb-0">
          <h5
            className={`text-slate-800 text-lg px-1 leading-5 font-semibold cursor-pointer md:text-[20px] transition ${
              active === 2 ? "text-orange-600" : ""
            }`}
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className="h-1 bg-orange-600 rounded w-full mt-1" />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={`text-slate-800 text-lg px-1 leading-5 font-semibold cursor-pointer md:text-[20px] transition ${
              active === 3 ? "text-orange-600" : ""
            }`}
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className="h-1 bg-orange-600 rounded w-full mt-1" />
          ) : null}
        </div>
      </div>
      {/* PRODUCT DETAILS */}
      {active === 1 && (
        <div className="text-slate-700 text-lg leading-8 py-6 whitespace-pre-line">
          {data?.description}
        </div>
      )}
      {/* PRODUCT REVIEWS */}
      {active === 2 && (
        <div className="w-full mt-4 overflow-y-auto min-h-[40vh] flex flex-col items-center">
          {data &&
            data?.reviews.map((item, index) => (
              <div className="w-full flex my-2 items-center bg-slate-50 rounded-lg p-3 shadow-sm">
                <img
                  src={item.user.avatar.url}
                  alt="user-icon"
                  className="w-[50px] h-[50px] rounded-full border-2 border-orange-600"
                />
                <div className="pl-4 flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-slate-700 font-semibold">
                      {item?.user?.name}
                    </h1>
                    <Ratings rating={item?.rating} />
                  </div>
                  <p className="text-slate-600">{item?.comment}</p>
                </div>
              </div>
            ))}
          {data && data.reviews.length === 0 && (
            <h5 className="text-xl text-slate-500 mt-8">No Reviews Yet!</h5>
          )}
        </div>
      )}
      {/* SELLER INFORMATION */}
      {active === 3 && (
        <div className="w-full flex flex-col md:flex-row gap-8 p-5 bg-slate-50 rounded-xl shadow border border-slate-100">
          <div className="flex-1 flex items-center">
            <img
              src={data?.shop?.avatar.url}
              alt="shop-img"
              className="w-[70px] h-[70px] rounded-full border-4 border-[#B66E41] shadow"
            />
            <div className="pl-5">
              <h3 className="text-[#B66E41] font-extrabold text-xl flex items-center gap-2">
                {data.shop.name}
                <span className="bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full ml-2">
                  Seller
                </span>
              </h3>
              <h5 className="text-slate-500 text-sm mt-1">
                ({averageRating && averageRating.toFixed(1)}/5) Ratings
              </h5>
              <p className="pt-2 text-slate-700">{data.shop.description}</p>
              <span className="inline-block bg-[#B66E41]/10 text-[#B66E41] font-semibold text-xs px-3 py-1 rounded-full mt-3">
                Joined: {data?.shop?.createdAt?.slice(0, 10)}
              </span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center md:items-end mt-6 md:mt-0">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:justify-end mb-4">
              <div className="flex flex-col items-center bg-white border border-orange-100 rounded-lg px-6 py-3 shadow-sm">
                <span className="text-xs text-slate-500 font-medium mb-1">
                  Total Products
                </span>
                <span className="text-lg font-bold text-orange-600">
                  {products && products.length}
                </span>
              </div>
              <div className="flex flex-col items-center bg-white border border-orange-100 rounded-lg px-6 py-3 shadow-sm">
                <span className="text-xs text-slate-500 font-medium mb-1">
                  Total Reviews
                </span>
                <span className="text-lg font-bold text-orange-600">
                  {totalReviewsLength}
                </span>
              </div>
            </div>
            <Link
              to={`/shop/preview/${data?.shop?._id}`}
              className="w-full md:w-auto"
            >
              <button className="w-full md:w-auto bg-[#B66E41] hover:bg-orange-600 duration-300 rounded-md h-12 flex items-center justify-center px-8 cursor-pointer transition shadow text-white font-semibold text-base tracking-wide">
                Visit Shop
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
