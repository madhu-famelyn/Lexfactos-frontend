import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitStep5 } from "../../Service/Service";
import "./Step5.css";

const LawyerRegistrationStep5 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lawyer_id } = location.state || {};

  // ✅ Load from localStorage safely
  let storedStep5Data;
  try {
    storedStep5Data = JSON.parse(localStorage.getItem("step5FormData")) || {};
  } catch {
    storedStep5Data = {};
  }

  const [caseResults, setCaseResults] = useState(
    Array.isArray(storedStep5Data.caseResults)
      ? storedStep5Data.caseResults
      : [{ title: "", outcome: "", summary: "" }]
  );
  const [officeImage, setOfficeImage] = useState(storedStep5Data.officeImage || null);
  const [imagePreview, setImagePreview] = useState(storedStep5Data.imagePreview || null);

  // ✅ Save to localStorage whenever caseResults or officeImage changes
  useEffect(() => {
    localStorage.setItem(
      "step5FormData",
      JSON.stringify({
        caseResults,
        officeImage,
        imagePreview,
      })
    );
  }, [caseResults, officeImage, imagePreview]);

  const addCaseResult = () => {
    setCaseResults([...caseResults, { title: "", outcome: "", summary: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newResults = [...caseResults];
    newResults[index][field] = value;
    setCaseResults(newResults);
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setOfficeImage(file);
  //   if (file) {
  //     const previewUrl = URL.createObjectURL(file);
  //     setImagePreview(previewUrl);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("lawyer_id", lawyer_id);

      // Append case_results as JSON string
      formData.append(
        "case_results",
        JSON.stringify(
          caseResults.filter(
            (c) => c.title.trim() || c.outcome.trim() || c.summary.trim()
          )
        )
      );

      // Office image (optional) → send actual file if present
      if (officeImage instanceof File) {
        formData.append("office_image", officeImage);
      } else {
        formData.append(
          "office_image",
          new Blob([], { type: "application/octet-stream" }),
          "dummy.jpg"
        );
      }

      const result = await submitStep5(formData);
      console.log("Step 5 saved:", result);

      // ✅ Clear step5 data after successful submit
      localStorage.removeItem("step5FormData");

      navigate("/step6", { state: { lawyer_id } });
    } catch (err) {
      alert("Error saving step 5, please try again.");
    }
  };

  return (
    <div className="lr-step5-container">
      <div className="lr-step5-card">
        {/* Header */}
        <div className="lr-step5-header">
          <h2 className="lr-step5-title">Lawyer Registration</h2>
          <p className="lr-step5-subtitle">Step 5 of 6: Portfolio &amp; Gallery</p>
          <div className="lr-step5-progress-bar">
            <div className="lr-step5-progress-fill" style={{ width: "56%" }}></div>
          </div>
          <p className="lr-step5-progress-text">56% Complete</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Case Results */}
          <div className="lr-step5-case-results">
            <div className="lr-step5-case-header">
              <h3 className="lr-step5-case-title">Case Results (Optional)</h3>
              <button
                type="button"
                className="lr-step5-add-btn"
                onClick={addCaseResult}
              >
                + Add Case Result
              </button>
            </div>

            {caseResults.map((result, index) => (
              <div key={index} className="lr-step5-case-card">
                <h4 className="lr-step5-case-subtitle">Case Result {index + 1}</h4>

                <div className="lr-step5-row">
                  <input
                    type="text"
                    placeholder="Title"
                    value={result.title}
                    onChange={(e) => handleChange(index, "title", e.target.value)}
                    className="lr-step5-input"
                  />
                  <input
                    type="text"
                    placeholder="Outcome"
                    value={result.outcome}
                    onChange={(e) => handleChange(index, "outcome", e.target.value)}
                    className="lr-step5-input"
                  />
                </div>

                <textarea
                  placeholder="Summary"
                  value={result.summary}
                  onChange={(e) => handleChange(index, "summary", e.target.value)}
                  className="lr-step5-textarea"
                  rows={3}
                />
              </div>
            ))}
          </div>

          {/* Office Image Upload (Optional) */}
          {/* <div className="lr-step5-upload">
            <label className="lr-step5-label">Office Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="lr-step5-file-input"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Office Preview"
                className="lr-step5-preview"
              />
            )}
          </div> */}

          {/* Footer Buttons */}
          <div className="lr-step5-footer">
            <button
              type="button"
              className="lr-step5-prev-btn"
              onClick={() => navigate("/step4", { state: { lawyer_id } })}
            >
              ‹ Previous
            </button>
            <button type="submit" className="lr-step5-next-btn">
              Next ›
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LawyerRegistrationStep5;
