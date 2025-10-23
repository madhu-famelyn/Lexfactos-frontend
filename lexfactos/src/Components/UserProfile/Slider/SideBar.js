import React, { useState } from "react";
import {
  FaHome,
  FaUserCog,
  FaHeart,
  FaHeadset,
  FaBriefcase,
  FaClipboardList,
  FaClipboardCheck,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Saved Lawyers", icon: <FaHeart />, path: "/saved-lawyers" },
    { name: "Post a Job", icon: <FaBriefcase />, path: "/post-job" },
    { name: "View Posted Jobs", icon: <FaClipboardList />, path: "/view-jobs" },
    { name: "My Applied Jobs", icon: <FaClipboardCheck />, path: "/my-applied-jobs" },
    { name: "Account Settings", icon: <FaUserCog />, path: "/account-settings" },
    { name: "Support", icon: <FaHeadset />, path: "/support" },
  ];

  return (
    <>
      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo-text">Lexfactos</h2>
        </div>

        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="sidebar-item"
              onClick={() => {
                navigate(item.path);
                setIsOpen(false); // close sidebar on mobile click
              }}
            >
              <span className="icon">{item.icon}</span>
              <span className="text">{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
