import React, { useState } from "react";
import "./Header.css";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo">
          <Link to="/">Lexfactos</Link>
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <Link to="/about">About us</Link>
          <Link to="/support">Support</Link>
          <Link to="/lawyers-by-location">Lawyers by Location</Link>
        </nav>

        {/* Search + Auth + Mobile Hamburger */}
        <div className="header-actions">
          <FiSearch className="search-icon" />
          <Link className="sign-in" to="/sign-in">Sign in</Link>
          <button className="join-btn">Join as lawyer</button>

          {/* Mobile: Hamburger */}
          <div className="mobile-hamburger" onClick={() => setIsMenuOpen(true)}>
            <HiMenu size={24} />
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <HiX
            size={24}
            className="close-icon"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>
        <nav className="mobile-nav-links">
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About us</Link>
          <Link to="/support" onClick={() => setIsMenuOpen(false)}>Support</Link>
          <Link to="/lawyers-by-location" onClick={() => setIsMenuOpen(false)}>
            Lawyers by Location
          </Link>
          <Link className="sign-in" to="/sign-in" onClick={() => setIsMenuOpen(false)}>
            Sign in
          </Link>
          <button className="join-btn" onClick={() => setIsMenuOpen(false)}>
            Join as lawyer
          </button>
        </nav>
      </div>

      {/* Overlay when menu open */}
      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)} />}
    </>
  );
};

export default Header;
