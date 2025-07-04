import React from "react";
import styles from "../../styles/styles";

const sponsors = [
  {
    src: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
    alt: "Sony",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/1280px-LG_logo_%282014%29.svg.png",
    alt: "LG",
  },
  {
    src: "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
    alt: "Dell",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png",
    alt: "Apple",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
    alt: "Amazon",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2017/06/Samsung-logo.jpg",
    alt: "Samsung",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2019/09/Razer-Logo.jpg",
    alt: "Razer",
  },
  {
    src: "https://1000logos.net/wp-content/uploads/2020/08/Shopify-Logo.jpg",
    alt: "Shopify",
  },
];

const Sponsered = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-8 px-5 mb-12 rounded-xl overflow-hidden`}
    >
      <div className="relative w-full">
        <div className="flex items-center gap-12 animate-marquee">
          {sponsors.concat(sponsors).map((s, idx) => (
            <div className="flex items-center" key={idx}>
              <img
                className="w-[120px] h-[60px] object-contain grayscale hover:grayscale-0 transition duration-300"
                src={s.src}
                alt={s.alt}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Marquee animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            width: 200%;
            animation: marquee 25s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Sponsered;
