import React, { useEffect, useState } from "react";
import "./AdminLawyer.css";
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
