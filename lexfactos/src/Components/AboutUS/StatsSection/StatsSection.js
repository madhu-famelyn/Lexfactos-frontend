import React from "react";
import "./StatsSection.css";

const StatsSection = () => {
  const stats = [
    {
      number: "10,000+",
      title: "Happy Clients",
      text: "Served nationwide"
    },
    {
      number: "500+",
      title: "Verified Lawyers",
      text: "Across all specialties"
    },
    {
      number: "50+",
      title: "Legal Specialties",
      text: "From family to corporate law"
    }
  ];

  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((stat, index) => (
          <div className="stat-card" key={index}>
            <h2>{stat.number}</h2>
            <h4>{stat.title}</h4>
            <p>{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
