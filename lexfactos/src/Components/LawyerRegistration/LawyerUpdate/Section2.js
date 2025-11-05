import React from "react";

export default function SectionReg2({
  formData,
  handleNestedChange,
  handleListChange,
  addListItem,
  removeListItem,
}) {
  const reg2 = formData.reg2;

  return (
    <div className="lu-section">
      <h3 className="lu-section-title">About & Qualifications</h3>

      <div className="lu-field">
        <label>Short Bio *</label>
        <textarea
          value={reg2.bio || ""}
          onChange={(e) => handleNestedChange("reg2", "bio", e.target.value)}
          placeholder="Write a brief professional introduction..."
        />
      </div>

      <div className="lu-grid">
        <div className="lu-field">
          <label>Years of Experience *</label>
          <input
            type="number"
            value={reg2.years_of_experience || ""}
            onChange={(e) =>
              handleNestedChange("reg2", "years_of_experience", e.target.value)
            }
            placeholder="e.g., 5"
          />
        </div>

        <div className="lu-field">
          <label>Languages Spoken *</label>
          <input
            type="text"
            value={reg2.languages_spoken || ""}
            onChange={(e) =>
              handleNestedChange("reg2", "languages_spoken", e.target.value)
            }
            placeholder="e.g., English, Hindi, Tamil"
          />
        </div>
      </div>

      {/* ============ BAR DETAILS LIST ============ */}
      <h4 className="lu-sub-title">Bar Registration Details</h4>

      {reg2.bar_details.map((bar, index) => (
        <div key={index} className="lu-repeat-block">
          <div className="lu-grid">
            <div className="lu-field">
              <label>Country *</label>
              <input
                value={bar.country}
                onChange={(e) =>
                  handleListChange("reg2", "bar_details", index, "country", e.target.value)
                }
                placeholder="India"
              />
            </div>

            <div className="lu-field">
              <label>State *</label>
              <input
                value={bar.state}
                onChange={(e) =>
                  handleListChange("reg2", "bar_details", index, "state", e.target.value)
                }
                placeholder="Tamil Nadu"
              />
            </div>

            <div className="lu-field">
              <label>City *</label>
              <input
                value={bar.city}
                onChange={(e) =>
                  handleListChange("reg2", "bar_details", index, "city", e.target.value)
                }
                placeholder="Chennai"
              />
            </div>
          </div>

          <div className="lu-grid">
            <div className="lu-field">
              <label>Bar License Number *</label>
              <input
                value={bar.bar_license_number}
                onChange={(e) =>
                  handleListChange("reg2", "bar_details", index, "bar_license_number", e.target.value)
                }
                placeholder="TN123456"
              />
            </div>

            <div className="lu-field">
              <label>Bar Association Name *</label>
              <input
                value={bar.bar_association_name}
                onChange={(e) =>
                  handleListChange("reg2", "bar_details", index, "bar_association_name", e.target.value)
                }
                placeholder="Madras High Court Bar Association"
              />
            </div>
          </div>

          <button
            type="button"
            className="lu-remove-btn"
            onClick={() => removeListItem("reg2", "bar_details", index)}
          >
            Remove
          </button>
        </div>
      ))}

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

      {/* ============ EDUCATION LIST ============ */}
      <h4 className="lu-sub-title">Education</h4>

      {reg2.education.map((edu, index) => (
        <div key={index} className="lu-repeat-block">
          <div className="lu-grid">
            <div className="lu-field">
              <label>Degree *</label>
              <input
                value={edu.degree}
                onChange={(e) =>
                  handleListChange("reg2", "education", index, "degree", e.target.value)
                }
                placeholder="LLB / LLM / BA.LLB"
              />
            </div>

            <div className="lu-field">
              <label>College / University *</label>
              <input
                value={edu.college_name}
                onChange={(e) =>
                  handleListChange("reg2", "education", index, "college_name", e.target.value)
                }
                placeholder="XYZ Law University"
              />
            </div>

            <div className="lu-field">
              <label>Graduation Year *</label>
              <input
                type="number"
                value={edu.graduation_year}
                onChange={(e) =>
                  handleListChange("reg2", "education", index, "graduation_year", e.target.value)
                }
                placeholder="2020"
              />
            </div>
          </div>

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
