import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { FiUpload } from "react-icons/fi";
import { registerLawyer } from "../../Service/Service";
import { useNavigate } from "react-router-dom";
import DateSelector from "../../ReusableComponents/DateSelector/DateSelector";
import ErrorPopup from "../../ReusableComponents/ErrorPopUP/ErrorPopUp";

const formatDOB = (dob) => {
  if (!dob) return "";
  const [year, month, day] = dob.split("-");
  return `${day}-${month}-${year}`;
};

const countryCodes = [
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
];

const LawyerRegistration = () => {
  const navigate = useNavigate();

  const storedData = JSON.parse(localStorage.getItem("lawyerFormData")) || {
    full_name: "",
    gender: "",
    dob: "",
    email: "",
    country_code: "+91",
    phone_number: "",
    password: "",
    confirm_password: "",
    linkedin_url: "",
    website_url: "",
    short_note: "",
    photo: null,
  };

  const [formData, setFormData] = useState(storedData);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(
    localStorage.getItem("lawyerPhoto") || null
  );
  const [popupMessage, setPopupMessage] = useState(null);

  useEffect(() => {
    const saveData = { ...formData, photo: null };
    localStorage.setItem("lawyerFormData", JSON.stringify(saveData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      localStorage.setItem("lawyerPhoto", previewUrl);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Popup-based Validation
  const validateForm = () => {
    if (!formData.full_name.trim()) return "Full name is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!formData.phone_number.trim()) return "Phone number is required.";
    if (!formData.password.trim()) return "Password is required.";
    if (!formData.confirm_password.trim()) return "Please confirm password.";
    if (formData.password !== formData.confirm_password)
      return "Passwords do not match.";
    if (!formData.photo) return "Profile photo is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setPopupMessage(validationError);
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "dob") {
          data.append(key, formatDOB(formData[key]));
        } else if (key === "phone_number") {
          data.append(
            "phone_number",
            `${formData.country_code}${formData.phone_number}`
          );
        } else {
          data.append(key, formData[key]);
        }
      });

      const res = await registerLawyer(data);
      localStorage.setItem("lawyerId", res.id);
      navigate("/step2", { state: { lawyerId: res.id } });

    } catch (err) {
      setPopupMessage(err.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      {/* 🔹 Popup for frontend/backend errors */}
      <ErrorPopup message={popupMessage} onClose={() => setPopupMessage(null)} />

      <div className="registration-card">
        <div className="registration-header">
          <div>
            <h2 className="registration-title">Lawyer Registration</h2>
            <p className="registration-step">Step 1 of 6: Personal & Contact Info</p>
          </div>

          <div className="progress-container">
            <span className="progress-text">11% Complete</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "11%" }}></div>
            </div>
          </div>
        </div>

        <div className="registration-body">
          <div className="upload-section">
            <div className="photo-placeholder">
              {photoPreview ? (
                <img src={photoPreview} alt="preview" className="photo-preview" />
              ) : (
                <span className="photo-icon">🖼</span>
              )}
            </div>
            <label className="upload-btn">
              <FiUpload className="upload-icon" />
              Upload Profile Photo *
              <input type="file" accept="image/*" name="photo" onChange={handleChange} />
            </label>
          </div>

          <div className="vertical-line" />

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Gender (Optional)</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <DateSelector
                label="Date of Birth (Optional)"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required={false}
              />

              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

<div className="form-row lr-phone-pass-row">
  {/* 📞 Phone Number Field */}
  <div className="form-group">
    <label>Phone Number *</label>
    <div className="lr-phone-wrapper">
      <select
        name="country_code"
        value={formData.country_code}
        onChange={handleChange}
        className="lr-phone-select"
      >
        {countryCodes.map((c, idx) => (
          <option key={idx} value={c.code}>
            {c.flag} {c.code}
          </option>
        ))}
      </select>

      <input
        type="tel"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        placeholder="Enter phone number"
        required
        className="lr-phone-input"
        pattern="\d*"
        inputMode="numeric"
      />
    </div>
  </div>

  {/* 🔒 Password Field */}
  <div className="form-group">
    <label>Password *</label>
    <input
      type="password"
      name="hashed_password"
      value={formData.hashed_password}
      onChange={handleChange}
      placeholder="Enter password"
      required
      className="lr-password-input"
    />
  </div>
</div>


            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                />
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>LinkedIn URL (Optional)</label>
                <input
                  type="text"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="form-group">
                <label>Website / Firm URL (Optional)</label>
                <input
                  type="text"
                  name="website_url"
                  value={formData.website_url}
                  onChange={handleChange}
                  placeholder="https://yourfirm.com"
                />
              </div>
            </div>

            <div className="lr-step2-footer">
              <button type="button" className="lr-step2-prev-btn" onClick={() => navigate(-1)}>
                Previous
              </button>

              <button type="submit" className="lr-step2-next-btn" disabled={loading}>
                {loading ? <div className="spinner"></div> : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistration;
