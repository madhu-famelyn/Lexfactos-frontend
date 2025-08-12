import React from "react";
import "./StatsSection.css";

const statsData = [
  { value: "5,000+", label: "Verified Lawyers" },
  { value: "25,000+", label: "Happy Clients" },
  { value: "15,000+", label: "Cases Resolved" },
  { value: "98%", label: "Satisfaction Rate" },
];

const StatsSection = () => {
  return (
    <section className="stats-section">
      {statsData.map((stat, index) => (
        <div className="stat-item" key={index}>
          <div className="stat-value">{stat.value}</div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </section>
  );
};

export default StatsSection;
