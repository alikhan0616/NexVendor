import React from "react";
import styles from "../../styles/styles";
import { brandingData, categoriesData } from "../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`brading my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md `}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div key={index} className="flex items-start">
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-2.5 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-7">
          {categoriesData &&
            categoriesData.map((i, index) => {
              const handleSubmit = (i) => {
                navigate(`/products?categories=${i.title}`);
              };
              return (
                <div
                  className="w-full h-24 p-2 flex items-center justify-between  cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className="text-md leading-[1.3] ">{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[120px] h-[120px] object-contain "
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
