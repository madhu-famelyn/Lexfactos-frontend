import React from "react";

export default function SectionReg4({
  formData,
  handleListChange,
  addListItem,
  removeListItem,
}) {
  const reg4 = formData.reg4;

  return (
    <div className="lu-section">
      <h3 className="lu-section-title">Case Results</h3>

      {reg4.case_results.map((caseItem, index) => (
        <div key={index} className="lu-repeat-block">

          <div className="lu-grid">
            <div className="lu-field">
              <label>Case Title *</label>
              <input
                type="text"
                placeholder="e.g., State vs John Doe"
                value={caseItem.title}
                onChange={(e) =>
                  handleListChange("reg4", "case_results", index, "title", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Outcome *</label>
              <input
                type="text"
                placeholder="e.g., Acquittal, Settlement"
                value={caseItem.outcome}
                onChange={(e) =>
                  handleListChange("reg4", "case_results", index, "outcome", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Court *</label>
              <input
                type="text"
                placeholder="e.g., Supreme Court"
                value={caseItem.court}
                onChange={(e) =>
                  handleListChange("reg4", "case_results", index, "court", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Year *</label>
              <input
                type="number"
                placeholder="e.g., 2021"
                value={caseItem.year}
                onChange={(e) =>
                  handleListChange("reg4", "case_results", index, "year", e.target.value)
                }
              />
            </div>
          </div>

          <div className="lu-field">
            <label>Case Summary *</label>
            <textarea
              placeholder="Brief explanation of the case outcome..."
              value={caseItem.summary}
              onChange={(e) =>
                handleListChange("reg4", "case_results", index, "summary", e.target.value)
              }
            />
          </div>

          <button
            type="button"
            className="lu-remove-btn"
            onClick={() => removeListItem("reg4", "case_results", index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg4", "case_results", {
            title: "",
            outcome: "",
            summary: "",
            court: "",
            year: "",
          })
        }
      >
        + Add Case Result
      </button>
    </div>
  );
}
