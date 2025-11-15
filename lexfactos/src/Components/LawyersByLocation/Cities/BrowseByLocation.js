import React from "react";
import "./BrowseByLocation.css";
import { useNavigate, useLocation } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

  // extract state value from URL if available
  const params = new URLSearchParams(location.search);
  const state = params.get("state") || "";

  const handleCityClick = (clickedCity) => {
    navigate(
      `/lawyers/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(clickedCity)}`
    );
  };

  return (
    <div className="browse-location-container">
      <h2 className="browse-title">Browse by Location</h2>

      <div className="cities-grid">
        {cities.map((city, index) => (
          <button
            key={index}
            className="city-button"
            onClick={() => handleCityClick(city)}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="view-more">
        {/* <a href="/coming-soon" className="view-more-link">
          View More Cities →
        </a> */}
      </div>
    </div>
  );
}
