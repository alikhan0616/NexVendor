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
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000041] z-[9999]">
      <div className="fixed top-0 right-0 h-screen overflow-y-auto w-[90%] 800px:w-[28%] bg-white flex flex-col justify-between shadow-lg rounded-l-xl">
        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer text-slate-700 hover:text-orange-600"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <h5 className="text-slate-700 text-lg font-medium">
              Cart is empty
            </h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1
                  onClick={() => setOpenCart(false)}
                  size={25}
                  className="cursor-pointer text-slate-700 hover:text-orange-600"
                />
              </div>
              <div className="flex items-center p-4 border-b border-gray-200">
                <IoBagHandleOutline size={25} className="text-slate-700" />
                <h5 className="pl-2 text-lg font-semibold text-slate-700">
                  {cart && cart.length} Item(s)
                </h5>
              </div>
              <div className="divide-y divide-gray-200">
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
            <div className="p-5 border-t border-gray-200">
              <Link to="/checkout">
                <div className="h-11 flex items-center justify-center w-full bg-orange-600 hover:bg-orange-500 transition-colors duration-300 rounded-lg shadow-sm">
                  <h1 className="text-white text-lg font-semibold">
                    Checkout Now (USD ${totalPrice.toFixed(2)})
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
    <div className="flex items-center gap-3 p-4">
      <div className="flex flex-col items-center">
        <button
          className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-orange-500"
          onClick={() => increment(data)}
        >
          <HiPlus size={16} />
        </button>
        <span className="py-1 text-slate-700 font-medium">{data.qty}</span>
        <button
          className="bg-slate-200 text-slate-700 rounded-full w-6 h-6 flex items-center justify-center hover:bg-slate-300"
          onClick={() => decrement(data)}
        >
          <HiOutlineMinus size={16} />
        </button>
      </div>
      <img
        src={data.images[0].url}
        alt="product-img"
        className="w-16 h-16 rounded-md object-cover border border-gray-200"
      />
      <div className="flex-1">
        <h1 className="text-sm font-semibold text-slate-700 line-clamp-2">
          {data.name}
        </h1>
        <p className="text-sm text-slate-500">
          US${data.discountPrice} x {data.qty}
        </p>
        <p className="text-base font-bold text-orange-600">
          US${totalPrice.toFixed(2)}
        </p>
      </div>
      <RxCross1
        className="cursor-pointer text-slate-500 hover:text-red-600"
        size={20}
        onClick={() => removeFromCartHandler(data)}
      />
    </div>
  );
};

export default Cart;
