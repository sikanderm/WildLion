"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import "../styles/carousel.css";

const images = [
  { src: "/images/1.jpeg", alt: "Lion resting in the wild" },
  { src: "/images/2.jpeg", alt: "Lion pride at sunset" },
  { src: "/images/3.jpeg", alt: "Lion walking through grass" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (direction: "next" | "prev") => {
    setCurrentIndex((prev) =>
      direction === "next"
        ? (prev + 1) % images.length
        : (prev - 1 + images.length) % images.length,
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="carousel"
      role="region"
      aria-label="Wild lion image carousel"
    >
      <button
        type="button"
        className="carousel-arrow carousel-arrow-left"
        onClick={() => goToSlide("prev")}
        aria-label="Previous slide"
      >
        <FaArrowRight style={{ transform: "rotate(180deg)" }} />
      </button>
      <button
        type="button"
        className="carousel-arrow carousel-arrow-right"
        onClick={() => goToSlide("next")}
        aria-label="Next slide"
      >
        <FaArrowRight />
      </button>
      <div className="carousel-indicators" aria-label="Carousel indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-indicator ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
      {images.map(({ src, alt }, index) => (
        <div
          key={src}
          className={`carousel-slide ${
            index === currentIndex ? "visible" : "hidden"
          }`}
          aria-hidden={index !== currentIndex}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: "cover" }}
            priority={index === 0} // preload first image for better UX
            unoptimized
          />
          <div className="overlay-text">
            <p>Discover the lives behind the roar</p>
            <div className="lin">
              <Link href="/lions">Explore the lions</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
