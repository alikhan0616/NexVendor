import React from "react";
import styles from "../../styles/styles";
import { brandingData, categoriesData } from "../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white rounded-xl shadow-md border border-slate-100 p-5 hover:shadow-lg transition group"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-50 border-2 border-orange-100 group-hover:scale-105 transition">
                  {React.cloneElement(i.icon, { size: 32, color: "#ea580c" })}
                </div>
                <div>
                  <h3 className="font-bold text-slate-700 text-base mb-1">
                    {i.title}
                  </h3>
                  <p className="text-sm text-slate-500">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-8">
          {categoriesData &&
            categoriesData.map((i, index) => {
              const handleSubmit = (i) => {
                navigate(`/products?categories=${i.title}`);
              };
              return (
                <div
                  className="flex items-center justify-between bg-slate-50 border-l-4 border-orange-600 rounded-lg p-4 cursor-pointer shadow-sm hover:shadow-lg transition group"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <div>
                    <h5 className="text-lg font-semibold text-slate-700 group-hover:text-orange-600 transition">
                      {i.title}
                    </h5>
                  </div>
                  <img
                    src={i.image_Url}
                    className="w-[80px] h-[80px] object-contain rounded-lg border border-[#B66E41]/20 bg-white"
                    alt={i.title}
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
