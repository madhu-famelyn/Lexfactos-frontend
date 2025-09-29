// ApprovedLawyers.js
import React, { useState, useEffect } from "react";
import "./AdminLawyer.css";
import { fetchApprovedLawyers, updateLawyerVerification } from "../Service/Service";

// Icons
import { FaEye, FaTimes, FaUndo } from "react-icons/fa";

const ApprovedLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup states
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showUnapprovePopup, setShowUnapprovePopup] = useState(false);

  // Selected lawyer
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    const getApprovedLawyers = async () => {
      try {
        const data = await fetchApprovedLawyers();

        const formattedLawyers = data.map((lawyer) => ({
          id: lawyer.id,
          name: lawyer.full_name || "",
          email: lawyer.email || "",
          location: lawyer.registration5?.[0]?.city || "",
          experience: lawyer.profile?.years_of_experience
            ? `${lawyer.profile.years_of_experience} years`
            : "",
          specialization: lawyer.registration3?.practice_area || "",
          rating: "0",
          photo: lawyer.profile?.photo || "https://via.placeholder.com/48?text=👤", // ✅ fallback photo
        }));

        setLawyers(formattedLawyers);
      } catch (error) {
        console.error("Failed to fetch approved lawyers:", error);
        setLawyers([]);
      } finally {
        setLoading(false);
      }
    };

    getApprovedLawyers();
  }, []);

  // Reject flow
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
      setLawyers((prev) => prev.filter((lawyer) => lawyer.id !== selectedLawyerId));
      setShowRejectPopup(false);
      setRejectionReason("");
      alert("Lawyer rejected successfully!");
    } catch (error) {
      console.error("Failed to reject lawyer:", error);
      alert("Error rejecting lawyer.");
    }
  };

  // Unapprove flow
  const handleUnapproveClick = (lawyerId) => {
    setSelectedLawyerId(lawyerId);
    setShowUnapprovePopup(true);
  };

  const handleUnapproveConfirm = async () => {
    try {
      await updateLawyerVerification(selectedLawyerId, false, "");
      setLawyers((prev) => prev.filter((lawyer) => lawyer.id !== selectedLawyerId));
      setShowUnapprovePopup(false);
      alert("Lawyer unapproved successfully!");
    } catch (error) {
      console.error("Failed to unapprove lawyer:", error);
      alert("Error unapproving lawyer.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lawyer-list">
      {lawyers.length === 0 ? (
        <p>No approved lawyers found.</p>
      ) : (
        lawyers.map((lawyer) => (
          <div key={lawyer.id} className="lawyer-card">
            <div className="lawyer-info">
              <div className="avatar">
                <img src={lawyer.photo} alt={lawyer.name} />
              </div>

              <div>
                <h3>{lawyer.name || "Unnamed Lawyer"}</h3>
                <p className="email">{lawyer.email}</p>
                <p className="location">{lawyer.location && `📍 ${lawyer.location}`}</p>
                <p className="experience">
                  {lawyer.experience && `⏳ ${lawyer.experience}`}
                </p>
                <p className="specialization">
                  {lawyer.specialization && `⚖️ ${lawyer.specialization}`}
                </p>
              </div>
            </div>

            <div className="actions">
              <button className="view">
                <FaEye style={{ marginRight: "4px" }} /> View Profile
              </button>
              <button
                className="reject"
                onClick={() => handleRejectClick(lawyer.id)}
              >
                <FaTimes style={{ marginRight: "4px" }} /> Reject
              </button>
              <button
                className="unapprove"
                onClick={() => handleUnapproveClick(lawyer.id)}
              >
                <FaUndo style={{ marginRight: "4px" }} /> Unapprove
              </button>
            </div>
          </div>
        ))
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

      {/* ✅ Unapprove Confirmation Popup */}
      {showUnapprovePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Unapprove Lawyer</h3>
            <p>Are you sure you want to unapprove this lawyer?</p>
            <div className="popup-actions">
              <button onClick={handleUnapproveConfirm} className="confirm">
                Yes, Unapprove
              </button>
              <button
                onClick={() => setShowUnapprovePopup(false)}
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

export default ApprovedLawyers;
