import React from "react";
import "./TopCities.css";

const TopCities = () => {
  const cities = [
    "Atlanta", "Austin", "Baltimore", "Boston", "Brooklyn",
    "Buffalo", "Charlotte", "Chicago", "Cincinnati", "Cleveland",
    "Columbus", "Dallas", "Denver", "Detroit", "El Paso",
    "Fort Lauderdale", "Fort Worth", "Fresno", "Houston", "Indianapolis",
    "Jacksonville", "Kansas City", "Knoxville", "Las Vegas", "Los Angeles",
    "Memphis", "Miami", "Milwaukee", "Minneapolis", "Nashville",
    "New York", "Orlando", "Philadelphia", "Phoenix", "Pittsburgh",
    "Portland", "Raleigh", "Riverside", "Sacramento", "Saint Louis",
    "San Antonio", "San Diego", "San Francisco", "San Jose", "Seattle",
    "Spokane", "Tacoma", "Tampa", "Tucson", "Washington"
  ];

  return (
    <div className="top-cities-container">
      <h3>Find Divorce lawyers by top cities</h3>
      <div className="blue-underline"></div>
      <div className="cities-grid">
        {cities.map((city, index) => (
          <a key={index} href="#">{city}</a>
        ))}
      </div>
    </div>
  );
};

export default TopCities;
