import React, { useState, useEffect } from "react";
import "./SignIn.css";
import { FiUpload } from "react-icons/fi";
import { registerLawyer } from "../../Service/Service";
import { useNavigate } from "react-router-dom";

const formatDOB = (dob) => {
  if (!dob) return "";
  const [year, month, day] = dob.split("-");
  return `${day}-${month}-${year}`;
};

const countryCodes = [
  { code: "+1" },
  { code: "+7" },
  { code: "+20" },
  { code: "+27" },
  { code: "+30" },
  { code: "+31" },
  { code: "+32" },
  { code: "+33" },
  { code: "+34" },
  { code: "+36" },
  { code: "+39" },
  { code: "+40" },
  { code: "+41" },
  { code: "+43" },
  { code: "+44" },
  { code: "+45" },
  { code: "+46" },
  { code: "+47" },
  { code: "+48" },
  { code: "+49" },
  { code: "+52" },
  { code: "+55" },
  { code: "+56" },
  { code: "+57" },
  { code: "+58" },
  { code: "+60" },
  { code: "+61" },
  { code: "+62" },
  { code: "+63" },
  { code: "+64" },
  { code: "+65" },
  { code: "+66" },
  { code: "+81" },
  { code: "+82" },
  { code: "+84" },
  { code: "+86" },
  { code: "+90" },
  { code: "+91" },
  { code: "+92" },
  { code: "+93" },
  { code: "+94" },
  { code: "+95" },
  { code: "+98" },
  { code: "+971" },
  { code: "+972" },
  { code: "+974" },
  { code: "+975" },
  { code: "+977" },
  { code: "+994" },
  { code: "+995" },
  { code: "+996" },
  { code: "+998" },
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

  const storedLawyerId = localStorage.getItem("lawyerId");
  const [formData, setFormData] = useState(storedData);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(
    localStorage.getItem("lawyerPhoto") || null
  );
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (!formData.confirm_password.trim()) newErrors.confirm_password = "Please confirm your password.";
    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true); // 🔹 Start loader

    try {
      if (storedLawyerId) {
        navigate("/step2", { state: { lawyerId: storedLawyerId } });
        return;
      }

      const data = new FormData();
      data.append("full_name", formData.full_name);
      data.append("gender", formData.gender);
      data.append("dob", formatDOB(formData.dob));
      data.append("email", formData.email);
      const fullPhone = `${formData.country_code}${formData.phone_number}`;
      data.append("phone_number", fullPhone);
      data.append("password", formData.password);
      data.append("confirm_password", formData.confirm_password);
      data.append("linkedin_url", formData.linkedin_url);
      data.append("website_url", formData.website_url);
      data.append("short_note", formData.short_note);
      if (formData.photo) data.append("photo", formData.photo);

      const res = await registerLawyer(data);
      localStorage.setItem("lawyerId", res.id);
      navigate("/step2", { state: { lawyerId: res.id } });
    } catch (err) {
      if (err?.response?.status === 400) {
        if (err.response.data.detail?.includes("Email already registered")) {
          alert("This email is already registered. Please use another email.");
        } else if (err.response.data.detail?.includes("Phone number already registered")) {
          alert("This phone number is already registered. Please use another one.");
        } else {
          alert(err.response.data.detail || "Registration failed. Please try again.");
        }
      } else {
        alert("Registration failed. Please check all fields and try again.");
      }
    } finally {
      setLoading(false); // 🔹 Stop loader
    }
  };


  return (
    <div className="registration-container">
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
              Upload Profile Photo
              <input
                type="file"
                accept="image/*"
                name="photo"
                style={{ display: "none" }}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="vertical-line"></div>

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
                  required
                />
                {errors.full_name && <p className="error-text">{errors.full_name}</p>}
              </div>

              <div className="form-group">
                <label>Gender (Optional)</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{
                    width: "95%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                >
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth (Optional)</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    padding: "4px 8px",
                    width: "300px",
                    height: "34px",
                  }}
                >
                  <select
                    name="country_code"
                    value={formData.country_code}
                    onChange={handleChange}
                    style={{
                      border: "none",
                      background: "transparent",
                      fontSize: "14px",
                      outline: "none",
                      width: "70px",
                    }}
                  >
                    {countryCodes.map((c, idx) => (
                      <option key={idx} value={c.code}>
                        {c.code}
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
                    style={{
                      border: "none",
                      outline: "none",
                      flex: 1,
                      fontSize: "14px",
                      padding: "8px",
                    }}
                  />
                </div>
                {errors.phone_number && <p className="error-text">{errors.phone_number}</p>}
              </div>

              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirm_password && (
                  <p className="error-text">{errors.confirm_password}</p>
                )}
              </div>
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
            </div>

            <div className="form-row">
              <div className="form-group full-width">
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
              <button
                type="button"
                className="lr-step2-prev-btn"
                onClick={() => navigate(-1)}
              >
                Previous
              </button>

              <button
        type="submit"
        className="lr-step2-next-btn"
        disabled={loading} // 🔹 prevent double submit
      >
        {loading ? (
          <div className="spinner"></div> // 🔹 spinner visible
        ) : (
          "Next"
        )}
      </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistration;
