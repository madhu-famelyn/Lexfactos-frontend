import React from "react";
import "./BrowseByStates.css";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",

];

const BrowseByStates = () => {
  return (
    <section className="browse-section">
      <h2 className="browse-title">Browse by States</h2>
      <div className="browse-grid">
        {states.map((state, index) => (
          <div className="browse-card" key={index}>
            {state}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByStates;
