import React, { useState } from "react";
import "./Hero.css";
// import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ✅ States + Cities
const indiaStates = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Chittoor", "Guntur", "Nellore", "Tirupati"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  "Delhi": ["New Delhi", "Dwarka", "Saket", "Rohini", "Karol Bagh"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
};

const LandingPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!selectedCountry || !selectedState || !selectedCity) {
      alert("Please select Country, State, and City before searching.");
      return;
    }
    navigate(
      `/lawyers/search?state=${encodeURIComponent(selectedState)}&city=${encodeURIComponent(selectedCity)}`
    );
  };

  return (
    <div className="landing-container">
      {/* Trusted Badge */}
      <div className="trusted-badge">
        <span className="green-dot"></span>
        Trusted by 25,000+ users worldwide
      </div>

      {/* Title */}
      <h1 className="landing-title">
        <span className="title-dark">Legal expertise,</span>
        <br />
        <span className="title-gradient">simplified</span>
      </h1>

      {/* Subtitle */}
      <p className="landing-subtitle">
        Connect with verified legal professionals who understand your needs.
        Get expert advice, transparent pricing, and results you can trust.
      </p>

      {/* Search Box */}
      <div className="search-box">
        {/* Country Dropdown */}
        <select
          className="location-dropdown"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setSelectedState("");
            setSelectedCity("");
          }}
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
        </select>

        {/* State Dropdown */}
        <select
          className="location-dropdown"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {selectedCountry === "India" &&
            Object.keys(indiaStates).map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
        </select>

        {/* City Dropdown */}
        <select
          className="location-dropdown"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {selectedState &&
            indiaStates[selectedState].map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>

        <button className="search-button" onClick={handleSearch}>
          {/* <FaSearch className="search-icon" /> */}
          Search
        </button>
      </div>

      {/* Bottom Stats */}
      <div className="bottom-stats">
        <div>
          <span className="green-dot"></span>
          5,000+ verified lawyers
        </div>
        <div>
          <span className="blue-dot"></span>
          Average response: 2 hours
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
