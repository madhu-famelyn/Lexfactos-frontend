import React, { useState, useEffect } from "react";
import "./Step2.css";
import { useLocation, useNavigate } from "react-router-dom";
import { createLawyerProfile } from "../../Service/Service";

const LawyerRegistrationStep2 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Load lawyerId from location.state or localStorage
  const storedId = localStorage.getItem("lawyerId");
  const { lawyerId: idFromState } = location.state || {};
  const lawyerId = idFromState || storedId;

  // Persist lawyerId if obtained from location
  useEffect(() => {
    if (idFromState) localStorage.setItem("lawyerId", idFromState);
  }, [idFromState]);

  // Safe parse helper
  const safeParse = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value !== null && value !== undefined ? value : fallback;
    } catch {
      return fallback;
    }
  };

  // Load saved Step2 data with safe defaults
  const storedData = safeParse("lawyerStep2Data", {
    bio: "",
    yearsOfExperience: "",
    barDetails: [
      { bar_license_number: "", bar_association_name: "", state: "", city: "" },
    ],
    educationList: [{ degree: "", college_name: "", graduation_year: "" }],
    languages: [],
  });

  const [bio, setBio] = useState(storedData.bio || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(
    storedData.yearsOfExperience || ""
  );
  const [barDetails, setBarDetails] = useState(
    Array.isArray(storedData.barDetails) && storedData.barDetails.length
      ? storedData.barDetails
      : [
          {
            bar_license_number: "",
            bar_association_name: "",
            state: "",
            city: "",
          },
        ]
  );
  const [educationList, setEducationList] = useState(
    Array.isArray(storedData.educationList) && storedData.educationList.length
      ? storedData.educationList
      : [{ degree: "", college_name: "", graduation_year: "" }]
  );
  const [languages, setLanguages] = useState(
    Array.isArray(storedData.languages) ? storedData.languages : []
  );

  // Save Step2 data to localStorage whenever it changes
  useEffect(() => {
    const step2Data = {
      bio,
      yearsOfExperience,
      barDetails,
      educationList,
      languages,
    };
    localStorage.setItem("lawyerStep2Data", JSON.stringify(step2Data));
  }, [bio, yearsOfExperience, barDetails, educationList, languages]);

  // ---------- Education ----------
  const addEducation = () => {
    setEducationList([
      ...educationList,
      { degree: "", college_name: "", graduation_year: "" },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };

  // ---------- Bar Details ----------
  const addBarDetail = () => {
    setBarDetails([
      ...barDetails,
      { bar_license_number: "", bar_association_name: "", state: "", city: "" },
    ]);
  };

  const handleBarDetailChange = (index, field, value) => {
    const updated = [...barDetails];
    updated[index][field] = value;
    setBarDetails(updated);
  };

  // ---------- Languages ----------
  const toggleLanguage = (lang) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  // ---------- Submit ----------
  const handleSubmit = async () => {
    if (!lawyerId) {
      alert("Lawyer ID missing. Please complete Step 1 first.");
      return;
    }

    const profileData = {
      lawyer_id: lawyerId,
      bio,
      years_of_experience: parseInt(yearsOfExperience, 10) || 0,
      bar_details: barDetails,
      languages_spoken: languages.join(", "),
      education: educationList.map((edu) => ({
        degree: edu.degree,
        college_name: edu.college_name,
        graduation_year: parseInt(edu.graduation_year, 10) || 0,
      })),
    };

    try {
      const res = await createLawyerProfile(profileData);

      // Persist lawyerProfileId for Step3
      const profileId = res.id || res.lawyer_profile_id;
      if (profileId) {
        localStorage.setItem("lawyerProfileId", profileId);
        navigate("/step3", { state: { lawyerProfileId: profileId } });
      } else {
        alert("Profile created but ID missing in response");
      }
    } catch (err) {
      alert(err.detail || "Profile creation failed");
    }
  };

  return (
    <div className="lr-step2-container">
      <div className="lr-step2-card">
        <h2 className="lr-step2-title">Lawyer Registration</h2>
        <p className="lr-step2-subtitle">Step 2 of 6: Professional Summary</p>

        {/* Progress bar */}
        <div className="lr-step2-progress">
          <div className="lr-step2-progress-bar" style={{ width: "22%" }}></div>
          <span className="lr-step2-progress-text">22% Complete</span>
        </div>

        {/* Short Bio */}
        <label className="lr-step2-label">Short Bio / About Me *</label>
        <textarea
          className="lr-step2-textarea"
          placeholder="Tell potential clients about yourself..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        {/* Years of Experience */}
        <div className="lr-step2-row">
          <div className="lr-step2-input-box full-width">
            <label className="lr-step2-label">Years of Experience *</label>
            <input
              type="text"
              placeholder="e.g., 20+ years practicing law"
              className="lr-step2-input"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
            />
          </div>
        </div>

        {/* Bar Details */}
        <div className="lr-step2-section">
          <label className="lr-step2-label">Bar Details</label>
          {barDetails.map((bar, index) => (
            <div key={index} className="lr-step2-row">
              <input
                type="text"
                placeholder="Bar License Number"
                className="lr-step2-input"
                value={bar.bar_license_number}
                onChange={(e) =>
                  handleBarDetailChange(index, "bar_license_number", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Bar Association Name"
                className="lr-step2-input"
                value={bar.bar_association_name}
                onChange={(e) =>
                  handleBarDetailChange(index, "bar_association_name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="State"
                className="lr-step2-input"
                value={bar.state}
                onChange={(e) =>
                  handleBarDetailChange(index, "state", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="City"
                className="lr-step2-input"
                value={bar.city}
                onChange={(e) =>
                  handleBarDetailChange(index, "city", e.target.value)
                }
              />
            </div>
          ))}
          <button className="lr-step2-add-btn" onClick={addBarDetail}>
            + Add Bar Detail
          </button>
        </div>

        {/* Languages Spoken */}
        <div className="lr-step2-section">
          <label className="lr-step2-label">Languages Spoken</label>
          <div className="lr-step2-checkboxes">
            {[
              "English",
              "Spanish",
              "French",
              "German",
              "Italian",
              "Portuguese",
              "Mandarin",
              "Japanese",
              "Korean",
              "Arabic",
              "Hindi",
              "Russian",
            ].map((lang, index) => (
              <label key={index} className="lr-step2-checkbox-label">
                <input
                  type="checkbox"
                  className="lr-step2-checkbox"
                  checked={languages.includes(lang)}
                  onChange={() => toggleLanguage(lang)}
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="lr-step2-section">
          <label className="lr-step2-label">Education</label>
          {educationList.map((edu, index) => (
            <div key={index} className="lr-step2-row">
              <input
                type="text"
                placeholder="J.D., LL.M., etc."
                className="lr-step2-input"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Harvard Law School"
                className="lr-step2-input"
                value={edu.college_name}
                onChange={(e) =>
                  handleEducationChange(index, "college_name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="e.g., 2015"
                className="lr-step2-input"
                value={edu.graduation_year}
                onChange={(e) =>
                  handleEducationChange(index, "graduation_year", e.target.value)
                }
              />
            </div>
          ))}
          <button className="lr-step2-add-btn" onClick={addEducation}>
            + Add Education
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="lr-step2-footer">
          <button className="lr-step2-prev-btn">Previous</button>
          <button className="lr-step2-next-btn" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistrationStep2;
