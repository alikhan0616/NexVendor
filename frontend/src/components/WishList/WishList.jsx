import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

const WishList = ({ setOpenWishList }) => {
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
              onClick={() => setOpenWishList(false)}
              size={25}
              className="cursor-pointer"
            />
          </div>
          {/* ITEM LENGTH */}
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-lg font-semibold">3 items</h5>
          </div>
          {/* CART SINGLE ITEMS */}
          <br />
          <div className="w-full border-t border-gray-200">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  return (
    <div className="border-b border-gray-200  p-4">
      <div className="w-full flex items-center ">
        <RxCross1 className="cursor-pointer" />
        <img
          src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
          alt="product-img"
          className="w-[80px] h-[80px] ml-2"
        />

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-semibold text-[17px] text-red-600 font-[Roboto]">
            PKR {data.price}
          </h4>
        </div>
        <div className="">
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to cart"
          />
        </div>
      </div>
    </div>
  );
};

export default WishList;
