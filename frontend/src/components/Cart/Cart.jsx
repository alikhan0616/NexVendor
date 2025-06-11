import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { addTocart, removeFromcart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromcart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000041] z-10">
      <div className="fixed top-0 right-0 h-screen w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5>Cart Items are empty</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  onClick={() => setOpenCart(false)}
                  size={25}
                  className="cursor-pointer"
                />
              </div>
              {/* ITEM LENGTH */}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-lg font-semibold">
                  {cart && cart.length} Item(s)
                </h5>
              </div>
              {/* CART SINGLE ITEMS */}
              <br />
              <div className="w-full border-t border-gray-200">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>
            <div className="px-5 mb-3">
              {/* CHECKOUT BUTTON */}
              <Link to="/checkout">
                <div className="h-11 flex items-center justify-center w-[100%] bg-[#D97B45]  rounded-[5px]">
                  <h1 className="text-white text-lg font-bold">
                    Checkout Now (USD ${totalPrice})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * data.qty;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value === 25 ? 25 : value + 1);
      const updateCartData = { ...data, qty: value === 25 ? 25 : value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b border-gray-200  p-4">
      <div className="w-full flex items-center ">
        <div>
          <div
            className={`bg-[#F4B183] border border-[#D99873] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} className="text-white" />
          </div>
          <span className="pl-[8px] pt-[2px] ">{data.qty}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={18} />
          </div>
        </div>
        <img
          src={`${backend_url}${data.images[0]}`}
          alt="product-img"
          className="w-[80px] h-[80px] ml-2 rounded-[5px] object-cover"
        />
        <div className="pl-[5px]">
          <h1 className="line-clamp-3">{data.name}</h1>
          <h4 className="font-[400] text-base text-[#00000082]">
            US${data.discountPrice} * {data.qty}
          </h4>
          <h4 className="font-semibold text-[17px] text-red-600 font-[Roboto]">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer"
          size={40}
          onClick={() => removeFromCartHandler(data)}
        />
      </div>
    </div>
  );
};

export default Cart;
