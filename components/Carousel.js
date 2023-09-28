"use client";

import { useState } from "react";

const Placeholder = () => (
  <svg
    className="bd-placeholder-img"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    preserveAspectRatio="xMidYMid slice"
    focusable="false"
  >
    <rect width="100%" height="100%" fill="#777"></rect>
  </svg>
);

const Carousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative pt-6 mb-40">
      <div className="overflow-hidden">
        <div
          className="w-full flex transition-transform duration-300"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-full flex justify-between">
        <button
          onClick={prevSlide}
          className="p-8 text-4xl text-gray-600 hover:text-gray-900 absolute -left-20"
        >
          &#8249;
        </button>
        <button
          onClick={nextSlide}
          className="p-8 text-4xl text-gray-600 hover:text-gray-900 absolute -right-20"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
