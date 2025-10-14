import React, { useState, useCallback } from "react";
import "./Header.css";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const openMenu = useCallback(() => setIsMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleJoinClick = useCallback(() => {
    closeMenu(); // close mobile menu if open
    navigate("/sign-in-lawyer"); // redirect to lawyer sign-in
  }, [closeMenu, navigate]);

  return (
    <>
      {/* Top Header */}
      <header className="header">
        {/* Left side: Logo + Navigation */}
        <div className="header-left">
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              Lexfactos
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/about">About us</Link>
            <Link to="/support">Support</Link>
            <Link to="/lawyers-by-location">Lawyers by Location</Link>
            <Link to="/browse-jobs">Browse Jobs</Link>  
            <Link to="/admin-lawyers">Admin</Link>
          </nav>
        </div>

        {/* Right side: Actions */}
        <div className="header-actions">
          <FiSearch className="search-icon" aria-label="Search" />
          <Link className="sign-in" to="/sign-in">
            Sign in
          </Link>
          <button className="join-btn" onClick={handleJoinClick}>
            Join as lawyer
          </button>

          {/* Mobile Hamburger Icon */}
          <button
            className="mobile-hamburger"
            onClick={openMenu}
            aria-label="Open menu"
          >
            <HiMenu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <button
            className="close-icon"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <HiX size={24} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          <Link to="/about" onClick={closeMenu}>
            About us
          </Link>
          <Link to="/support" onClick={closeMenu}>
            Support
          </Link>
          <Link to="/lawyers-by-location" onClick={closeMenu}>
            Lawyers by Location
          </Link>

          {/* Divider */}
          <hr className="mobile-divider" />

          {/* Auth buttons in mobile */}
          <Link className="mobile-sign-in" to="/sign-in" onClick={closeMenu}>
            Sign in
          </Link>
          <button className="mobile-join-btn" onClick={handleJoinClick}>
            Join as lawyer
          </button>
        </nav>
      </aside>

      {/* Overlay */}
      {isMenuOpen && <div className="overlay" onClick={closeMenu} />}
    </>
  );
};

export default Header;
