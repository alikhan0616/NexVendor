import React, { useState } from "react";
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
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

function Footer() {
  const [email, setEmail] = useState("");
  const handleSubscription = async () => {
    if (email.length < 6) {
      toast.error("Enter valid email");
      return;
    }
    axios
      .post(`${server}/subscribe`, { email })
      .then((res) => {
        toast.success(res.data.message);
        setEmail("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="bg-[#181F2A] text-white">
      {/* SUBSCRIBE NEWSLETTER SECTION */}
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#232F3E] border-b border-[#B66E41]/20">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#B66E41]">Subscribe</span> to get news, <br />
          events and offers
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email..."
            className="text-slate-700 bg-white sm:w-72 w-full py-2.5 rounded px-3 focus:outline-none border border-slate-200"
          />
          <button
            onClick={handleSubscription}
            className="bg-[#B66E41] hover:bg-orange-600 duration-300 px-6 py-2.5 rounded-md text-white font-semibold shadow-md w-full sm:w-auto"
          >
            Subscribe
          </button>
        </div>
      </div>
      {/* MAIN FOOTER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:px-8 px-5 py-16 sm:text-center">
        {/* LOGO & SOCIAL */}
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            className="w-24 h-24 mx-auto mb-2"
            style={{ filter: "brightness(0.9) invert(0.9)" }}
            src={logo}
            alt="logo"
          />
          <p className="font-semibold text-slate-200 mb-3">
            The home and elements needed to create beautiful products.
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="#" aria-label="Facebook">
              <AiFillFacebook
                size={28}
                className="hover:text-[#B66E41] transition"
              />
            </a>
            <a href="#" aria-label="Twitter">
              <AiOutlineTwitter
                size={28}
                className="hover:text-[#B66E41] transition"
              />
            </a>
            <a href="#" aria-label="Instagram">
              <AiOutlineInstagram
                size={28}
                className="hover:text-[#B66E41] transition"
              />
            </a>
            <a href="#" aria-label="YouTube">
              <AiOutlineYoutube
                size={28}
                className="hover:text-[#B66E41] transition"
              />
            </a>
          </div>
        </ul>
        {/* FOOTER LINKS */}
        <ul className="text-center sm:text-start">
          <h1 className="mb-2 font-bold text-orange-600 tracking-wide text-lg">
            Company
          </h1>
          {footerProductLinks &&
            footerProductLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-slate-300 hover:text-[#B66E41] duration-300 text-sm cursor-pointer leading-7"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-2 font-bold text-orange-600 tracking-wide text-lg">
            Shop
          </h1>
          {footercompanyLinks &&
            footercompanyLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-slate-300 hover:text-[#B66E41] duration-300 text-sm cursor-pointer leading-7"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
        <ul className="text-center sm:text-start">
          <h1 className="mb-2 font-bold text-orange-600 tracking-wide text-lg">
            Support
          </h1>
          {footerSupportLinks &&
            footerSupportLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className="text-slate-300 hover:text-[#B66E41] duration-300 text-sm cursor-pointer leading-7"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      {/* BOTTOM BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-center text-center text-slate-400 text-sm pb-8 border-t border-[#B66E41]/10">
        <span>&copy; 2025 NexVendor. All rights reserved.</span>
        <span>
          <a href="#" className="hover:text-[#B66E41] transition">
            Terms
          </a>{" "}
          &#9702;{" "}
          <a href="#" className="hover:text-[#B66E41] transition">
            Privacy Policy
          </a>
        </span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            className="max-h-12 mx-auto"
            src="https://media.invisioncic.com/p289038/monthly_2022_10/Payment-methods.png.2b9ba23475aaa15189f555f77ec3a549.png"
            alt="payment-icons"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
