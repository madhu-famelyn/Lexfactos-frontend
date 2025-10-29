import React from "react";
import "./Hero.css";

const HeroSection = () => {
  return (
    <div className="page">
      <div className="breadcrumb">
        <a href="javascript:void(0)">Legal Advice</a> <span>› Divorce</span>
      </div>

      <div className="hero">
        <h1>
          Find the legal support you need in
          <br />
          your divorce.
        </h1>

        <div className="hero-buttons">
          <a href="javascript:void(0)" className="variant-2">
            View Divorce lawyers near you
          </a>
          <a href="javascript:void(0)" className="variant-1">
            Ask a legal question – it's free!
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
