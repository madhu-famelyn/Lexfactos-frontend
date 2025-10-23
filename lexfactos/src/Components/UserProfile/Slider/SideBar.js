import React from "react";
import {
  FaHome,
  FaUserCog,
  FaHeart,
  FaHeadset,
  FaBriefcase,
  FaClipboardList,
  FaClipboardCheck, // <-- added icon
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Saved Lawyers", icon: <FaHeart />, path: "/saved-lawyers" },
    { name: "Post a Job", icon: <FaBriefcase />, path: "/post-job" },
    { name: "View Posted Jobs", icon: <FaClipboardList />, path: "/view-jobs" },
    { name: "My Applied Jobs", icon: <FaClipboardCheck />, path: "/my-applied-jobs" }, // <-- new item
    { name: "Account Settings", icon: <FaUserCog />, path: "/account-settings" },
    { name: "Support", icon: <FaHeadset />, path: "/support" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo-text">Lexfactos</h2>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="sidebar-item"
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            <span className="text">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
