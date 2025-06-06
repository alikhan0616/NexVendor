import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const handleSubmit = (i) => {
    navigate(`/products?categories=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-md shadow-sm">
      {categoriesData
        ? categoriesData.map((i, index) => (
            <div
              key={index}
              className={`${styles.normalFlex} `}
              onClick={() => handleSubmit(i)}
            >
              <img
                className="w-[25px] h-[25px] object-contain ml-[10px] select-none"
                src={i.image_Url}
                alt="product-img"
              />
              <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
            </div>
          ))
        : null}
    </div>
  );
};

export default DropDown;
