import React from "react";
import { countriesData } from "../../ReusableComponents/CountryData/CountryData";
import "./Section2.css";

export default function SectionReg2({
  formData,
  setFormData,
  handleNestedChange,
  handleListChange,
  addListItem,
  removeListItem,
}) {
  // ✅ Always keep arrays safe
  const reg2 = {
    bar_details: Array.isArray(formData.reg2?.bar_details)
      ? formData.reg2.bar_details
      : [],

    education: Array.isArray(formData.reg2?.education)
      ? formData.reg2.education
      : [],

    languages_spoken: formData.reg2?.languages_spoken || "",
    bio: formData.reg2?.bio || "",
    years_of_experience: formData.reg2?.years_of_experience || "",
  };

  // ✅ All Languages
  const allLanguages = [
    "Hindi",
    "English",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Gujarati",
    "Urdu",
    "Kannada",
    "Odia",
    "Malayalam",
    "Punjabi",
    "Assamese",
    "Maithili",
    "Arabic",
    "English (UAE)",
    "Urdu (UAE)",
    "Malayalam (UAE)",
    "Tamil (UAE)",
    "Tagalog",
    "Persian (Farsi)",
    "Pashto",
  ];

  // Convert stored string → array safely
  const selectedLanguages = reg2.languages_spoken
    ? reg2.languages_spoken.split(",").map((l) => l.trim())
    : [];

  const addLanguage = (value) => {
    if (!value) return;
    const updated = [...new Set([...selectedLanguages, value])];
    handleNestedChange("reg2", "languages_spoken", updated.join(", "));
  };

  const removeLanguage = (lang) => {
    const updated = selectedLanguages.filter((l) => l !== lang);
    handleNestedChange("reg2", "languages_spoken", updated.join(", "));
  };

  return (
    <div className="lu-section">
      <h3 className="lu-section-title">About & Qualifications</h3>

      {/* Short Bio */}
      <div className="lu-field">
        <label>Short Bio *</label>
        <textarea
          value={reg2.bio}
          onChange={(e) => handleNestedChange("reg2", "bio", e.target.value)}
          placeholder="Write a brief professional introduction..."
        />
      </div>

      {/* Experience & Languages */}
      <div className="lu-grid">
        <div className="lu-field">
          <label>Years of Experience *</label>
          <input
            type="number"
            value={reg2.years_of_experience}
            onChange={(e) =>
              handleNestedChange("reg2", "years_of_experience", e.target.value)
            }
            placeholder="e.g: 5"
          />
        </div>

        {/* Languages Spoken */}
        <div className="lu-field">
          <label>Languages Spoken *</label>

          <div className="lang-select-box">
            <div className="selected-tags">
              {selectedLanguages.map((lang, i) => (
                <span key={i} className="tag">
                  {lang}
                  <span
                    className="remove-tag"
                    onClick={() => removeLanguage(lang)}
                  >
                    ×
                  </span>
                </span>
              ))}
            </div>

            <select
              onChange={(e) => {
                addLanguage(e.target.value);
                e.target.value = "";
              }}
              className="lang-dropdown"
            >
              <option value="">Select Language</option>
              {allLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* BAR DETAILS */}
      <h4 className="lu-sub-title">Bar Registration Details</h4>

      {reg2.bar_details.map((bar, index) => {
        const states = bar.country
          ? Object.keys(countriesData[bar.country] || {})
          : [];
        const cities =
          bar.country && bar.state
            ? countriesData[bar.country][bar.state] || []
            : [];

        return (
          <div key={index} className="lu-repeat-block">
            <span className="lu-badge">Bar Council #{index + 1}</span>

            <div className="lu-grid">
              {/* Country */}
              <select
                value={bar.country || ""}
                onChange={(e) =>
                  handleListChange(
                    "reg2",
                    "bar_details",
                    index,
                    "country",
                    e.target.value
                  )
                }
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
                value={bar.state || ""}
                onChange={(e) =>
                  handleListChange(
                    "reg2",
                    "bar_details",
                    index,
                    "state",
                    e.target.value
                  )
                }
                disabled={!bar.country}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              {/* City */}
              <select
                value={bar.city || ""}
                onChange={(e) =>
                  handleListChange(
                    "reg2",
                    "bar_details",
                    index,
                    "city",
                    e.target.value
                  )
                }
                disabled={!bar.state}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="lu-remove-btn"
              onClick={() => removeListItem("reg2", "bar_details", index)}
            >
              Remove
            </button>
          </div>
        );
      })}

      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg2", "bar_details", {
            country: "",
            state: "",
            city: "",
            bar_license_number: "",
            bar_association_name: "",
          })
        }
      >
        + Add Bar Registration
      </button>

      {/* EDUCATION */}
      <h4 className="lu-sub-title">Education</h4>

      {reg2.education.map((edu, index) => (
        <div key={index} className="lu-repeat-block">
          <span className="lu-badge">Education #{index + 1}</span>

          <input
            value={edu.degree || ""}
            onChange={(e) =>
              handleListChange("reg2", "education", index, "degree", e.target.value)
            }
            placeholder="Degree"
          />
          <input
            value={edu.college_name || ""}
            onChange={(e) =>
              handleListChange(
                "reg2",
                "education",
                index,
                "college_name",
                e.target.value
              )
            }
            placeholder="College"
          />
          <input
            type="number"
            value={edu.graduation_year || ""}
            onChange={(e) =>
              handleListChange(
                "reg2",
                "education",
                index,
                "graduation_year",
                e.target.value
              )
            }
            placeholder="Year"
          />

          <button
            type="button"
            className="lu-remove-btn"
            onClick={() => removeListItem("reg2", "education", index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg2", "education", {
            degree: "",
            college_name: "",
            graduation_year: "",
          })
        }
      >
        + Add Education
      </button>
    </div>
  );
}
