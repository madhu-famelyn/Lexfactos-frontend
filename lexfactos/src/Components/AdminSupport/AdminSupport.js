import React from "react";
import Sidebar from "../AdminSidebar/AdminSidebar";

const AdminSupport = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Welcome to Admin support</h1>
        <p>This is your spport content area.</p>
        {/* Your dashboard components go here */}
      </main>
    </div>
  );
};

export default AdminSupport;

