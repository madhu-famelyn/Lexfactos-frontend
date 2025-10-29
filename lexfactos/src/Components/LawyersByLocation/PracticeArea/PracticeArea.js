import React from "react";
import "./PracticeArea.css";

export default function PracticeArea() {
  const areas = [
    "Criminal Law",
    "Family & Divorce",
    "Property Disputes",
    "Employment Law",
    "Civil Rights",
    "Corporate Law",
    "Cyber Law",
    "Consumer Law",
    "IP & Trademark",
    "Wills & Estates",
    "Tax Law",
    "Immigration Law",
  ];

  return (
    <div className="practice-area-section">
      <h2>Browse by Practice Area</h2>
      <div className="practice-buttons">
        {areas.map((area, index) => (
          <button key={index} className="practice-btn">
            {area}
          </button>
        ))}
      </div>
      <div className="view-all">
        <a href="/coming-soon" >
          View All Practice Areas <span className="arrow">→</span>
        </a>
      </div>
    </div>
  );
}
