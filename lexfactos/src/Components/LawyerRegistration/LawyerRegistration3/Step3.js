import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { submitLawyerStep3 } from "../../Service/Service";

// ✅ IMPORT COMPONENTS
import ErrorPopup from "../../ReusableComponents/ErrorPopUP/ErrorPopUp";
import PracticeAreaDropdown from "../../ReusableComponents/PracticeArea/PracticeArea";

import "./Step3.css";

const LawyerRegistrationStep3 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const idFromState = location.state?.lawyer_id;
  const storedId = localStorage.getItem("lawyerId");
  const lawyerId = idFromState || storedId;

  useEffect(() => {
    if (idFromState) localStorage.setItem("lawyerId", idFromState);
  }, [idFromState]);

  const storedData = JSON.parse(localStorage.getItem("lawyerStep3Data")) || {
    practiceArea: "",
    courtAdmittedTo: "",
    activeSince: "",
    experiences: [{ company_name: "", role: "", duration: "", description: "" }],
    description: "",
  };

  const [practiceArea, setPracticeArea] = useState(storedData.practiceArea);
  const [courtAdmittedTo, setCourtAdmittedTo] = useState(storedData.courtAdmittedTo);
  const [activeSince, setActiveSince] = useState(storedData.activeSince);
  const [experiences, setExperiences] = useState(storedData.experiences);
  const [description, setDescription] = useState(storedData.description);

  const [loading, setLoading] = useState(false);
  const [popupError, setPopupError] = useState("");

  useEffect(() => {
    const step3Data = {
      practiceArea,
      courtAdmittedTo,
      activeSince,
      experiences,
      description,
    };
    localStorage.setItem("lawyerStep3Data", JSON.stringify(step3Data));
  }, [practiceArea, courtAdmittedTo, activeSince, experiences, description]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company_name: "", role: "", duration: "", description: "" },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated.length > 0 ? updated : [{ company_name: "", role: "", duration: "", description: "" }]);
  };

  // ✅ Validation using popup
  const validateForm = () => {
    if (!practiceArea.trim())
      return setPopupError("Please select a Practice Area.");

    if (!courtAdmittedTo.trim())
      return setPopupError("Court Admitted To is required.");

    if (!activeSince || activeSince < 1900 || activeSince > new Date().getFullYear())
      return setPopupError("Enter a valid year in Active Since.");

    if (!description.trim())
      return setPopupError("Professional Summary is required.");

    return true;
  };

  const handleSubmit = async () => {
    if (!lawyerId) {
      return setPopupError("Error: Lawyer ID missing. Complete previous steps first.");
    }

    if (!validateForm()) return;

    setLoading(true);

    const payload = {
      lawyer_id: lawyerId,
      practice_area: practiceArea, // ✅ single field from dropdown
      court_admitted_to: courtAdmittedTo,
      active_since: parseInt(activeSince, 10) || 0,
      work_experience: experiences,
      description:
        description || "Experienced lawyer with expertise in multiple practice areas.",
    };

    try {
      const res = await submitLawyerStep3(payload);
      localStorage.setItem("lawyerProfileId", res.id);
      navigate("/step4", { state: { lawyer_id: lawyerId } });
    } catch (err) {
      setPopupError("Failed to submit Step 3. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lr-step3-container">
      {popupError && <ErrorPopup message={popupError} onClose={() => setPopupError("")} />}

      <div className="lr-step3-card">
        <h2 className="lr-step3-title">Lawyer Registration</h2>
        <p className="lr-step3-subtitle">Step 3 of 6: Practice Details</p>

        {/* Progress bar */}
        <div className="lr-step3-progress">
          <div className="lr-step3-progress-bar" style={{ width: "33%" }}></div>
          <span className="lr-step3-progress-text">33% Complete</span>
        </div>

        {/* ✅ Practice Area using dropdown */}
        <div className="lr-step3-section">
          <label className="lr-step3-label">Practice Area *</label>
          <PracticeAreaDropdown
            value={practiceArea}
            onChange={setPracticeArea}
          />
        </div>

        {/* Court Admitted */}
        <div className="lr-step3-section">
          <label className="lr-step3-label">Court Admitted To *</label>
          <input
            type="text"
            className="lr-step3-input"
            placeholder="e.g., Supreme Court of California"
            value={courtAdmittedTo}
            onChange={(e) => setCourtAdmittedTo(e.target.value)}
          />
        </div>

        {/* Active Since */}
        <div className="lr-step3-row">
          <div className="lr-step3-input-box">
            <label className="lr-step3-label">Active Since *</label>
            <input
              type="number"
              placeholder="e.g., 2018"
              className="lr-step3-input"
              value={activeSince}
              onChange={(e) => setActiveSince(e.target.value)}
            />
          </div>
        </div>

        {/* Summary */}
        <div className="lr-step3-section">
          <label className="lr-step3-label">Professional Summary *</label>
          <textarea
            placeholder="Enter overall description about yourself"
            className="lr-step3-input lr-step3-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Work Experience */}
        <div className="lr-step3-section">
          <label className="lr-step3-label">Work Experience</label>
          {experiences.map((exp, index) => (
            <div key={index} className="lr-step3-exp-box">
              <input
                type="text"
                placeholder="Company / Firm Name"
                className="lr-step3-input"
                value={exp.company_name}
                onChange={(e) => {
                  const updated = [...experiences];
                  updated[index].company_name = e.target.value;
                  setExperiences(updated);
                }}
              />

              <input
                type="text"
                placeholder="Role"
                className="lr-step3-input"
                value={exp.role}
                onChange={(e) => {
                  const updated = [...experiences];
                  updated[index].role = e.target.value;
                  setExperiences(updated);
                }}
              />

              <input
                type="text"
                placeholder="Duration (e.g., 2018-2020)"
                className="lr-step3-input"
                value={exp.duration}
                onChange={(e) => {
                  const updated = [...experiences];
                  updated[index].duration = e.target.value;
                  setExperiences(updated);
                }}
              />

              <textarea
                placeholder="Description of responsibilities/achievements"
                className="lr-step3-input lr-step3-textarea"
                value={exp.description}
                onChange={(e) => {
                  const updated = [...experiences];
                  updated[index].description = e.target.value;
                  setExperiences(updated);
                }}
              />

              <button type="button" className="lr-step3-remove-btn" onClick={() => removeExperience(index)}>
                – Remove
              </button>
            </div>
          ))}
          <button className="lr-step3-add-btn" onClick={addExperience}>
            + Add Experience
          </button>
        </div>

        {/* Footer */}
        <div className="lr-step3-footer">
          <button className="lr-step3-prev-btn" onClick={() => navigate(-1)} disabled={loading}>
            ‹ Previous
          </button>

          <button className="lr-step3-next-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Next ›"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistrationStep3;
