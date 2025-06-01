import React from "react";
import styles from "../../styles/styles";

const Sponsered = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            className="w-[150px] object-contain"
            src="https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png"
            alt="sponser-img"
          />
        </div>
        <div className="flex items-start">
          <img
            className="w-[150px] object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/LG_logo_%282014%29.svg/1280px-LG_logo_%282014%29.svg.png"
            alt="sponser-img"
          />
        </div>
        <div className="flex items-start">
          <img
            className="w-[150px] object-contain"
            src="https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png"
            alt="sponser-img"
          />
        </div>
        <div className="flex items-start">
          <img
            className="w-[150px] object-contain"
            src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png"
            alt="sponser-img"
          />
        </div>
        <div className="flex items-start">
          <img
            className="w-[150px] object-contain"
            src="https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png"
            alt="sponser-img"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsered;
