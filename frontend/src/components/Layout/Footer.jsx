import React from "react";
import logo from "../../assets/N-removebg-preview.png";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="bg-[#000] text-white">
      {/* SUBSCRIBE NEWSLETTER SECTION */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#1D2D44]">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#B66E41]">Subscribe</span> to get news, <br />
          events and offers
        </h1>
        <div className="">
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 bg-white sm:w-72 w-full sm:mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#B66E41] mb-5 sm:mb-0 hover:bg-orange-600 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Subscribe
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            className="w-24 h-24"
            style={{ filter: "brightness(0) invert(1)" }}
            src={logo}
            alt=""
          />
          <br />
          <p className="font-semibold">
            The home and elements needed to create beautiful products.
          </p>
          <div className="flex  items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter size={25} className="ml-[15px] cursor-pointer" />
            <AiOutlineInstagram
              size={25}
              className="ml-[15px] cursor-pointer"
            />
            <AiOutlineYoutube size={25} className="ml-[15px] cursor-pointer" />
          </div>
        </ul>
        {/* FOOTER ITEMS  */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks &&
            footerProductLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-gray-400 hover:text-orange-600 duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks &&
            footercompanyLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-gray-400 hover:text-orange-600 duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks &&
            footerSupportLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-gray-400 hover:text-orange-600 duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center text-center text-gray-400 text-sm pb-8">
        <span>&copy; 2025 NexVendor. All rights reserved.</span>
        <span>Terms &#9702; Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            className="max-h-20 mx-auto "
            src="https://media.invisioncic.com/p289038/monthly_2022_10/Payment-methods.png.2b9ba23475aaa15189f555f77ec3a549.png"
            alt="payment-icons"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
