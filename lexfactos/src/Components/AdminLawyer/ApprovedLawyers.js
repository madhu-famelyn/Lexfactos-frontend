import React, { useState, useEffect } from "react";
import "./ApprovedLawyers.css";
import {
  FaEye,
  FaTimes,
  FaUndo,
  FaMapMarkerAlt,
  FaClock,
  FaUniversity,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  fetchApprovedLawyers,
  updateLawyerVerification,
} from "../Service/Service";

const ApprovedLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showUnapprovePopup, setShowUnapprovePopup] = useState(false);
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadApproved = async () => {
      try {
        const res = await fetchApprovedLawyers();
        const formatted = res.map((lawyer) => ({
          id: lawyer.id,
          name: lawyer.full_name || "",
          email: lawyer.email || "",
          location:
            lawyer.registration5?.[0]?.city &&
            lawyer.registration5?.[0]?.state
              ? `${lawyer.registration5[0].city}, ${lawyer.registration5[0].state}`
              : "Not Provided",
          experience: lawyer.profile?.years_of_experience
            ? `${lawyer.profile.years_of_experience} years experience`
            : "N/A",
          specialization:
            lawyer.registration3?.practice_area || "Not Provided",

          // ✅ FIX: Photo is at root!
          photo: lawyer.photo
            ? lawyer.photo
            : "https://via.placeholder.com/70?text=👨‍⚖️",
        }));
        setLawyers(formatted);
      } catch (err) {
        console.error("Error fetching approved lawyers:", err);
        setLawyers([]);
      } finally {
        setLoading(false);
      }
    };

    loadApproved();
  }, []);

  const handleViewProfile = (id) => {
    navigate(`/lawyer/${id}`);
  };

  const handleRejectOpen = (id) => {
    setSelectedLawyerId(id);
    setShowRejectPopup(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectionReason.trim()) {
      alert("Enter rejection reason.");
      return;
    }
    try {
      await updateLawyerVerification(selectedLawyerId, false, rejectionReason);
      setLawyers((prev) => prev.filter((x) => x.id !== selectedLawyerId));
      setRejectionReason("");
      setShowRejectPopup(false);
      alert("Rejected successfully");
    } catch (err) {
      console.error("Reject failed:", err);
      alert("Error");
    }
  };

  const handleUnapproveOpen = (id) => {
    setSelectedLawyerId(id);
    setShowUnapprovePopup(true);
  };

  const handleUnapproveConfirm = async () => {
    try {
      await updateLawyerVerification(selectedLawyerId, false, "");
      setLawyers((prev) => prev.filter((x) => x.id !== selectedLawyerId));
      setShowUnapprovePopup(false);
      alert("Unapproved successfully");
    } catch (err) {
      console.error("Unapprove failed:", err);
      alert("Error");
    }
  };

  if (loading) {
    return <p className="approved-loading">Loading approved lawyers...</p>;
  }

  return (
    <div className="approved-lawyer-list">
      {lawyers.length === 0 ? (
        <p className="approved-no-data">No approved lawyers found</p>
      ) : (
        lawyers.map((l) => (
          <div key={l.id} className="approved-lawyer-card">
            <div className="approved-lawyer-info">
              <img src={l.photo} alt={l.name} className="approved-avatar" />

              <div>
                <h3 className="approved-lawyer-name">{l.name}</h3>
                <p className="approved-lawyer-email">{l.email}</p>
                <p className="approved-lawyer-location">
                  <FaMapMarkerAlt /> {l.location}
                </p>
                <p className="approved-lawyer-experience">
                  <FaClock /> {l.experience}
                </p>
                <p className="approved-lawyer-specialization">
                  <FaUniversity /> {l.specialization}
                </p>
              </div>
            </div>

            <div className="approved-lawyer-actions">
              <button className="approved-btn-view" onClick={() => handleViewProfile(l.id)}>
                <FaEye /> View
              </button>
              <button className="approved-btn-reject" onClick={() => handleRejectOpen(l.id)}>
                <FaTimes /> Reject
              </button>
              <button className="approved-btn-unapprove" onClick={() => handleUnapproveOpen(l.id)}>
                <FaUndo /> Unapprove
              </button>
            </div>
          </div>
        ))
      )}

      {/* Reject Popup */}
      {showRejectPopup && (
        <div className="approved-popup-overlay">
          <div className="approved-popup">
            <h3>Reject Lawyer</h3>
            <textarea
              placeholder="Enter reason here..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <div className="approved-popup-actions">
              <button className="confirm" onClick={handleRejectConfirm}>
                Submit
              </button>
              <button
                className="cancel"
                onClick={() => {
                  setShowRejectPopup(false);
                  setRejectionReason("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unapprove Popup */}
      {showUnapprovePopup && (
        <div className="approved-popup-overlay">
          <div className="approved-popup">
            <h3>Unapprove Lawyer</h3>
            <p>Are you sure unapprove?</p>
            <div className="approved-popup-actions">
              <button className="confirm" onClick={handleUnapproveConfirm}>
                Yes
              </button>
              <button className="cancel" onClick={() => setShowUnapprovePopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedLawyers;
