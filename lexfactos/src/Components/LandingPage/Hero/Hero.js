import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import LocationSelector from "../../ReusableComponents/CustomDropDown/LocationSelector/Locations";
import Loader from "../../ReusableComponents/Loader/Loader";

const LandingPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    if (!country || !state || !city) {
      alert("Please select Country, State, and City before searching.");
      return;
    }

    // ✅ Show loader
    setLoading(true);

    setTimeout(() => {
      navigate(
        `/lawyers/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
      );
      setLoading(false); // ✅ hide after navigation (optional)
    }, 1000);
  };

  return (
    <>
      {loading && <Loader />}  {/* ✅ Loader visible when loading is true */}

      <div className="landing-container">
        {/* Trusted Badge */}
        <div className="trusted-badge">
          <span className="green-dot"></span>
          Trusted by 25,000+ users worldwide
        </div>

        <h1 className="landing-title">
          <span className="title-dark">Legal expertise,</span>
          <br />
          <span className="title-gradient">simplified</span>
        </h1>

        <p className="landing-subtitle">
          Connect with verified legal professionals who understand your needs.
          Get expert advice, transparent pricing, and results you can trust.
        </p>

        <div className="search-box">
          <LocationSelector onLocationChange={handleLocationChange} />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

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
    </>
  );
};

export default LandingPage;
