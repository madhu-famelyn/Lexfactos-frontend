import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select"; // ✅ import react-select
import { submitLawyerStep3 } from "../../Service/Service";
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

  // store as array for react-select
  const [practiceAreas, setPracticeAreas] = useState(
    storedData.practiceArea
      ? storedData.practiceArea.split(",").map((area) => ({ value: area, label: area }))
      : []
  );
  const [courtAdmittedTo, setCourtAdmittedTo] = useState(storedData.courtAdmittedTo);
  const [activeSince, setActiveSince] = useState(storedData.activeSince);
  const [experiences, setExperiences] = useState(storedData.experiences);
  const [description, setDescription] = useState(storedData.description);

  useEffect(() => {
    const step3Data = {
      practiceArea: practiceAreas.map((a) => a.value).join(","), // save as CSV
      courtAdmittedTo,
      activeSince,
      experiences,
      description,
    };
    localStorage.setItem("lawyerStep3Data", JSON.stringify(step3Data));
  }, [practiceAreas, courtAdmittedTo, activeSince, experiences, description]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company_name: "", role: "", duration: "", description: "" },
    ]);
  };

  const removeExperience = (index) => {
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(
      updated.length > 0
        ? updated
        : [{ company_name: "", role: "", duration: "", description: "" }]
    );
  };

  const handleSubmit = async () => {
    if (!lawyerId) {
      alert("Error: Lawyer ID missing. Please complete previous steps first.");
      return;
    }

    const payload = {
      lawyer_id: lawyerId,
      practice_area: practiceAreas.map((a) => a.value).join(","),
      court_admitted_to: courtAdmittedTo,
      active_since: parseInt(activeSince, 10) || 0,
      work_experience: experiences,
      description: description || "Experienced lawyer with expertise in multiple practice areas.", // default dummy string
    };

    try {
      const res = await submitLawyerStep3(payload);
      localStorage.setItem("lawyerProfileId", res.id);
      navigate("/step4", { state: { lawyer_id: lawyerId } });
    } catch (err) {
      alert("Failed to submit step 3. Please try again.");
    }
  };

  const allPracticeAreas = [
    "Administrative Law",
    "Admiralty & Maritime Law",
    "Alternative Dispute Resolution",
    "Animal Law",
    "Antitrust Law",
    "Appellate Law",
    "Arbitration & Mediation",
    "Aviation & Aerospace Law",
    "Banking & Finance Law",
    "Bankruptcy",
    "Civil Litigation",
    "Civil Rights",
    "Commercial Law",
    "Communications & Media Law",
    "Constitutional & Human Rights Law",
    "Construction Law",
    "Consumer Protection Law",
    "Contract Law",
    "Corporate & Commercial Law",
    "Criminal Defense",
    "Criminal Law",
    "Cybersecurity & Data Protection",
    "Elder Law",
    "Election & Political Law",
    "Employment Law",
    "Energy Law",
    "Entertainment & Sports Law",
    "Environmental Law",
    "Estate Planning",
    "Family Law",
    "Franchise Law",
    "Government Contracts",
    "Health Care Law",
    "Immigration",
    "Insurance Law",
    "Intellectual Property",
    "International Law",
    "Juvenile Law",
    "Labour & Employment Law",
    "Land Use & Zoning Law",
    "Legal Malpractice",
    "Medical Malpractice",
    "Military Law",
    "Nonprofit & Charities Law",
    "Patent Law",
    "Personal Injury",
    "Privacy & Data Security",
    "Product Liability",
    "Professional Responsibility",
    "Property & Real Estate Law",
    "Public Interest Law",
    "Securities Law",
    "Social Security Law",
    "Tax Law",
    "Technology Law",
    "Torts",
    "Trade Law",
    "Transportation Law",
    "Trusts & Estates",
    "Workers' Compensation",
  ].map((area) => ({ value: area, label: area }));

  return (
    <div className="lr-step3-container">
      <div className="lr-step3-card">
        <h2 className="lr-step3-title">Lawyer Registration</h2>
        <p className="lr-step3-subtitle">Step 3 of 6: Practice Details</p>

        {/* Progress bar */}
        <div className="lr-step3-progress">
          <div className="lr-step3-progress-bar" style={{ width: "33%" }}></div>
          <span className="lr-step3-progress-text">33% Complete</span>
        </div>

        {/* Practice Area (Searchable Multi-select) */}
        <div className="lr-step3-section">
          <label className="lr-step3-label">Practice Areas *</label>
          <Select
            isMulti
            options={allPracticeAreas}
            value={practiceAreas}
            onChange={setPracticeAreas}
            className="lr-step3-select"
            classNamePrefix="select"
            placeholder="Search and select practice areas..."
          />
        </div>

        {/* Courts Admitted */}
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

        {/* Description Field */}
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
              <button
                type="button"
                className="lr-step3-remove-btn"
                onClick={() => removeExperience(index)}
              >
                – Remove
              </button>
            </div>
          ))}
          <button className="lr-step3-add-btn" onClick={addExperience}>
            + Add Experience
          </button>
        </div>

        {/* Footer Navigation */}
        <div className="lr-step3-footer">
          <button className="lr-step3-prev-btn" onClick={() => navigate(-1)}>
            ‹ Previous
          </button>
          <button className="lr-step3-next-btn" onClick={handleSubmit}>
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistrationStep3;
