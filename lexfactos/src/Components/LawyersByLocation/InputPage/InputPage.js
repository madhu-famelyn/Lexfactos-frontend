// src/Pages/InputPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InputPage.css";
import { FiSearch } from "react-icons/fi";

// Reusable Components
import PracticeAreaDropdown from "../../ReusableComponents/PracticeArea/PracticeArea";
import LocationSelector from "../../ReusableComponents/CustomDropDown/LocationSelector/Locations";

export default function InputPage() {
  const navigate = useNavigate();

  const [practiceArea, setPracticeArea] = useState("");
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
  });

  const handleLocationChange = (country, state, city) => {
    setLocation({ country, state, city });
  };

  const handleSearch = () => {
    const { country, state, city } = location;

    if (!practiceArea || !country || !state || !city) {
      alert("Please select Practice Area, Country, State and City.");
      return;
    }

    navigate(
      `/lawyers/search?practice_area=${encodeURIComponent(
        practiceArea
      )}&state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
    );
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Find a Lawyer You Can Trust</h1>
        <p>Search by expertise and location to connect with trusted professionals.</p>
      </div>

      <div className="search-bar-container">

  <div className="filters-row">
    <PracticeAreaDropdown
      value={practiceArea}
      onChange={(val) => setPracticeArea(val)}
    />


    <LocationSelector onLocationChange={handleLocationChange} />
  </div>

  
<button className="search-button" onClick={handleSearch}>
  <FiSearch className="search-icon" />
  <span>Search</span>
</button>

</div>

    </div>
  );
}
