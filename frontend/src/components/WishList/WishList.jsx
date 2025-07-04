import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromwishlist } from "../../redux/actions/wishlist";
import { backend_url } from "../../server";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const WishList = ({ setOpenWishList }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromwishlist(data));
  };

  const addToCartHandler = (id, data) => {
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
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000041] z-[9999]">
      <div className="fixed top-0 right-0 overflow-y-auto h-screen w-[90%] 800px:w-[28%] bg-white flex flex-col justify-between shadow-lg rounded-l-xl">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-slate-700 hover:text-orange-600"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5 className="text-slate-700 text-lg font-medium">
              Wishlist is empty
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  onClick={() => setOpenWishList(false)}
                  size={25}
                  className="cursor-pointer text-slate-700 hover:text-orange-600"
                />
              </div>
              <div className="flex items-center p-4 border-b border-gray-200">
                <AiOutlineHeart size={25} className="text-slate-700" />
                <h5 className="pl-2 text-lg font-semibold text-slate-700">
                  {wishlist && wishlist.length} Item(s)
                </h5>
              </div>
              <div className="divide-y divide-gray-200">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <WishListSingle
                      key={index}
                      data={i}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishListSingle = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
}) => {
  return (
    <div className="flex items-center gap-3 p-4">
      <RxCross1
        size={20}
        className="cursor-pointer text-slate-500 hover:text-red-600"
        onClick={() => removeFromWishlistHandler(data)}
      />
      <img
        src={data.images[0].url}
        alt="product-img"
        className="w-16 h-16 rounded-md object-cover border border-gray-200"
      />
      <div className="flex-1">
        <h1 className="text-sm font-semibold text-slate-700 line-clamp-2">
          {data.name}
        </h1>
        <p className="text-base font-bold text-orange-600">
          US${data.discountPrice}
        </p>
      </div>
      <BsCartPlus
        size={20}
        onClick={() => addToCartHandler(data._id, data)}
        className="cursor-pointer text-slate-700 hover:text-orange-600"
        title="Add to cart"
      />
    </div>
  );
};

export default WishList;
