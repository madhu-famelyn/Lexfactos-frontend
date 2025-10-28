import React, { useEffect, useState } from "react";
import "./RejectedLawyers.css";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUniversity,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";
import { getRejectedLawyers } from "../Service/Service";

const RejectedLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRejectedLawyers = async () => {
      try {
        const data = await getRejectedLawyers();
        setLawyers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRejectedLawyers();
  }, []);

  if (loading) {
    return <p className="rejected-loading-text">Loading rejected lawyers...</p>;
  }

  return (
    <div className="rejected-lawyer-list">
      {lawyers.length === 0 ? (
        <p className="no-rejected-lawyers-text">No rejected lawyers found.</p>
      ) : (
        lawyers.map((lawyer) => (
          <div key={lawyer.id} className="rejected-lawyer-card">
            {/* Lawyer Info */}
            <div className="rejected-lawyer-info">
              <div className="rejected-avatar">
                {lawyer.photo ? (
                  <img src={lawyer.photo} alt={lawyer.full_name} />
                ) : (
                  <div className="rejected-avatar-placeholder">👩‍⚖️</div>
                )}
              </div>

              <div>
                <h3 className="rejected-lawyer-name">{lawyer.full_name}</h3>
                <p className="rejected-lawyer-email">{lawyer.email}</p>

                <p className="rejected-location">
                  <FaMapMarkerAlt />
                  {lawyer.registration5?.[0]?.city},{" "}
                  {lawyer.registration5?.[0]?.state}
                </p>

                <p className="rejected-experience">
                  <FaClock />
                  {lawyer.profile?.years_of_experience} years experience
                </p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="rejected-lawyer-meta">
              <p className="rejected-specialization">
                <FaUniversity />
                {lawyer.registration3?.practice_area}
              </p>

              <span className="rejected-status-badge">Rejected</span>

              {lawyer.rejection_reason &&
                lawyer.rejection_reason.trim() !== "" && (
                  <p className="rejected-reason-text">
                    <FaTimesCircle />
                    Reason: {lawyer.rejection_reason}
                  </p>
                )}
            </div>

            {/* Actions */}
            <div className="rejected-actions">
              <button className="rejected-view-btn">
                <FaEye /> View Profile
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RejectedLawyers;
