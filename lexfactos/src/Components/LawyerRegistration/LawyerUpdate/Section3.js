import React from "react";

export default function SectionReg3({
  formData,
  handleNestedChange,
  handleListChange,
  addListItem,
  removeListItem,
}) {
  // SAFETY FIX: ensure work_experience is ALWAYS an array
  const reg3 = {
    ...formData.reg3,
    work_experience: Array.isArray(formData.reg3?.work_experience)
      ? formData.reg3.work_experience
      : [
          {
            company_name: "",
            role: "",
            duration: "",
            description: "",
          },
        ],
  };

  return (
    <div className="lu-section">
      <h3 className="lu-section-title">Practice & Work Experience</h3>

      <div className="lu-grid">
        <div className="lu-field">
          <label>Primary Practice Area *</label>
          <input
            type="text"
            placeholder="e.g., Family Law, Criminal Law"
            defaultValue={reg3.practice_area}
            onChange={(e) =>
              handleNestedChange("reg3", "practice_area", e.target.value)
            }
          />
        </div>

        <div className="lu-field">
          <label>Court(s) Admitted To *</label>
          <input
            type="text"
            placeholder="e.g., Madras High Court, District Court"
            defaultValue={reg3.court_admitted_to}
            onChange={(e) =>
              handleNestedChange("reg3", "court_admitted_to", e.target.value)
            }
          />
        </div>

        <div className="lu-field">
          <label>Active Since (Year)</label>
          <input
            type="number"
            placeholder="e.g., 2016"
            defaultValue={reg3.active_since}
            onChange={(e) =>
              handleNestedChange("reg3", "active_since", e.target.value)
            }
          />
        </div>
      </div>

      {/* ===== WORK EXPERIENCE LIST ===== */}
      <h4 className="lu-sub-title">Work Experience</h4>

      {reg3.work_experience.map((work, index) => (
        <div key={index} className="lu-repeat-block">
          <div className="lu-grid">
            <div className="lu-field">
              <label>Company / Law Firm *</label>
              <input
                type="text"
                defaultValue={work.company_name}
                onChange={(e) =>
                  handleListChange(
                    "reg3",
                    "work_experience",
                    index,
                    "company_name",
                    e.target.value
                  )
                }
                placeholder="XYZ & Associates"
              />
            </div>

            <div className="lu-field">
              <label>Role *</label>
              <input
                type="text"
                defaultValue={work.role}
                onChange={(e) =>
                  handleListChange(
                    "reg3",
                    "work_experience",
                    index,
                    "role",
                    e.target.value
                  )
                }
                placeholder="Senior Advocate / Legal Intern"
              />
            </div>

            <div className="lu-field">
              <label>Duration *</label>
              <input
                type="text"
                defaultValue={work.duration}
                onChange={(e) =>
                  handleListChange(
                    "reg3",
                    "work_experience",
                    index,
                    "duration",
                    e.target.value
                  )
                }
                placeholder="e.g., 2018-2022"
              />
            </div>
          </div>

          <div className="lu-field">
            <label>Description / Key Responsibilities</label>
            <textarea
              placeholder="Brief description of work handled..."
              defaultValue={work.description}
              onChange={(e) =>
                handleListChange(
                  "reg3",
                  "work_experience",
                  index,
                  "description",
                  e.target.value
                )
              }
            />
          </div>

          <button
            type="button"
            className="lu-remove-btn"
            onClick={() =>
              removeListItem("reg3", "work_experience", index)
            }
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg3", "work_experience", {
            company_name: "",
            role: "",
            duration: "",
            description: "",
          })
        }
      >
        + Add Work Experience
      </button>
    </div>
  );
}
