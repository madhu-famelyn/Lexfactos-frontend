import React from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  HelpCircle,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
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
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin-lawyers"
              className={location.pathname === "/admin-lawyers" ? "active" : ""}
            >
              <Users size={18} /> Lawyer Management
            </Link>
          </li>
          <li>
            <Link
              to="/admin-appointments"
              className={location.pathname === "/admin-appointments" ? "active" : ""}
            >
              <CalendarDays size={18} /> Appointments
            </Link>
          </li>
          <li>
            <Link
              to="/admin-support"
              className={location.pathname === "/admin-support" ? "active" : ""}
            >
              <HelpCircle size={18} /> Support & Help
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <Link to="/settings">
          <Settings size={18} /> Settings
        </Link>
        <button>
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;