import React, { useState, useEffect } from "react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const heroImages = [
    {
      url: "https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg",
      title: "Shop Everything You Love in One Place",
      subtitle:
        "Discover trending products, essential gadgets, and great deals",
    },
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Premium Quality Products",
      subtitle: "Experience excellence with our curated collection",
    },
    {
      url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      title: "Fast & Secure Delivery",
      subtitle: "Get your favorites delivered right to your doorstep",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleDotClick = (index) => {
    if (index !== currentImageIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const currentImage = heroImages[currentImageIndex];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ${
          isAnimating ? "scale-110 opacity-70" : "scale-100 opacity-100"
        }`}
        style={{
          backgroundImage: `url(${currentImage.url})`,
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-transparent"></div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-2 h-2 bg-orange-600 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-orange-600 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-1 h-1 bg-orange-600 rounded-full opacity-80 animate-bounce"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-0 flex items-center min-h-screen pt-20 sm:pt-24 lg:pt-28">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Main Title */}
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 transition-all duration-500 ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentImage.title}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-xl sm:text-2xl text-slate-300 mb-8 leading-relaxed transition-all duration-500 delay-100 ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentImage.subtitle}
              <br />
              <span className="text-orange-600 font-medium">
                Fast delivery, secure checkout, new favorites daily.
              </span>
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-500 delay-200 ${
                isAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <a href="/products">
                <button className="group relative px-8 py-4 cursor-pointer bg-orange-600 hover:bg-orange-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-orange-600/25">
                  <span className="relative z-5">Shop Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </a>

              <a href="/faq">
                <button className="group px-8 cursor-pointer py-4 border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105">
                  <span>Learn More</span>
                </button>
              </a>
            </div>

            {/* Image Navigation Dots */}
            <div className="flex space-x-3">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-orange-600 w-8"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-900/50 to-transparent"></div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 border border-orange-600/30 rounded-full animate-spin-slow hidden lg:block"></div>
      <div className="absolute bottom-1/4 right-20 w-12 h-12 border border-white/20 rounded-full animate-pulse hidden lg:block"></div>

      {/* Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-orange-600 transition-all duration-300 ease-out"
        style={{
          width: `${((currentImageIndex + 1) / heroImages.length) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default Hero;
