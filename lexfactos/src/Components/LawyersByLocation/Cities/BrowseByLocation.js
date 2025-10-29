import React from "react";
import "./BrowseByLocation.css";

const cities = [
  "Hyderabad",
  "Bangalore",
  "Delhi",
  "Mumbai",
  "Chennai",
  "Pune",
  "Kolkata",
  "Jaipur",
  "Ahmedabad",
  "Lucknow",
  "Kochi",
  "Indore",
];

export default function BrowseByLocation() {
  return (
    <div className="browse-location-container">
      <h2 className="browse-title">Browse by Location</h2>
      <div className="cities-grid">
        {cities.map((city, index) => (
          <button key={index} className="city-button">
            {city}
          </button>
        ))}
      </div>
      <div className="view-more">
        <a href="javascript:void(0)" className="view-more-link">
          View More Cities →
        </a>
      </div>
    </div>
  );
}
