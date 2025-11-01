import React from "react";
import LawyerPannel from "../LaywerPannel/LawyerPannel";
import "./LawyerDashboard.css";

const LawyerDashboard = () => {
  return (
    <div className="dashboard-layout">
      <LawyerPannel />
      <main className="dashboard-content">
        <h1>Welcome to Lawyer Dashboard</h1>
        <p>This is your dashboard content area.</p>
      </main>
    </div>
  );
};

export default LawyerDashboard;

