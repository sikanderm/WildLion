"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../styles/carousel.css";

const images = [
  { src: "/images/1.jpeg", alt: "Lion resting in the wild" },
  { src: "/images/2.jpeg", alt: "Lion pride at sunset" },
  { src: "/images/3.jpeg", alt: "Lion walking through grass" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="carousel"
      role="region"
      aria-label="Wild lion image carousel"
    >
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
            <p>Hear the Wild Speak</p>
            <div className="lin">
              <Link href="/lions">Read More</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
