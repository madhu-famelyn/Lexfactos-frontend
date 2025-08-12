import React from "react";
import "./Hero.css";
import { FaSearch } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="landing-container">
      
      {/* Trusted Badge */}
      <div className="trusted-badge">
        <span className="green-dot"></span>
        Trusted by 25,000+ users worldwide
      </div>

      {/* Title */}
      <h1 className="landing-title">
        <span className="title-dark">Legal expertise,</span>
        <br />
        <span className="title-gradient">simplified</span>
      </h1>

      {/* Subtitle */}
      <p className="landing-subtitle">
        Connect with verified legal professionals who understand your needs.
        Get expert advice, transparent pricing, and results you can trust.
      </p>

      {/* Search Box */}
      <div className="search-box">
        <div className="input-group">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="What legal help do you need?"
            className="search-input"
          />
        </div>

        <select className="location-dropdown">
          <option value="">Location</option>
          <option value="newyork">New York</option>
          <option value="california">California</option>
          <option value="texas">Texas</option>
        </select>

        <button className="search-button">Search</button>
      </div>

      {/* Bottom Stats */}
      <div className="bottom-stats">
        <div>
          <span className="green-dot"></span>
          5,000+ verified lawyers
        </div>
        <div>
          <span className="blue-dot"></span>
          Average response: 2 hours
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
