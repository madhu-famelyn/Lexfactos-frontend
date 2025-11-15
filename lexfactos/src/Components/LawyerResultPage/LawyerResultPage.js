import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LawyerResultsPage.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

import { useAuth } from "../Context/UserContext";
import axios from "axios";

const API_BASE_URL = "https://lexfactos-backend.fly.dev";

// Cache expiry: 30 minutes
const CACHE_EXPIRY_MS = 30 * 60 * 1000;

/* ---------------------------------------------
    CACHE HELPERS
----------------------------------------------*/
function getCachedData(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    const { timestamp, data } = JSON.parse(item);

    // Check expiration
    if (Date.now() - timestamp > CACHE_EXPIRY_MS) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function setCachedData(key, data) {
  localStorage.setItem(
    key,
    JSON.stringify({
      timestamp: Date.now(),
      data,
    })
  );
}

/* ---------------------------------------------
    API CALL
----------------------------------------------*/
async function fetchLawyers(practiceArea, location, page, pageSize) {
  const safePractice = practiceArea || "";

  try {
    const res = await axios.get(`${API_BASE_URL}/get-all-details/lawyers/search`, {
      params: {
        practice_area: safePractice,
        location,
        page,
        page_size: pageSize,
      },
    });

    return res.data;
  } catch (err) {
    console.error("AXIOS REQUEST FAILED:", err);
    throw err;
  }
}

/* ---------------------------------------------
    MAIN COMPONENT
----------------------------------------------*/
export default function LawyerResultsPage() {
  const url = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(url.search);
  const { auth } = useAuth();

  const practiceArea = searchParams.get("practice_area") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";

  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [totalPages, setTotalPages] = useState(1);

  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const indianCities = [
    "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Surat",
    "Indore", "Nagpur", "Bhopal", "Visakhapatnam", "Patna", "Vadodara",
    "Guwahati", "Coimbatore"
  ];

  const [showMore, setShowMore] = useState(false);

  /* ---------------------------------------------
      CLICK CITY → NAVIGATE
  ----------------------------------------------*/
  const handleCityClick = (clickedCity) => {
    navigate(
      `/lawyers/search?state=${encodeURIComponent(state)}&city=${encodeURIComponent(clickedCity)}`
    );
  };

  /* ---------------------------------------------
      NEXT PAGE BLOCKING
  ----------------------------------------------*/
  const handleNextPage = () => {
    if (!auth?.token) {
      setShowLoginPopup(true);
      return;
    }
    setPage((p) => p + 1);
  };

  /* ---------------------------------------------
      LOAD DATA WITH CACHING
  ----------------------------------------------*/
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Create unique cache key
        const cacheKey = `lawyers_${practiceArea}_${city}_${state}_${page}`;

        // Try to get from cache
        const cached = getCachedData(cacheKey);

        if (cached) {
          setLawyers(cached.results || []);
          setTotalPages(cached.total_pages || 1);
          setLoading(false);
          return;
        }

        let response;

        if (city) {
          response = await fetchLawyers(practiceArea, city, page, pageSize);
        } else if (state) {
          response = await fetchLawyers(practiceArea, state, page, pageSize);
        }

        if (response?.results && Array.isArray(response.results)) {
          setLawyers(response.results);
          setTotalPages(response.total_pages || 1);

          // Save to cache
          setCachedData(cacheKey, response);
        } else {
          setLawyers([]);
        }
      } catch (err) {
        setError("No lawyers found or server error.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [practiceArea, city, state, page]);

  if (loading) return <p className="loading">Loading lawyers...</p>;
  if (error) return <p className="error">{error}</p>;

  /* ---------------------------------------------
      CARD COMPONENT
  ----------------------------------------------*/
  const renderLawyerCard = (lawyer, isBlurred = false) => {
    if (!lawyer) return null;

    const mainAddress = lawyer.registration5?.[0] || {};
    const yearsExp = lawyer.profile?.years_of_experience || "N/A";

    const practiceAreas = lawyer.registration3?.practice_area
      ? lawyer.registration3.practice_area.split(",")
      : [];

    return (
      <div key={lawyer.id} className={`lawyer-card ${isBlurred ? "blurred" : ""}`}>
        <div className="lawyer-photo">
          <img
            src={lawyer.photo || "/placeholder.jpg"}
            alt={lawyer.full_name || "Lawyer"}
          />
        </div>

        <div className="lawyer-content">
          <h3 className="lawyer-name">{lawyer.full_name || "Unknown Lawyer"}</h3>
          <p className="lawyer-location">
            <FaMapMarkerAlt style={{ marginRight: "5px" }} />
            {mainAddress.city || "City"}, {mainAddress.state || "State"} • {yearsExp} yrs exp
          </p>

          <p className="prac">Practice areas</p>

          <div className="practice-tags">
            {practiceAreas.slice(0, 3).map((area, idx) => (
              <span key={idx} className="practice-tag">{area}</span>
            ))}
          </div>

          {lawyer.profile?.bio && (
            <p className="lawyer-bio">{lawyer.profile.bio}</p>
          )}
        </div>

        <div className="lawyer-actions-right">
          <button
  className="call-btn"
  onClick={() => {
    if (lawyer.phone_number) {
      window.location.href = `tel:${lawyer.phone_number}`;
    }
  }}
>


{lawyer.phone_number && (
  <div className="phone">
    <FaPhone
      style={{
        fontSize: "12px",
        marginRight: "10px",
        marginTop: "5px",
      }}
    />
    <span>{lawyer.phone_number}</span>
  </div>
)}


</button>


          {/* <button className="book-btn">Book appointment</button> */}

          <button
            className="profile-btn"
            onClick={() => navigate(`/lawyer/${lawyer.id}`)}
          >
            View Profile
          </button>
        </div>

        {isBlurred && (
          <div className="overlay">
            <p>Login to view full details</p>
            <button className="login-btn" onClick={() => navigate("/sign-in")}>
              Login
            </button>
          </div>
        )}
      </div>
    );
  };

  /* ---------------------------------------------
      UI RENDER
  ----------------------------------------------*/
  return (
    <div className="lawyer-results-page">
      <h1>
        {practiceArea ? `${practiceArea} Lawyers` : "Lawyers"}{" "}
        {city && state ? `in ${city}, ${state}` : state ? `in ${state}` : ""}
      </h1>

      <div className="city-tags">
        {(showMore ? indianCities : indianCities.slice(0, 10)).map((c, idx) => (
          <span
            key={idx}
            className="city-tag"
            onClick={() => handleCityClick(c)}
          >
            {c}
          </span>
        ))}
      </div>

      <button className="see-more-btn" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show less" : "See more"}
      </button>

      <div className="section">
        {lawyers.length > 0 ? (
          lawyers.map((lawyer, index) =>
            auth?.token || index < 3
              ? renderLawyerCard(lawyer)
              : renderLawyerCard(lawyer, true)
          )
        ) : (
          <p>No lawyers found.</p>
        )}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>

      {/* ---------------- LOGIN POPUP ---------------- */}
      {showLoginPopup && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <h3>Please Login</h3>
            <p>You must login to continue viewing more lawyer results.</p>

            <button
              className="login-popup-btn"
              onClick={() => navigate("/sign-in")}
            >
              Login
            </button>

            <button
              className="login-popup-close"
              onClick={() => setShowLoginPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
