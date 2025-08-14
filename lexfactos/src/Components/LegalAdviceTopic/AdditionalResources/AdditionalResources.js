import React from "react";
import "./AdditionalResources.css";

const AdditionalResources = () => {
  const years = [
    { year: 2025, url: "#" },
    { year: 2024, url: "#" },
    { year: 2023, url: "#" },
    { year: 2022, url: "#" },
    { year: 2021, url: "#" },
    { year: 2020, url: "#" },
    { year: 2019, url: "#" }
  ];

  return (
    <div className="additional-resources-container">
      <h3>Additional Resources</h3>
      <div className="resources-box">
        <div className="blue-line"></div>
        <h4>Legal Advice by Years</h4>
        <div className="years-grid">
          {years
            .sort((a, b) => b.year - a.year) // latest first
            .map((item, index) => (
              <a key={index} href={item.url}>
                Questions on Divorce from {item.year}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdditionalResources;
