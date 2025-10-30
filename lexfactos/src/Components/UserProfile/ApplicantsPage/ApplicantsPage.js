import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Slider/SideBar";
import "./ApplicantsPage.css";

const ApplicantsPage = () => {
  const location = useLocation();
  const { jobId } = location.state || {}; // get jobId passed from /jobs page
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [rate, setRate] = useState("");

  // Fetch all applicants for this job
  useEffect(() => {
    if (!jobId) return;

    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `https://lexfactos-backend.fly.dev/job-applications/job/${jobId}`
        );
        setApplicants(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (!jobId) return <p>Invalid job selected.</p>;
  if (loading) return <p>Loading applicants...</p>;

  const handleViewProfile = (applicant) => {
    setSelectedApplicant(applicant);
    setRate(applicant.rate || ""); // prefill current rating if available
  };

  const handleCloseModal = () => setSelectedApplicant(null);

  const handleRateChange = (e) => setRate(e.target.value);

  // ✅ Update applicant rating
  const handleUpdateRating = async () => {
    if (!selectedApplicant || !rate) {
      alert("Please select a rating before saving.");
      return;
    }

    try {
      const res = await axios.put(
        `https://lexfactos-backend.fly.dev/job-applications/${selectedApplicant.id}/status`,
        { rate } // matches JobApplicationUpdateStatus schema
      );

      // ✅ Update list instantly
      setApplicants((prev) =>
        prev.map((a) =>
          a.id === selectedApplicant.id ? { ...a, rate: res.data.rate } : a
        )
      );

      alert(`Applicant rated as "${rate}" successfully.`);
      setSelectedApplicant(null);
    } catch (error) {
      console.error("Error updating applicant rating:", error);
      alert("Failed to update rating. Please try again.");
    }
  };

  return (
    <div className="applicants-page">
      <Sidebar />
      <div className="applicants-content">
        <h2>Resumes</h2>

{/* ✅ Sorted Applicant List */}
        {applicants.length === 0 ? (
          <p>No applicants found.</p>
        ) : (
          <div className="applicant-list-rows">
            {applicants
              .slice()
              .sort((a, b) => {
                const order = {
                  "Not decided": 1,
                  "Good fit": 2,
                  "Maybe": 3,
                  "Not a fit": 4,
                };
                const aRate = order[a.rate] || 5;
                const bRate = order[b.rate] || 5;
                return aRate - bRate;
              })
              .map((applicant) => (
                <div key={applicant.id} className="applicant-card-row">
                  <div className="applicant-info">
                    <h3>{applicant.applicant_name}</h3>
                    <p><strong>Email:</strong> {applicant.email}</p>
                    <p><strong>Mobile:</strong> {applicant.mobile_number}</p>
                    <p><strong>Rating:</strong> {applicant.rate || "Not decided"}</p>
                    <p className="cover-letter-preview">
                      {applicant.cover_letter.length > 120
                        ? applicant.cover_letter.slice(0, 120) + "..."
                        : applicant.cover_letter}
                    </p>
                  </div>

                  <div className="applicant-actions-rect">
                    <a href={`mailto:${applicant.email}`} className="btn-contact">
                      Contact
                    </a>
                    <button
                      onClick={() => handleViewProfile(applicant)}
                      className="btn-view-profile"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

      </div>

      {/* ✅ Profile Modal */}
      {selectedApplicant && (
        <div className="modal-overlay">
          <div className="modal-content profile-modal">
            <h2>{selectedApplicant.applicant_name}</h2>
            <p><strong>Email:</strong> {selectedApplicant.email}</p>
            <p><strong>Mobile:</strong> {selectedApplicant.mobile_number}</p>
            <p><strong>Cover Letter:</strong></p>
            <p className="cover-letter-full">{selectedApplicant.cover_letter}</p>
            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={selectedApplicant.resume_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </p>
            <iframe
              src={selectedApplicant.resume_url}
              title="Resume"
              className="resume-frame"
            ></iframe>

            <div className="modal-actions">
              <a href={`mailto:${selectedApplicant.email}`} className="btn-contact">
                Contact via Email
              </a>

              {/* ✅ Rating Dropdown */}
              <select
                value={rate}
                onChange={handleRateChange}
                className="rate-dropdown"
              >
                <option value="">Rate Applicant</option>
                <option value="Good fit">Good fit</option>
                <option value="Maybe">Maybe</option>
                <option value="Not a fit">Not a fit</option>
                <option value="Not decided">Not decided</option>
              </select>

              <button onClick={handleUpdateRating} className="btn-save-rating">
                Save Rating
              </button>
              <button onClick={handleCloseModal} className="btn-close">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantsPage;
