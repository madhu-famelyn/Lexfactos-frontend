import React from "react";
import "./PopularPracticeAreas.css";

const practiceAreas = [
  { name: "Family Law", percent: 28, color: "#2563EB" },
  { name: "Criminal", percent: 22, color: "#2563EB" },
  { name: "Property", percent: 18, color: "#2563EB" },
  { name: "Employment", percent: 15, color: "#3B82F6" },
  { name: "Corporate", percent: 10, color: "#60A5FA" },
  { name: "Others", percent: 7, color: "#93C5FD" },
];

export default function PopularPracticeAreas() {
  return (
    <div className="practice-areas-section">
      <h2 className="practice-title">Popular Practice Areas</h2>
      <p className="practice-subtitle">Most searched legal specialties</p>

      <div className="practice-grid">
        {practiceAreas.map((area, index) => (
          <div className="practice-card" key={index}>
            <div className="practice-card-header">
              <span className="practice-name">{area.name}</span>
              <span className="practice-percent">{area.percent}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${area.percent}%`,
                  backgroundColor: area.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
