import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LawyerResultsPage.css";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useAuth } from "../Context/UserContext";
import axios from "axios";

const API_BASE_URL = "https://api.lexfactos.com";
const CACHE_EXPIRY_MS = 30 * 60 * 1000;

/* ------------------ CACHE HELPERS ------------------ */
function getCachedData(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;
  try {
    const { timestamp, data } = JSON.parse(item);
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
  localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
}

/* ------------------ API CALL ------------------ */
async function fetchLawyers(params) {
  const res = await axios.get(`${API_BASE_URL}/get-all-details/lawyers/search`, {
    params,
  });
  return res.data;
}

/* ------------------ MAIN PAGE ------------------ */
export default function LawyerResultsPage() {
  const url = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const searchParams = new URLSearchParams(url.search);
  const initialPracticeArea = searchParams.get("practice_area") || "";
  const initialCity = searchParams.get("city") || "";

  /* STATE VARIABLES */
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [practiceArea, setPracticeArea] = useState(initialPracticeArea);
  const [location, setLocation] = useState(initialCity);
  const [searchName, setSearchName] = useState("");
  const [sort, setSort] = useState("");

  const [showMore, setShowMore] = useState(false);

  const indianCities = [
    "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Surat",
    "Indore", "Nagpur", "Bhopal", "Visakhapatnam", "Patna", "Vadodara",
    "Guwahati", "Coimbatore"
  ];

  /* ------------------ CITY CLICK ------------------ */
  const handleCityClick = async (city) => {
    setLocation(city);
    setPage(1);
    await loadLawyers(1, city);
  };

  /* ------------------ SEARCH SUBMIT ------------------ */
  const handleSearchSubmit = async () => {
    setPage(1);
    await loadLawyers(1, location);
  };

  /* ------------------ LOADING LAWYERS ------------------ */
  const loadLawyers = async (currentPage, selectedLocation) => {
    try {
      setLoading(true);
      setError("");

      const params = {
        practice_area: practiceArea,
        location: selectedLocation || location,
        search_name: searchName,
        sort: sort,
        page: currentPage,
        page_size: 10,
      };

      const cacheKey = JSON.stringify(params);
      const cached = getCachedData(cacheKey);

      if (cached) {
        setLawyers(cached.results || []);
        setTotalPages(cached.total_pages || 1);
        setLoading(false);
        return;
      }

      const res = await fetchLawyers(params);
      setLawyers(res.results || []);
      setTotalPages(res.total_pages || 1);

      setCachedData(cacheKey, res);
    } catch (err) {
      setError("No lawyers found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLawyers(page);
  }, [page]);

  /* ------------------ LAWYER CARD ------------------ */
  const renderLawyerCard = (lawyer) => {
    const addr = lawyer?.registration5?.[0]?.address?.[0] || {};
    const exp = lawyer?.profile?.years_of_experience || "N/A";
    const areas = lawyer?.registration3?.practice_area?.split(",") || [];

    return (
      <div key={lawyer.id} className="lawyer-card">
        <div className="lawyer-photo">
          <img src={lawyer.photo || "/placeholder.jpg"} alt={lawyer.full_name} />
        </div>

        <div className="lawyer-content">
          <h3 className="lawyer-name">{lawyer.full_name}</h3>

          <p className="lawyer-location">
            <FaMapMarkerAlt /> {addr.city || "City"}, {addr.state || "State"} • {exp} yrs exp
          </p>

          <p className="prac">Practice areas</p>
          <div className="practice-tags">
            {areas.slice(0, 3).map((a, i) => (
              <span key={i} className="practice-tag">{a}</span>
            ))}
          </div>
        </div>

        <div className="lawyer-actions-right">
          <button className="call-btn"><FaPhone /> <span>{lawyer.phone_number}</span></button>
          <button
            className="profile-btn"
            onClick={() => navigate(`/lawyer/${lawyer.id}`)}
          >
            View Profile
          </button>
        </div>
      </div>
    );
  };

  /* ------------------ SMART PAGINATION LOGIC ------------------ */
  const getPageNumbers = () => {
    let pages = [];

    // FIRST 3 PAGES
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(i);
    }

    // CURRENT PAGE ±1 (like 9,10,11)
    let startMid = Math.max(page - 1, 4);
    let endMid = Math.min(page + 1, totalPages - 3);

    if (startMid <= endMid) {
      pages.push("...");
      for (let i = startMid; i <= endMid; i++) {
        pages.push(i);
      }
    }

    // LAST 3 PAGES
    if (totalPages > 3) {
      pages.push("...");
      for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
        if (i > 0) pages.push(i);
      }
    }

    return pages;
  };

  /* ------------------ JSX UI ------------------ */
  return (
    <div className="lawyer-results-page">
      <h1>Find Lawyers</h1>

      {/* ------------------ CITY TAGS ------------------ */}
      <div className="city-tags">
        {(showMore ? indianCities : indianCities.slice(0, 10)).map((c, i) => (
          <span
            key={i}
            className="city-tag"
            onClick={() => handleCityClick(c)}
          >
            {c}
          </span>
        ))}
      </div>

      <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More Cities"}
      </button>

      {/* ------------------ MODERN SEARCH BAR ------------------ */}
      <div className="modern-search-bar">

        <div className="search-input-section">

          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Lawyer name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          <div className="divider"></div>

          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Practice area"
              value={practiceArea}
              onChange={(e) => setPracticeArea(e.target.value)}
            />
          </div>

        </div>

        <button className="search-btn" onClick={handleSearchSubmit}>
          Find Lawyers
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="section">
        {lawyers.length > 0
          ? lawyers.map(renderLawyerCard)
          : <p>No lawyers found.</p>}
      </div>

      {/* ------------------ SMART PAGINATION UI ------------------ */}
    <div className="lr-pagination">

  <button
    disabled={page === 1}
    className="lr-page-btn"
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  {getPageNumbers().map((num, index) =>
    num === "..." ? (
      <span key={index} className="lr-page-dots">...</span>
    ) : (
      <button
        key={index}
        className={`lr-page-number ${num === page ? "lr-active-page" : ""}`}
        onClick={() => setPage(num)}
      >
        {num}
      </button>
    )
  )}

  <button
    disabled={page >= totalPages}
    className="lr-page-btn"
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>

</div>

    </div>
  );
}
