import React from "react";

export default function SectionReg6({
  formData,
  handleNestedChange,
  handleListChange,
  addListItem,
  removeListItem,
}) {
  const reg6 = formData.reg6;

  return (
    <div className="lu-section">
      <h3 className="lu-section-title">Certifications, Awards & Publications</h3>

      {/* Professional Associations */}
      <div className="lu-field">
        <label>Professional Associations</label>
        <textarea
          placeholder="List your memberships or associations..."
          value={reg6.professional_associations || ""}
          onChange={(e) =>
            handleNestedChange("reg6", "professional_associations", e.target.value)
          }
        />
      </div>

      {/* ============ CERTIFICATIONS ============ */}
      <h4 className="lu-subtitle">Certifications</h4>

      {reg6.certifications.map((cert, index) => (
        <div key={index} className="lu-repeat-block">
          <div className="lu-grid">

            <div className="lu-field">
              <label>Title *</label>
              <input
                type="text"
                placeholder="Certification Title"
                value={cert.title}
                onChange={(e) =>
                  handleListChange("reg6", "certifications", index, "title", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Issuer *</label>
              <input
                type="text"
                placeholder="Issuing Organization"
                value={cert.issuer}
                onChange={(e) =>
                  handleListChange("reg6", "certifications", index, "issuer", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Year *</label>
              <input
                type="number"
                placeholder="2023"
                value={cert.year}
                onChange={(e) =>
                  handleListChange("reg6", "certifications", index, "year", e.target.value)
                }
              />
            </div>
          </div>

          <button
            type="button"
            className="lu-remove-btn"
            onClick={() => removeListItem("reg6", "certifications", index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg6", "certifications", { title: "", issuer: "", year: "" })
        }
      >
        + Add Certification
      </button>

      {/* ============ AWARDS ============ */}
      <h4 className="lu-subtitle" style={{ marginTop: "1.2rem" }}>Awards</h4>

      {reg6.awards.map((aw, index) => (
        <div key={index} className="lu-repeat-block">
          <div className="lu-grid">

            <div className="lu-field">
              <label>Award Name *</label>
              <input
                type="text"
                placeholder="Award Name"
                value={aw.name}
                onChange={(e) =>
                  handleListChange("reg6", "awards", index, "name", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Organization *</label>
              <input
                type="text"
                placeholder="Awarded By"
                value={aw.organization}
                onChange={(e) =>
                  handleListChange("reg6", "awards", index, "organization", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Year *</label>
              <input
                type="number"
                placeholder="2022"
                value={aw.year}
                onChange={(e) =>
                  handleListChange("reg6", "awards", index, "year", e.target.value)
                }
              />
            </div>
          </div>

          <button
            type="button"
            className="lu-remove-btn"
            onClick={() => removeListItem("reg6", "awards", index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg6", "awards", { name: "", organization: "", year: "" })
        }
      >
        + Add Award
      </button>

      {/* ============ PUBLICATIONS ============ */}
      <h4 className="lu-subtitle" style={{ marginTop: "1.2rem" }}>Publications</h4>

      {reg6.publications.map((pub, index) => (
        <div key={index} className="lu-repeat-block">

          <div className="lu-grid">
            <div className="lu-field">
              <label>Title *</label>
              <input
                type="text"
                placeholder="Publication Title"
                value={pub.title}
                onChange={(e) =>
                  handleListChange("reg6", "publications", index, "title", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Year *</label>
              <input
                type="number"
                placeholder="2023"
                value={pub.year}
                onChange={(e) =>
                  handleListChange("reg6", "publications", index, "year", e.target.value)
                }
              />
            </div>

            <div className="lu-field">
              <label>Link</label>
              <input
                type="text"
                placeholder="URL link"
                value={pub.link}
                onChange={(e) =>
                  handleListChange("reg6", "publications", index, "link", e.target.value)
                }
              />
            </div>
          </div>

          <div className="lu-field">
            <label>Description</label>
            <textarea
              placeholder="Short summary of the publication..."
              value={pub.description}
              onChange={(e) =>
                handleListChange("reg6", "publications", index, "description", e.target.value)
              }
            />
          </div>

          <button
            type="button"
            className="lu-remove-btn"
            onClick={() => removeListItem("reg6", "publications", index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg6", "publications", {
            title: "",
            year: "",
            link: "",
            description: "",
          })
        }
      >
        + Add Publication
      </button>
    </div>
  );
}
