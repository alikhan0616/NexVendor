import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiOutlineMinusCircle, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Iphone 14 Pro Max 128gb SSD 8gb RAM Black colour",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi fuga quaerat at qui consequuntur vero sint ipsam ex labore, tempore alias, iure aut ea quia est adipisci non autem doloribus!",
      price: 999,
    },
    {
      name: "Iphone 14 Pro Max 128gb SSD 8gb RAM Black colour",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi fuga quaerat at qui consequuntur vero sint ipsam ex labore, tempore alias, iure aut ea quia est adipisci non autem doloribus!",
      price: 231,
    },
    {
      name: "Iphone 14 Pro Max 128gb SSD 8gb RAM Black colour",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi fuga quaerat at qui consequuntur vero sint ipsam ex labore, tempore alias, iure aut ea quia est adipisci non autem doloribus!",
      price: 823,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#00000041] h-screen z-10">
      <div className="fixed  top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div className="">
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
            <h5 className="pl-2 text-lg font-semibold">3 items</h5>
          </div>
          {/* CART SINGLE ITEMS */}
          <br />
          <div className="w-full border-t border-gray-200">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
        <div className="px-5 mb-3">
          {/* CHECKOUT BUTTON */}
          <Link to="/checkout">
            <div className="h-11 flex items-center justify-center w-[100%] bg-[#D97B45]  rounded-[5px]">
              <h1 className="text-white text-lg font-bold">
                Checkout Now (PKR 1000)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b border-gray-200  p-4">
      <div className="w-full flex items-center ">
        <div className="">
          <div
            className={`bg-[#F4B183] border border-[#D99873] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value === 25 ? 25 : value + 1)}
          >
            <HiPlus size={18} className="text-white" />
          </div>
          <span className="pl-[8px] pt-[2px] ">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={18} />
          </div>
        </div>
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt="product-img"
          className="w-[80px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-base text-[#00000082]">
            PKR {data.price} * {value}
          </h4>
          <h4 className="font-semibold text-[17px] text-red-600 font-[Roboto]">
            PKR {totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;
