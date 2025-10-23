import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

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
          <h1>Lexfactos</h1>
          <p>Admin Panel</p>
        </div>

        <nav>
          <ul>
            <li>
              <Link
                to="/admin-dashboard"
                className={location.pathname === "/admin-dashboard" ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin-lawyers"
                className={location.pathname === "/admin-lawyers" ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                <Users size={18} /> Lawyer Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin-appointments"
                className={location.pathname === "/admin-appointments" ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                <CalendarDays size={18} /> Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/admin-support"
                className={location.pathname === "/admin-support" ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                <HelpCircle size={18} /> Support & Help
              </Link>
            </li>
            <li>
              <Link
                to="/job-post"
                className={location.pathname === "/job-post" ? "active" : ""}
                onClick={() => setIsOpen(false)}
              >
                <HelpCircle size={18} /> Job Post
              </Link>
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <Link to="/settings" onClick={() => setIsOpen(false)}>
            <Settings size={18} /> Settings
          </Link>
          <button>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
