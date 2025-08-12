import React from "react";
import "./Header.css";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  return (
    <header className="header">
      {/* Left: Logo + Nav */}
      <div className="left-section">
        <div className="logo">Lexfactos</div>
        <nav className="nav-links">
          <a href="#about">About us</a>
          <a href="#topics">Legal Topics and Q&amp;A</a>
          <a href="#lawyers">Lawyers by Location</a>
        </nav> 
      </div>

      {/* Right: Search + Sign In + Button */}
      <div className="header-actions">
        <FiSearch className="search-icon" />
        <span className="sign-in">Sign in</span>
        <button className="join-btn">Join as lawyer</button>
      </div>
    </header>
  );
};

export default Header;
