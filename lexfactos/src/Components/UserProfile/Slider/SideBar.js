import React, { useState } from "react";
import {
  FaHome,
  FaBriefcase,
  FaClipboardList,
  FaClipboardCheck,
  FaUserCog,
  FaHeadset,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Post a Job", icon: <FaBriefcase />, path: "/post-job" },
    { name: "View Posted Jobs", icon: <FaClipboardList />, path: "/view-jobs" },
    { name: "My Applied Jobs", icon: <FaClipboardCheck />, path: "/my-applied-jobs" },
    { name: "Account Settings", icon: <FaUserCog />, path: "/account-settings" },
    { name: "Support", icon: <FaHeadset />, path: "/support" },
  ];

  return (
    <>
      {/* Hamburger button for mobile */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h1>Lexfactos</h1>
        </div>

        {/* Menu */}
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon} <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
