import React from "react";
import Sidebar from "../AdminSidebar/AdminSidebar";

const AdminAppointments = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <h1>Welcome to Admin AdminAppointments</h1>
        <p>This is your AdminAppointments content area.</p>
        {/* Your dashboard components go here */}
      </main>
    </div>
  );
};

export default AdminAppointments;

