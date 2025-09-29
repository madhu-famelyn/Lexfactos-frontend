import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLawyer.css";
import {
  fetchPendingLawyers,
  updateLawyerVerification,
} from "../Service/Service";

// React Icons
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

const PendingLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reject popup states
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Approve popup states
  const [confirmApprovePopup, setConfirmApprovePopup] = useState(false);
  const [approveSuccessPopup, setApproveSuccessPopup] = useState(false);

  const navigate = useNavigate();

useEffect(() => {
  const getLawyers = async () => {
    try {
      const data = await fetchPendingLawyers();

      // ✅ Only include lawyers where rejection_reason is exactly ""
      const filteredLawyers = data.filter(
        (lawyer) => lawyer.rejection_reason === ""
      );

      const formattedLawyers = filteredLawyers.map((lawyer) => ({
        id: lawyer.id,
        name: lawyer.full_name,
        email: lawyer.email,
        location: lawyer.registration5?.[0]?.city || "N/A",
        experience: `${lawyer.profile?.years_of_experience ?? "N/A"} years`,
        rating: "0",
        status: lawyer.is_verified ? "Verified" : "Pending",
        photo:
          lawyer.photo || "https://via.placeholder.com/48?text=👤", // fallback if no photo
      }));

      setLawyers(formattedLawyers);
    } catch (error) {
      console.error("Failed to fetch lawyers:", error);
      setLawyers([]);
    } finally {
      setLoading(false);
    }
  };

  getLawyers();
}, []);


  const handleViewProfile = (lawyerId) => {
    navigate(`/lawyer/${lawyerId}`);
  };

  const handleApproveClick = (lawyerId) => {
    setSelectedLawyerId(lawyerId);
    setConfirmApprovePopup(true);
  };

  const confirmApprove = async () => {
    try {
      await updateLawyerVerification(selectedLawyerId, true, "");
      setLawyers((prev) => prev.filter((lawyer) => lawyer.id !== selectedLawyerId));
      setConfirmApprovePopup(false);

      // show success popup
      setApproveSuccessPopup(true);
      setTimeout(() => {
        setApproveSuccessPopup(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to approve lawyer:", error);
    }
  };

  const handleRejectClick = (lawyerId) => {
    setSelectedLawyerId(lawyerId);
    setShowRejectPopup(true);
  };

  const handleRejectConfirm = async () => {
    if (!rejectionReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }
    try {
      await updateLawyerVerification(selectedLawyerId, false, rejectionReason);
      setLawyers((prev) =>
        prev.filter((lawyer) => lawyer.id !== selectedLawyerId)
      );
      setShowRejectPopup(false);
      setRejectionReason("");
      alert("Lawyer rejected successfully!");
    } catch (error) {
      console.error("Failed to reject lawyer:", error);
      alert("Error rejecting lawyer.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="alert-box">
        <span>
          <FaExclamationTriangle
            style={{ marginRight: "6px", color: "#e0a800" }}
          />
          Pending Approvals
        </span>
        <p>
          {lawyers.length} lawyers are waiting for approval. Review their
          profiles and documentation.
        </p>
      </div>

      <div className="lawyer-list">
        {lawyers.map((lawyer) => (
          <div key={lawyer.id} className="lawyer-card">
            {/* Left side - Info */}
            <div className="lawyer-info">
              <div className="avatar">
                <img src={lawyer.photo} alt={lawyer.name} />
              </div>
              <div>
                <h3>{lawyer.name}</h3>
                <p className="email">{lawyer.email}</p>
                <p className="location">
                  <FaMapMarkerAlt style={{ marginRight: "4px" }} />
                  {lawyer.location}
                </p>
                <p className="experience">
                  <FaClock style={{ marginRight: "4px" }} />
                  {lawyer.experience}
                </p>
              </div>
            </div>

            {/* Right side - Meta + Actions */}
            <div className="lawyer-right">
              <div className="lawyer-meta">
                <span className="status">{lawyer.status}</span>
              </div>

              <div className="actions">
                <button
                  className="approve"
                  onClick={() => handleApproveClick(lawyer.id)}
                >
                  <FaCheck style={{ marginRight: "4px" }} /> Approve
                </button>
                <button
                  className="reject"
                  onClick={() => handleRejectClick(lawyer.id)}
                >
                  <FaTimes style={{ marginRight: "4px" }} /> Reject
                </button>
                <button
                  className="view"
                  onClick={() => handleViewProfile(lawyer.id)}
                >
                  <FaEye style={{ marginRight: "4px" }} /> View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Approve Confirmation Popup */}
      {confirmApprovePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Are you sure you want to approve this lawyer?</p>
            <div className="popup-actions">
              <button onClick={confirmApprove} className="confirm">
                Yes
              </button>
              <button
                onClick={() => setConfirmApprovePopup(false)}
                className="cancel"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Approve Success Popup */}
      {approveSuccessPopup && (
        <div className="popup-overlay">
          <div className="popup success">
            <p>✅ Lawyer Approved!</p>
          </div>
        </div>
      )}

      {/* ✅ Reject Reason Popup */}
      {showRejectPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Reject Lawyer</h3>
            <textarea
              placeholder="Enter rejection reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="popup-actions">
              <button onClick={handleRejectConfirm} className="confirm">
                Submit
              </button>
              <button
                onClick={() => {
                  setShowRejectPopup(false);
                  setRejectionReason("");
                }}
                className="cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingLawyers;
