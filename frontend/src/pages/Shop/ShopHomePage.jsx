import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full py-10 800px:flex 800px:justify-between justify-center">
        <div className="800px:w-[25%]  w-full bg-white rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[90vh] 800px:sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="800px:w-[72%] rounded-[4px] mt-5 800px:mt-0">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
