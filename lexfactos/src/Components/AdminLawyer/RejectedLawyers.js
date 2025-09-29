// src/components/RejectedLawyers.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminLawyer.css";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUniversity,
  FaStar,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";

const RejectedLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch rejected lawyers
  useEffect(() => {
    const fetchRejectedLawyers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/get-all-details/lawyers/rejected"
        );
        setLawyers(response.data); // API returns array of rejected lawyers
      } catch (error) {
        console.error("Error fetching rejected lawyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedLawyers();
  }, []);

  if (loading) {
    return <p>Loading rejected lawyers...</p>;
  }

  return (
    <div className="lawyer-list">
      {lawyers.length === 0 ? (
        <p>No rejected lawyers found.</p>
      ) : (
        lawyers.map((lawyer) => (
          <div key={lawyer.id} className="lawyer-card">
            {/* Lawyer Info */}
            <div className="lawyer-info">
              <div className="avatar">
                {lawyer.photo ? (
                  <img src={lawyer.photo} alt={lawyer.full_name} />
                ) : (
                  <div className="avatar-placeholder">👩‍⚖️</div>
                )}
              </div>
              <div>
                <h3>{lawyer.full_name}</h3>
                <p className="email">{lawyer.email}</p>
                <p className="location">
                  <FaMapMarkerAlt style={{ marginRight: "6px" }} />
                  {lawyer.registration5?.[0]?.city},{" "}
                  {lawyer.registration5?.[0]?.state}
                </p>
                <p className="experience">
                  <FaClock style={{ marginRight: "6px" }} />
                  {lawyer.profile?.years_of_experience} years experience
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="lawyer-meta">
              <p className="specialization">
                <FaUniversity style={{ marginRight: "6px" }} />
                {lawyer.registration3?.practice_area}
              </p>
              <span className="status rejected">Rejected</span>

              {lawyer.rejection_reason &&
                lawyer.rejection_reason.trim() !== "" && (
                  <p className="rejection-reason">
                    <FaTimesCircle
                      style={{ marginRight: "6px", color: "red" }}
                    />
                    Reason: {lawyer.rejection_reason}
                  </p>
                )}
            </div>

            {/* Actions */}
            <div className="actions">
              <button className="view">
                <FaEye style={{ marginRight: "6px" }} /> View Profile
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RejectedLawyers;
