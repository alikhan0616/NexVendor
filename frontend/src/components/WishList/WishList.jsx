import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
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
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000041] z-10">
      <div className="fixed top-0 right-0 overflow-y-auto h-screen w-[80%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishList(false)}
              />
            </div>
            <h5>Wishlist Items are empty</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  onClick={() => setOpenWishList(false)}
                  size={25}
                  className="cursor-pointer"
                />
              </div>
              {/* ITEM LENGTH */}
              <div className={`${styles.normalFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-lg font-semibold">
                  {wishlist && wishlist.length} Item(s)
                </h5>
              </div>
              {/* WISHLIST SINGLE ITEMS */}
              <br />
              <div className="w-full border-t border-gray-200">
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
    <div className="border-b border-gray-200 p-4">
      <div className="w-full flex items-center">
        <RxCross1
          size={24}
          className="cursor-pointer"
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${backend_url}${data.images[0]}`}
          alt="product-img"
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1 className="text-sm line-clamp-3">{data.name}</h1>
          <h4 className="font-semibold text-[17px] text-red-600 font-[Roboto]">
            US${data.discountPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            onClick={() => addToCartHandler(data._id, data)}
            className="cursor-pointer"
            title="Add to wishlist"
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
