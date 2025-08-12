import React from "react";
import "./BrowseByCity.css"

const cities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Patna",
  "Vadodara",
  "Coimbatore"
];

const BrowseByCities = () => {
  return (
    <section className="browse-section">
      <h2 className="browse-title">Browse by Cities</h2>
      <div className="browse-grid">
        {cities.map((city, index) => (
          <div className="browse-card" key={index}>
            {city}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByCities;
