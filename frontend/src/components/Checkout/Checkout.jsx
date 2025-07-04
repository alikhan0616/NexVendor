import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [userInfo, setUserInfo] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);

  const navigate = useNavigate();

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + Number(item.qty) * Number(item.discountPrice),
    0
  );

  const shipping = subTotalPrice * 0.1;
  const discountPercentage = couponData ? discountPrice : 0;
  const totalPrice = couponData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${server}/coupon/get-coupon-value/${coupon}`
      );
      const couponCode = res.data.couponCode;

      if (!couponCode) {
        toast.error("Coupon Code doesn't exist!");
        setCoupon("");
        return;
      }

      const isCouponValid = cart.filter(
        (item) => item.shopId === couponCode.shopId
      );
      if (isCouponValid.length === 0) {
        toast.error("Coupon code is not valid for this shop!");
        setCoupon("");
        return;
      }

      const eligiblePrice = isCouponValid.reduce(
        (acc, item) => acc + item.qty * item.discountPrice,
        0
      );

      const discount = (eligiblePrice * couponCode.value) / 100;
      setDiscountPrice(discount);
      setCouponData(couponCode);
      setCoupon("");
    } catch (error) {
      toast.error("Failed to apply coupon");
    }
  };

  const paymentSubmit = () => {
    if (!address1 || !zipCode || !country || !city) {
      toast.error("Please complete the shipping address!");
      return;
    }

    const shippingAddress = { address1, address2, zipCode, country, city };
    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] flex flex-col 800px:flex-row gap-8">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%]">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            coupon={coupon}
            setCoupon={setCoupon}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <button
        onClick={paymentSubmit}
        className="mt-10 bg-slate-700 hover:bg-orange-600 text-white py-2 px-6 rounded-xl transition-all duration-200 w-[150px] 800px:w-[280px]"
      >
        Go to Payment
      </button>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  const [checked, setChecked] = useState(0);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">
        Shipping Address
      </h2>
      <form>
        <div className="grid grid-cols-1 800px:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Zip Code</label>
            <input
              type="text"
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border h-[40px] rounded-md px-2"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">State / Province</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border h-[40px] rounded-md px-2"
            >
              <option value="">Select State</option>
              {State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 800px:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Address 1</label>
            <input
              type="text"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={styles.input}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Address 2</label>
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </form>
      <div
        className="text-base text-slate-700 mt-5 flex items-center gap-2 cursor-pointer"
        onClick={() => setUserInfo(!userInfo)}
      >
        <span>Choose from saved addresses</span>
        {userInfo ? <IoIosArrowDown /> : <IoIosArrowUp />}
      </div>
      {userInfo && user?.addresses?.length > 0 && (
        <div className="mt-4 space-y-2">
          {user.addresses.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <input
                type="checkbox"
                checked={index + 1 === checked}
                onChange={() => {
                  setAddress1(item.address1);
                  setAddress2(item.address2);
                  setZipCode(item.zipCode);
                  setCountry(item.country);
                  setCity(item.city);
                  setChecked(index + 1);
                }}
              />
              <label>{item.addressType}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  coupon,
  setCoupon,
  discountPercentage,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="space-y-3">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>${subTotalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between border-b pb-2 text-slate-600">
          <span>Discount</span>
          <span>
            {discountPercentage ? `-$${discountPercentage.toFixed(2)}` : "-"}
          </span>
        </div>
        <div className="flex justify-between font-semibold text-slate-800 pt-2">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupon code"
          required
        />
        <button
          type="submit"
          className="w-full h-[40px] bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Apply Code
        </button>
      </form>
    </div>
  );
};

export default Checkout;
