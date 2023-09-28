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
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 18C3.75 10.1299 10.1299 3.75 18 3.75C25.8701 3.75 32.25 10.1299 32.25 18C32.25 25.8701 25.8701 32.25 18 32.25C10.1299 32.25 3.75 25.8701 3.75 18ZM18 2.25C9.30152 2.25 2.25 9.30152 2.25 18C2.25 26.6985 9.30152 33.75 18 33.75C26.6985 33.75 33.75 26.6985 33.75 18C33.75 9.30152 26.6985 2.25 18 2.25ZM15.5303 12.5303C15.8232 12.2374 15.8232 11.7626 15.5303 11.4697C15.2374 11.1768 14.7626 11.1768 14.4697 11.4697L11.4697 14.4697C11.2552 14.6842 11.191 15.0068 11.3071 15.287C11.4232 15.5673 11.6967 15.75 12 15.75H19.5C21.5711 15.75 23.25 17.4289 23.25 19.5C23.25 21.5711 21.5711 23.25 19.5 23.25H16.5C16.0858 23.25 15.75 23.5858 15.75 24C15.75 24.4142 16.0858 24.75 16.5 24.75H19.5C22.3995 24.75 24.75 22.3995 24.75 19.5C24.75 16.6005 22.3995 14.25 19.5 14.25H13.8107L15.5303 12.5303Z" fill="#9B9B9B"/>
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="p-8 text-4xl text-gray-600 hover:text-gray-900 absolute -right-20"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.125 18C4.125 10.337 10.337 4.125 18 4.125C25.663 4.125 31.875 10.337 31.875 18C31.875 25.663 25.663 31.875 18 31.875C10.337 31.875 4.125 25.663 4.125 18ZM18 1.875C9.09441 1.875 1.875 9.09441 1.875 18C1.875 26.9056 9.09441 34.125 18 34.125C26.9056 34.125 34.125 26.9056 34.125 18C34.125 9.09441 26.9056 1.875 18 1.875ZM21.7955 11.2045C21.3562 10.7652 20.6438 10.7652 20.2045 11.2045C19.7652 11.6438 19.7652 12.3562 20.2045 12.7955L21.284 13.875H16.5C13.3934 13.875 10.875 16.3934 10.875 19.5C10.875 22.6066 13.3934 25.125 16.5 25.125H19.5C20.1213 25.125 20.625 24.6213 20.625 24C20.625 23.3787 20.1213 22.875 19.5 22.875H16.5C14.636 22.875 13.125 21.364 13.125 19.5C13.125 17.636 14.636 16.125 16.5 16.125H24C24.455 16.125 24.8652 15.8509 25.0394 15.4305C25.2135 15.0101 25.1172 14.5263 24.7955 14.2045L21.7955 11.2045Z" fill="#9B9B9B"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
