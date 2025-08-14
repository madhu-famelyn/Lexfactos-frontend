import React, { useState, useEffect } from "react";
import "./Hero.css";

const images = [
  require("../../Assets/gradient1.png"),
  require("../../Assets/gradient2.png"),
  require("../../Assets/gradient3.png"),
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section">
      {/* Slideshow images */}
      <div className="slideshow">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Text Content */}
      <div className="hero-content">
        <h1 className="hero-heading">About Lexfactos</h1>
        <p className="hero-description">
          We're revolutionizing how people access legal services by creating a
          seamless bridge between individuals and trusted legal professionals.
        </p>
      </div>
    </section>
  );
};

export default Hero;