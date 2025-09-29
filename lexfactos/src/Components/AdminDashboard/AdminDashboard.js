import React from "react";
import Sidebar from "../AdminSidebar/AdminSidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>This is your dashboard content area.</p>
        {/* Your dashboard components go here */}
      </main>
    </div>
  );
};

export default AdminDashboard;

