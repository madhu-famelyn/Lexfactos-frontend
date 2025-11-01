// src/Pages/LandingPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const indiaStates = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati","Chittoor", "Kurnool", "Rajahmundry"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Durg"],
  "Goa": ["Panaji", "Margao", "Mapusa", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Davangere"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha", "Palakkad"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Kolhapur"],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal"],
  "Meghalaya": ["Shillong", "Tura", "Jowai"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Erode"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
  "Tripura": ["Agartala", "Dharmanagar", "Udaipur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida", "Prayagraj", "Ghaziabad"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Karol Bagh", "Saket"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "Ladakh": ["Leh", "Kargil"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  "Chandigarh": ["Chandigarh"],
  "Andaman and Nicobar Islands": ["Port Blair", "Havelock Island"],
  "Lakshadweep": ["Kavaratti", "Agatti"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
};

const uaeStates = {
  "Abu Dhabi": ["Abu Dhabi", "Al Ain", "Madinat Zayed", "Ghaf Hub"],
  "Dubai": ["Dubai City", "Jebel Ali", "Deira", "Bur Dubai", "Business Bay"],
  "Sharjah": ["Sharjah City", "Khor Fakkan", "Kalba", "Mleiha"],
  "Ajman": ["Ajman City", "Masfout", "Manama"],
  "Umm Al Quwain": ["UAQ City", "Falaj Al Mualla", "Dreamland"],
  "Ras Al Khaimah": ["RAK City", "Dibba Al-Hisn", "Al Jazirah Al Hamra"],
  "Fujairah": ["Fujairah City", "Dibba Al-Fujairah", "Khor Fakkan", "Masafi"],
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
          <option value="UAE">United Arab Emirates</option>
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
          {selectedCountry === "UAE" &&
            Object.keys(uaeStates).map((state, index) => (
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
          {selectedCountry === "India" &&
            selectedState &&
            indiaStates[selectedState].map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          {selectedCountry === "UAE" &&
            selectedState &&
            uaeStates[selectedState].map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>

        <button className="search-button" onClick={handleSearch}>
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
