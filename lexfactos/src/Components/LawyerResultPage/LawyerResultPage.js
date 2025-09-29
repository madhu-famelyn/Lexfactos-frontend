import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./LawyerResultsPage.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useAuth } from "../Context/UserContext";
import { fetchLawyersByCity, fetchLawyersByState } from "../Service/Service";

export default function LawyerResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { auth } = useAuth();

  const practiceArea = searchParams.get("practice_area") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";

  const [cityLawyers, setCityLawyers] = useState([]);
  const [stateLawyers, setStateLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const indianCities = [
    "Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Surat",
    "Indore", "Nagpur", "Bhopal", "Visakhapatnam", "Patna", "Vadodara",
    "Guwahati", "Coimbatore"
  ];

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoading(true);
        setError("");

        const cityRes = city
          ? await fetchLawyersByCity(practiceArea, city)
          : [];

        const stateRes = state
          ? await fetchLawyersByState(practiceArea, state)
          : [];

        const cityIds = cityRes.map((lawyer) => lawyer.id);
        const filteredState = stateRes.filter(
          (lawyer) => !cityIds.includes(lawyer.id)
        );

        setCityLawyers(cityRes);
        setStateLawyers(filteredState);
      } catch (err) {
        setError("No lawyers found or server error.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, [practiceArea, city, state]);

  if (loading) return <p className="loading">Loading lawyers...</p>;
  if (error) return <p className="error">{error}</p>;

  const renderLawyerCard = (lawyer, isBlurred = false) => {
    const mainAddress = lawyer.registration5?.[0];
    const yearsExp = lawyer.profile?.years_of_experience || "N/A";
    const practiceAreas = lawyer.registration3?.practice_area
      ? lawyer.registration3.practice_area.split(",")
      : [];

    return (
      <div key={lawyer.id} className={`lawyer-card ${isBlurred ? "blurred" : ""}`}>
        {/* Left Photo */}
        <div className="lawyer-photo">
          <img src={lawyer.photo} alt={lawyer.full_name} />
        </div>

        {/* Middle Content */}
        <div className="lawyer-content">
          <div className="lawyer-header">
            <div>
              <h3 className="lawyer-name">{lawyer.full_name}</h3>
              <p className="lawyer-title">{lawyer.profile?.title}</p>
              <p className="lawyer-location">
                <FaMapMarkerAlt style={{ marginRight: "5px", color: "#000" }} />
                {mainAddress?.city}, {mainAddress?.state} • {yearsExp} years
                experience
              </p>
            </div>
          </div>

          {lawyer.rating && (
            <div className="lawyer-rating">
              ⭐ {lawyer.rating}{" "}
              <span className="reviews">({lawyer.reviews} reviews)</span>
            </div>
          )}

          <p className="prac">Practice areas</p>
          <div className="practice-tags">
            {practiceAreas.slice(0, 3).map((area, idx) => (
              <span key={idx} className="practice-tag">
                {area}
              </span>
            ))}
          </div>

          {lawyer.profile?.bio && (
            <p className="lawyer-bio">{lawyer.profile.bio}</p>
          )}
        </div>

        {/* Right Actions */}
        <div className="lawyer-actions-right">
          <button className="call-btn">
            Call for a consultation
            {lawyer.phone_number && (
              <div className="phone">{lawyer.phone_number}</div>
            )}
          </button>
          <button className="book-btn">Book appointment</button>
          <button
            className="profile-btn"
            onClick={() => navigate(`/lawyer/${lawyer.id}`)}
          >
            View Profile
          </button>
          {lawyer.website_url && (
            <a
              href={lawyer.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="website-link"
            >
              {lawyer.website_url}
            </a>
          )}
        </div>

        {/* Overlay for blurred cards */}
        {isBlurred && (
          <div className="overlay">
            <p>Login to view full details</p>
            <button
              className="login-btn"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    );
  };

  const combinedLawyers = [...cityLawyers, ...stateLawyers];

  return (
    <div className="lawyer-results-page">
      <div className="lawyer-banner">
        <h1>India Brain Injury Lawyers</h1>
        <p>
          There are many brain injury lawyers in India. To help you make the
          best choice, we have curated information on education, work experience,
          and languages. Combine this with reviews to determine the best attorney
          for your needs.
        </p>
        <div className="city-tags">
          {(showMore ? indianCities : indianCities.slice(0, 10)).map((c, idx) => (
            <span key={idx} className="city-tag">{c}</span>
          ))}
        </div>
        <button
          className="see-more-btn"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less cities" : "See more cities"}
        </button>
      </div>

      {combinedLawyers.length > 0 ? (
        <div className="section">
          {combinedLawyers.map((lawyer, index) =>
            auth?.token || index < 3
              ? renderLawyerCard(lawyer, false) // normal cards
              : renderLawyerCard(lawyer, true) // blurred cards
          )}
        </div>
      ) : (
        <p>No lawyers found.</p>
      )}
    </div>
  );
}
