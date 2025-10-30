import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitStep6 } from "../../Service/Service";
import "./Step6.css";

const LawyerRegistrationStep6 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lawyer_id } = location.state || {};

  // ✅ Load stored data safely
  let storedStep6Data;
  try {
    storedStep6Data = JSON.parse(localStorage.getItem("step6FormData")) || {};
  } catch {
    storedStep6Data = {};
  }

  const [professionalAssociations, setProfessionalAssociations] = useState(
    storedStep6Data.professionalAssociations || ""
  );
  const [certifications, setCertifications] = useState(
    Array.isArray(storedStep6Data.certifications)
      ? storedStep6Data.certifications
      : [{ title: "", issuer: "", year: "" }]
  );
  const [awards, setAwards] = useState(
    Array.isArray(storedStep6Data.awards)
      ? storedStep6Data.awards
      : [{ name: "", organization: "", year: "" }]
  );
  const [publications, setPublications] = useState(
    Array.isArray(storedStep6Data.publications)
      ? storedStep6Data.publications
      : [{ title: "", year: "", link: "", description: "" }]
  );

  // ✅ Helper: Save instantly whenever something changes
  const saveToLocalStorage = (data) => {
    localStorage.setItem("step6FormData", JSON.stringify(data));
  };

  // ✅ Keep localStorage updated when state changes
  useEffect(() => {
    saveToLocalStorage({
      professionalAssociations,
      certifications,
      awards,
      publications,
    });
  }, [professionalAssociations, certifications, awards, publications]);

  // ✅ Update handlers (also save immediately)
  const handleChange = (index, field, value, type) => {
    let list;
    if (type === "certifications") {
      list = [...certifications];
      list[index][field] = value;
      setCertifications(list);
      saveToLocalStorage({
        professionalAssociations,
        certifications: list,
        awards,
        publications,
      });
    } else if (type === "awards") {
      list = [...awards];
      list[index][field] = value;
      setAwards(list);
      saveToLocalStorage({
        professionalAssociations,
        certifications,
        awards: list,
        publications,
      });
    } else {
      list = [...publications];
      list[index][field] = value;
      setPublications(list);
      saveToLocalStorage({
        professionalAssociations,
        certifications,
        awards,
        publications: list,
      });
    }
  };

  // ✅ Clean payload (convert years to int, remove empty objects)
  const buildPayload = () => {
    const cleanCertifications = certifications
      .filter((c) => c.title || c.issuer || c.year)
      .map((c) => ({
        ...c,
        year: c.year ? parseInt(c.year, 10) : 0,
      }));

    const cleanAwards = awards
      .filter((a) => a.name || a.organization || a.year)
      .map((a) => ({
        ...a,
        year: a.year ? parseInt(a.year, 10) : 0,
      }));

    const cleanPublications = publications
      .filter((p) => p.title || p.year || p.link || p.description)
      .map((p) => ({
        ...p,
        year: p.year ? parseInt(p.year, 10) : 0,
      }));

    return {
      lawyer_id,
      professional_associations: professionalAssociations,
      certifications: cleanCertifications,
      awards: cleanAwards,
      publications: cleanPublications,
    };
  };

  // Submit Step 6
  const handleSubmit = async () => {
    try {
      const payload = buildPayload();
      await submitStep6(payload);

      alert("Registration Step 6 completed!");
      localStorage.removeItem("step6FormData"); // clear saved data after submit
      navigate("/profile-review");
    } catch (err) {
      console.error(err);
      alert("Error saving step 6, please try again.");
    }
  };

  return (
    <div className="lr-step6-container">
      <div className="lr-step6-card">
        {/* Header */}
        <div className="lr-step6-header">
          <h2 className="lr-step6-title">Lawyer Registration</h2>
          <p className="lr-step6-subtitle">
            Step 6 of 6: Publications, Awards &amp; Associations
          </p>
          <div className="lr-step6-progress-bar">
            <div
              className="lr-step6-progress-fill"
              style={{ width: "90%" }}
            ></div>
          </div>
          <p className="lr-step6-progress-text">90% Complete</p>
        </div>

        {/* Professional Associations */}
        <div className="lr-step6-section">
          <h3 className="lr-step6-section-title">Professional Associations</h3>
          <textarea
            placeholder="Enter each association on a new line"
            className="lr-step6-textarea"
            rows={3}
            value={professionalAssociations}
            onChange={(e) => {
              setProfessionalAssociations(e.target.value);
              saveToLocalStorage({
                professionalAssociations: e.target.value,
                certifications,
                awards,
                publications,
              });
            }}
          ></textarea>
        </div>

        {/* Certifications */}
        <div className="lr-step6-section">
          <div className="lr-step6-section-header">
            <h3 className="lr-step6-section-title">Certifications</h3>
            <button
              className="lr-step6-add-btn"
              onClick={() => {
                const list = [
                  ...certifications,
                  { title: "", issuer: "", year: "" },
                ];
                setCertifications(list);
                saveToLocalStorage({
                  professionalAssociations,
                  certifications: list,
                  awards,
                  publications,
                });
              }}
            >
              + Add Certification
            </button>
          </div>

          {certifications.map((c, i) => (
            <div key={i} className="lr-step6-card-box">
              <div className="lr-step6-row">
                <input
                  type="text"
                  placeholder="Certificate Title"
                  className="lr-step6-input"
                  value={c.title}
                  onChange={(e) =>
                    handleChange(i, "title", e.target.value, "certifications")
                  }
                />
                <input
                  type="text"
                  placeholder="Issuer"
                  className="lr-step6-input"
                  value={c.issuer}
                  onChange={(e) =>
                    handleChange(i, "issuer", e.target.value, "certifications")
                  }
                />
                <input
                  type="number"
                  placeholder="Year"
                  className="lr-step6-input"
                  value={c.year}
                  onChange={(e) =>
                    handleChange(i, "year", e.target.value, "certifications")
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Awards */}
        <div className="lr-step6-section">
          <div className="lr-step6-section-header">
            <h3 className="lr-step6-section-title">Awards</h3>
            <button
              className="lr-step6-add-btn"
              onClick={() => {
                const list = [
                  ...awards,
                  { name: "", organization: "", year: "" },
                ];
                setAwards(list);
                saveToLocalStorage({
                  professionalAssociations,
                  certifications,
                  awards: list,
                  publications,
                });
              }}
            >
              + Add Award
            </button>
          </div>

          {awards.map((a, i) => (
            <div key={i} className="lr-step6-card-box">
              <div className="lr-step6-row">
                <input
                  type="text"
                  placeholder="Award Name"
                  className="lr-step6-input"
                  value={a.name}
                  onChange={(e) =>
                    handleChange(i, "name", e.target.value, "awards")
                  }
                />
                <input
                  type="text"
                  placeholder="Organization"
                  className="lr-step6-input"
                  value={a.organization}
                  onChange={(e) =>
                    handleChange(i, "organization", e.target.value, "awards")
                  }
                />
                <input
                  type="number"
                  placeholder="Year"
                  className="lr-step6-input"
                  value={a.year}
                  onChange={(e) =>
                    handleChange(i, "year", e.target.value, "awards")
                  }
                />
              </div>
            </div>
          ))}
        </div>

        {/* Publications */}
        <div className="lr-step6-section">
          <div className="lr-step6-section-header">
            <h3 className="lr-step6-section-title">Publications</h3>
            <button
              className="lr-step6-add-btn"
              onClick={() => {
                const list = [
                  ...publications,
                  { title: "", year: "", link: "", description: "" },
                ];
                setPublications(list);
                saveToLocalStorage({
                  professionalAssociations,
                  certifications,
                  awards,
                  publications: list,
                });
              }}
            >
              + Add Publication
            </button>
          </div>

          {publications.map((p, i) => (
            <div key={i} className="lr-step6-card-box">
              <h4 className="lr-step6-subsection">Publication {i + 1}</h4>
              <div className="lr-step6-row">
                <input
                  type="text"
                  placeholder="Title"
                  className="lr-step6-input"
                  value={p.title}
                  onChange={(e) =>
                    handleChange(i, "title", e.target.value, "publications")
                  }
                />
                <input
                  type="number"
                  placeholder="Year"
                  className="lr-step6-input"
                  value={p.year}
                  onChange={(e) =>
                    handleChange(i, "year", e.target.value, "publications")
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Link (Optional)"
                className="lr-step6-input-big"
                value={p.link}
                onChange={(e) =>
                  handleChange(i, "link", e.target.value, "publications")
                }
              />
              <textarea
                placeholder="Brief description of the publication..."
                className="lr-step6-textareas"
                rows={2}
                value={p.description}
                onChange={(e) =>
                  handleChange(i, "description", e.target.value, "publications")
                }
              ></textarea>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="lr-step6-footer">
          <button
            className="lr-step6-prev-btn"
            onClick={() => navigate("/step5", { state: { lawyer_id } })}
          >
            ‹ Previous
          </button>
          <button className="lr-step6-next-btn" onClick={handleSubmit}>
            Finish ✓
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistrationStep6;
