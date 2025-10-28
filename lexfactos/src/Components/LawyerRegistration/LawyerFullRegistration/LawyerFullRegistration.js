import React, { useState } from "react";
import axios from "axios";
import "./LawyerFullRegistration.css";

export default function LawyerFullRegistration() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    hashed_password: "",
    photo: "",
    bio: "",
    years_of_experience: "",
    languages_spoken: "",
    practice_area: "",
    court_admitted_to: "",
    active_since: "",
    office_image: "",
    working_hours: "",
    professional_associations: ""
  });

  const [barDetails, setBarDetails] = useState([
    { bar_license_number: "", bar_association_name: "", state: "", city: "" }
  ]);

  const [education, setEducation] = useState([
    { degree: "", college_name: "", graduation_year: "" }
  ]);

  const [workExperience, setWorkExperience] = useState([
    { company_name: "", role: "", duration: "", description: "" }
  ]);

  const [address, setAddress] = useState([
    { street_address: "", city: "", state: "", zip_code: "", latitude: "", longitude: "" }
  ]);

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Basic field handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Dynamic section handler
  const handleDynamicChange = (index, field, value, setter, data) => {
    const updated = [...data];
    updated[index][field] = value;
    setter(updated);
  };

  const addSection = (setter, template) => {
    setter((prev) => [...prev, { ...template }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const payload = {
      ...formData,
      years_of_experience: parseInt(formData.years_of_experience || 0),
      active_since: parseInt(formData.active_since || 0),
      bar_details: barDetails,
      education: education.map((ed) => ({
        ...ed,
        graduation_year: parseInt(ed.graduation_year || 0)
      })),
      work_experience: workExperience,
      address: address,
      case_results: [],
      certifications: [],
      awards: [],
      publications: []
    };

    try {
      const response = await axios.post("http://localhost:8000/lawyer/full/", payload);
      if (response.status === 201) {
        setSuccessMsg("✅ Lawyer created successfully!");
      }
    } catch (err) {
      setSuccessMsg("❌ Error submitting form. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="lawyer-form-container">
      <h2>Lawyer Full Registration</h2>

      <form onSubmit={handleSubmit} className="form-box">
        {/* Basic Info */}
        <h3>Personal Information</h3>
        {Object.entries(formData).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label>{key.replace(/_/g, " ").toUpperCase()}</label>
            <input
              type="text"
              name={key}
              placeholder={`Enter ${key.replace(/_/g, " ")}`}
              value={value}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        ))}

        {/* Bar Details */}
        <h3>Bar Details</h3>
        {barDetails.map((bar, i) => (
          <div key={i} className="section-box">
            <input
              placeholder="Bar License Number"
              value={bar.bar_license_number}
              onChange={(e) =>
                handleDynamicChange(i, "bar_license_number", e.target.value, setBarDetails, barDetails)
              }
            />
            <input
              placeholder="Bar Association Name"
              value={bar.bar_association_name}
              onChange={(e) =>
                handleDynamicChange(i, "bar_association_name", e.target.value, setBarDetails, barDetails)
              }
            />
            <input
              placeholder="State"
              value={bar.state}
              onChange={(e) => handleDynamicChange(i, "state", e.target.value, setBarDetails, barDetails)}
            />
            <input
              placeholder="City"
              value={bar.city}
              onChange={(e) => handleDynamicChange(i, "city", e.target.value, setBarDetails, barDetails)}
            />
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() =>
            addSection(setBarDetails, {
              bar_license_number: "",
              bar_association_name: "",
              state: "",
              city: ""
            })
          }
        >
          + Add Bar Detail
        </button>

        {/* Education */}
        <h3>Education</h3>
        {education.map((ed, i) => (
          <div key={i} className="section-box">
            <input
              placeholder="Degree"
              value={ed.degree}
              onChange={(e) => handleDynamicChange(i, "degree", e.target.value, setEducation, education)}
            />
            <input
              placeholder="College Name"
              value={ed.college_name}
              onChange={(e) =>
                handleDynamicChange(i, "college_name", e.target.value, setEducation, education)
              }
            />
            <input
              placeholder="Graduation Year"
              value={ed.graduation_year}
              onChange={(e) =>
                handleDynamicChange(i, "graduation_year", e.target.value, setEducation, education)
              }
            />
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() => addSection(setEducation, { degree: "", college_name: "", graduation_year: "" })}
        >
          + Add Education
        </button>

        {/* Work Experience */}
        <h3>Work Experience</h3>
        {workExperience.map((we, i) => (
          <div key={i} className="section-box">
            <input
              placeholder="Company Name"
              value={we.company_name}
              onChange={(e) =>
                handleDynamicChange(i, "company_name", e.target.value, setWorkExperience, workExperience)
              }
            />
            <input
              placeholder="Role"
              value={we.role}
              onChange={(e) => handleDynamicChange(i, "role", e.target.value, setWorkExperience, workExperience)}
            />
            <input
              placeholder="Duration"
              value={we.duration}
              onChange={(e) =>
                handleDynamicChange(i, "duration", e.target.value, setWorkExperience, workExperience)
              }
            />
            <input
              placeholder="Description"
              value={we.description}
              onChange={(e) =>
                handleDynamicChange(i, "description", e.target.value, setWorkExperience, workExperience)
              }
            />
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() =>
            addSection(setWorkExperience, { company_name: "", role: "", duration: "", description: "" })
          }
        >
          + Add Work Experience
        </button>

        {/* Address */}
        <h3>Address</h3>
        {address.map((ad, i) => (
          <div key={i} className="section-box">
            <input
              placeholder="Street Address"
              value={ad.street_address}
              onChange={(e) =>
                handleDynamicChange(i, "street_address", e.target.value, setAddress, address)
              }
            />
            <input
              placeholder="City"
              value={ad.city}
              onChange={(e) => handleDynamicChange(i, "city", e.target.value, setAddress, address)}
            />
            <input
              placeholder="State"
              value={ad.state}
              onChange={(e) => handleDynamicChange(i, "state", e.target.value, setAddress, address)}
            />
            <input
              placeholder="ZIP Code"
              value={ad.zip_code}
              onChange={(e) =>
                handleDynamicChange(i, "zip_code", e.target.value, setAddress, address)
              }
            />
            <input
              placeholder="Latitude"
              value={ad.latitude}
              onChange={(e) =>
                handleDynamicChange(i, "latitude", e.target.value, setAddress, address)
              }
            />
            <input
              placeholder="Longitude"
              value={ad.longitude}
              onChange={(e) =>
                handleDynamicChange(i, "longitude", e.target.value, setAddress, address)
              }
            />
          </div>
        ))}
        <button
          type="button"
          className="add-btn"
          onClick={() =>
            addSection(setAddress, {
              street_address: "",
              city: "",
              state: "",
              zip_code: "",
              latitude: "",
              longitude: ""
            })
          }
        >
          + Add Address
        </button>

        <button className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {successMsg && <p className="success-msg">{successMsg}</p>}
    </div>
  );
}
