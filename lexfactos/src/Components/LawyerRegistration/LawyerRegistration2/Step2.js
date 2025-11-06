import React, { useState, useEffect } from "react";
import "./Step2.css";
import { useLocation, useNavigate } from "react-router-dom";
import { createLawyerProfile } from "../../Service/Service";
import { countriesData } from "../../ReusableComponents/CountryData/CountryData";
import ErrorPopup from "../../ReusableComponents/ErrorPopUP/ErrorPopUp";

const LawyerRegistrationStep2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const storedId = localStorage.getItem("lawyerId");
  const { lawyerId: idFromState } = location.state || {};
  const lawyerId = idFromState || storedId;

  useEffect(() => {
    if (idFromState) localStorage.setItem("lawyerId", idFromState);
  }, [idFromState]);

  const safeParse = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value !== null && value !== undefined ? value : fallback;
    } catch {
      return fallback;
    }
  };

  const storedData = safeParse("lawyerStep2Data", {
    bio: "",
    yearsOfExperience: "",
    barDetails: [
      { bar_license_number: "", bar_association_name: "", country: "", state: "", city: "" },
    ],
    educationList: [{ degree: "", college_name: "", graduation_year: "" }],
    languages: [],
  });

  const allLanguages = [
    "Hindi", "English", "Bengali", "Telugu", "Marathi", "Tamil", "Gujarati",
    "Urdu", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", "Maithili",
    "Arabic", "English (UAE)", "Urdu (UAE)", "Malayalam (UAE)",
    "Tamil (UAE)", "Tagalog", "Persian (Farsi)", "Pashto"
  ];

  const [bio, setBio] = useState(storedData.bio || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(storedData.yearsOfExperience || "");
  const [barDetails, setBarDetails] = useState(storedData.barDetails);
  const [educationList, setEducationList] = useState(storedData.educationList);
  const [languages, setLanguages] = useState(storedData.languages);

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

  const addBarDetail = () => {
    setBarDetails([
      ...barDetails,
      { bar_license_number: "", bar_association_name: "", country: "", state: "", city: "" },
    ]);
  };

  const handleBarDetailChange = (index, field, value) => {
    const updated = [...barDetails];
    updated[index][field] = value;

    if (field === "state") updated[index].city = "";
    setBarDetails(updated);
  };

  const toggleLanguage = (lang) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const validateStep2 = () => {
    if (!bio.trim()) return "Bio is required";
    if (!yearsOfExperience) return "Years of experience is required";

    for (let bar of barDetails) {
      if (!bar.bar_license_number || !bar.bar_association_name)
        return "Bar details cannot be empty";
      if (!bar.country) return "Select Country";
      if (!bar.state) return "Select State";
      if (!bar.city) return "Select City";
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateStep2();
    if (validationError) {
      setErrorMessage(validationError);
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
      const profileId = res.id || res.lawyer_profile_id;
      localStorage.setItem("lawyerProfileId", profileId);
      navigate("/step3", { state: { lawyerProfileId: profileId } });
    } catch (err) {
      setErrorMessage(err.detail || "Profile creation failed");
    }
  };

  const visibleLanguages = showAll ? allLanguages : allLanguages.slice(0, 10);

  return (
    <>
      {errorMessage && (
        <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
      )}

      <div className="lr-step2-container">
        <div className="lr-step2-card">
          <h2 className="lr-step2-title">Lawyer Registration</h2>
          <p className="lr-step2-subtitle">Step 2 of 6: Professional Summary</p>

          {/* ------- BIO FIELD ------- */}
          <label className="lr-step2-label">Short Bio *</label>
          <textarea
            className="lr-step2-textarea"
            placeholder="Tell about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>

          {/* ------- YEARS OF EXPERIENCE ------- */}
          <label className="lr-step2-label">Years of Experience *</label>
          <input
            type="number"
            className="lr-step2-input"
            placeholder="e.g. 5"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            min="0"
          />

          {/* ------- BAR DETAILS ------- */}
          <div className="lr-step2-section">
            <label className="lr-step2-label">Bar Details</label>
            {barDetails.map((bar, index) => (
              <div key={index} className="lr-step2-row">
                <input
                  type="text"
                  className="lr-step2-input"
                  placeholder="Bar License Number"
                  value={bar.bar_license_number}
                  onChange={(e) =>
                    handleBarDetailChange(index, "bar_license_number", e.target.value)
                  }
                />

                <input
                  type="text"
                  className="lr-step2-input"
                  placeholder="Bar Association Name"
                  value={bar.bar_association_name}
                  onChange={(e) =>
                    handleBarDetailChange(index, "bar_association_name", e.target.value)
                  }
                />

                {/* Country */}
                <select
                  className="lr-step2-input"
                  value={bar.country || ""}
                  onChange={(e) => handleBarDetailChange(index, "country", e.target.value)}
                >
                  <option value="">Select Country</option>
                  {Object.keys(countriesData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                {/* State */}
                <select
                  className="lr-step2-input"
                  value={bar.state || ""}
                  onChange={(e) => handleBarDetailChange(index, "state", e.target.value)}
                  disabled={!bar.country}
                >
                  <option value="">Select State</option>
                  {bar.country &&
                    Object.keys(countriesData[bar.country]).map((state, i) => (
                      <option key={i} value={state}>
                        {state}
                      </option>
                    ))}
                </select>

                {/* City */}
                <select
                  className="lr-step2-input"
                  value={bar.city || ""}
                  onChange={(e) => handleBarDetailChange(index, "city", e.target.value)}
                  disabled={!bar.state}
                >
                  <option value="">Select City</option>
                  {bar.country &&
                    bar.state &&
                    countriesData[bar.country][bar.state]?.map((city, i) => (
                      <option key={i} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>
            ))}
            <button className="lr-step2-add-btn" onClick={addBarDetail}>
              + Add Bar Detail
            </button>
          </div>

          {/* ------- LANGUAGES ------- */}
          <div className="lr-step-section">
            <label className="lr-step-label">Languages Spoken</label>
            <div className="lr-step-checkboxes">
              {visibleLanguages.map((lang) => (
                <label key={lang} className="lr-step-checkbox-label">
                  <input
                    type="checkbox"
                    className="lr-step-checkbox"
                    checked={languages.includes(lang)}
                    onChange={() => toggleLanguage(lang)}
                  />
                  {lang}
                </label>
              ))}
            </div>

            {allLanguages.length > 10 && (
              <button
                type="button"
                className="lr-showmore-btn"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show less" : "Show more"}
              </button>
            )}
          </div>
          <p/>

          {/* ------- EDUCATION ------- */}
          <div className="lr-step2-section">
            <label className="lr-step2-label">Education</label>
            {educationList.map((edu, index) => (
              <div key={index} className="lr-step2-row">
                <input
                  type="text"
                  className="lr-step2-input"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="lr-step2-input"
                  placeholder="College Name"
                  value={edu.college_name}
                  onChange={(e) =>
                    handleEducationChange(index, "college_name", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="lr-step2-input"
                  placeholder="e.g. 2020"
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

          {/* ------- FOOTER BUTTONS ------- */}
          <div className="lr-step2-footer">
            <button className="lr-step2-prev-btn" onClick={() => navigate(-1)}>
              Previous
            </button>
            <button className="lr-step2-next-btn" onClick={handleSubmit}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LawyerRegistrationStep2;
