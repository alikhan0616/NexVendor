import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-orange-600 border-b-transparent animate-spin-reverse"></div>
      </div>
    </div>
  );
};

export default Loader;
