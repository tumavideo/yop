"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./ScrollToTop.css";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div
      className={`scroll-to-top ${isVisible ? "active" : ""}`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTopButton;
