import React, { useState } from "react";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./LawyerPannel.css";

const LawyerPannel = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    // 🟢 Add your logout logic here (e.g., clear token, redirect to login)
    console.log("User signed out");
  };

  return (
    <>
      {/* Hamburger for Mobile */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h1>LexFactos</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link
                to="/lawyer-dashboard"
                className={
                  location.pathname === "/lawyer-dashboard" ? "active" : ""
                }
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/lawyer-profile"
                className={
                  location.pathname === "/lawyer-profile" ? "active" : ""
                }
                onClick={() => setIsOpen(false)}
              >
                <User size={18} /> My Profile
              </Link>
            </li>

            <li>
              <Link
                to="/lawyer-appointments"
                className={
                  location.pathname === "/lawyer-appointments" ? "active" : ""
                }
                onClick={() => setIsOpen(false)}
              >
                <CalendarDays size={18} /> Appointments
              </Link>
            </li>

            <li>
              <Link
                to="/lawyer-reviews"
                className={
                  location.pathname === "/lawyer-reviews" ? "active" : ""
                }
                onClick={() => setIsOpen(false)}
              >
                <Star size={18} /> Client Reviews
              </Link>
            </li>

            <li>
              <Link
                to="/lawyer-account-settings"
                className={
                  location.pathname === "/lawyer-account-settings" ? "active" : ""
                }
                onClick={() => setIsOpen(false)}
              >
                <Settings size={18} /> Account Settings
              </Link>
            </li>

            <li>
              <Link
                to="/lawyer-support"
                className={
                  location.pathname === "/lawyer-support" ? "active" : ""
                }
                onClick={() => setIsOpen(false)}
              >
                <HelpCircle size={18} /> Help & Support
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button onClick={handleSignOut}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default LawyerPannel;
