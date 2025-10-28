import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import "./LawyerFullRegistration.css";

const LawyerFullRegistration = () => {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    hashed_password: "",
    bio: "",
    years_of_experience: "",
    bar_details: [
      {
        bar_license_number: "",
        bar_association_name: "",
        enrollment_year: "",
        state: "",
        city: "",
      },
    ],
    languages_spoken: [],
    education: [
      {
        degree: "",
        college_name: "",
        graduation_year: "",
      },
    ],
    practice_area: [],
    court_admitted_to: "",
    active_since: "",
    work_experience: [
      {
        company_name: "",
        role: "",
        duration: "",
      },
    ],
    case_results: [
      {
        case_name: "",
        outcome: "",
      },
    ],
    address: [
      {
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        latitude: "",
        longitude: "",
      },
    ],
    working_hours: "",
    professional_associations: "",
    certifications: [
      {
        name: "",
        issuer: "",
      },
    ],
    awards: [
      {
        name: "",
        organization: "",
        year: "",
      },
    ],
    publications: [
      {
        title: "",
        journal: "",
        year: "",
      },
    ],
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [officeImageFile, setOfficeImageFile] = useState(null);

  // Dropdown options
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Tamil", label: "Tamil" },
    { value: "Telugu", label: "Telugu" },
    { value: "Hindi", label: "Hindi" },
    { value: "Malayalam", label: "Malayalam" },
  ];

  const practiceOptions = [
    { value: "Administrative Law", label: "Administrative Law" },
    { value: "Admiralty & Maritime Law", label: "Admiralty & Maritime Law" },
    { value: "Alternative Dispute Resolution", label: "Alternative Dispute Resolution" },
    { value: "Animal Law", label: "Animal Law" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (field, index, key, value) => {
    setForm((prev) => {
      const arr = [...prev[field]];
      arr[index][key] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addNestedItem = (field, template) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...prev[field], template],
    }));
  };

  const removeNestedItem = (field, index) => {
    setForm((prev) => {
      const arr = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: arr.length ? arr : [Object.keys(prev[field][0]).reduce((a, k) => ({ ...a, [k]: "" }), {})] };
    });
  };

  const handleLanguageChange = (selected) => {
    setForm((prev) => ({ ...prev, languages_spoken: selected || [] }));
  };

  const handlePracticeChange = (selected) => {
    setForm((prev) => ({ ...prev, practice_area: selected || [] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("full_name", form.full_name);
    fd.append("email", form.email);
    fd.append("phone_number", form.phone_number);
    fd.append("hashed_password", form.hashed_password);
    fd.append("bio", form.bio);
    fd.append("years_of_experience", form.years_of_experience);
    fd.append("court_admitted_to", form.court_admitted_to);
    fd.append("active_since", form.active_since);
    fd.append("working_hours", form.working_hours);
    fd.append("professional_associations", form.professional_associations);

    // Convert selects to comma-separated string
    fd.append("languages_spoken", form.languages_spoken.map((l) => l.value).join(","));
    fd.append("practice_area", form.practice_area.map((p) => p.value).join(","));

    // JSON-stringify nested structures
    fd.append("bar_details", JSON.stringify(form.bar_details));
    fd.append("education", JSON.stringify(form.education));
    fd.append("work_experience", JSON.stringify(form.work_experience));
    fd.append("case_results", JSON.stringify(form.case_results));
    fd.append("address", JSON.stringify(form.address));
    fd.append("certifications", JSON.stringify(form.certifications));
    fd.append("awards", JSON.stringify(form.awards));
    fd.append("publications", JSON.stringify(form.publications));

    if (photoFile) fd.append("photo", photoFile);
    if (officeImageFile) fd.append("office_image", officeImageFile);

    try {
      const res = await axios.post("http://127.0.0.1:8000/lawyer/full/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Lawyer registered successfully!");
      console.log("✅ Response:", res.data);
    } catch (err) {
      console.error("❌ Error:", err);
      if (err.response) {
        console.error("Server Response:", err.response.data);
        alert(`Error ${err.response.status}: ${err.response.data.detail || "Unknown error"}`);
      } else {
        alert("Failed: Internal or network error");
      }
    }
  };

  return (
    <div className="lawyer-form-container">
      <h2>Full Lawyer Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* === Step 1 === */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <label>Full Name *</label>
          <input name="full_name" value={form.full_name} onChange={handleChange} required />
          <label>Email *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
          <label>Phone Number *</label>
          <input name="phone_number" value={form.phone_number} onChange={handleChange} required />
          <label>Password *</label>
          <input name="hashed_password" type="password" value={form.hashed_password} onChange={handleChange} required />

          <label>Photo *</label>
          <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} required />

          <label>Office Image (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setOfficeImageFile(e.target.files[0])} />
        </div>

        {/* === Step 2 === */}
        <div className="form-section">
          <h3>Profile & Qualifications</h3>
          <label>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} />
          <label>Years of Experience</label>
          <input name="years_of_experience" value={form.years_of_experience} onChange={handleChange} />

          {/* Bar Details */}
          <h4>Bar Details</h4>
          {form.bar_details.map((b, i) => (
            <div key={i} className="nested">
              <input placeholder="Bar License Number" value={b.bar_license_number} onChange={(e) => handleNestedChange("bar_details", i, "bar_license_number", e.target.value)} />
              <input placeholder="Bar Association Name" value={b.bar_association_name} onChange={(e) => handleNestedChange("bar_details", i, "bar_association_name", e.target.value)} />
              <input placeholder="Enrollment Year" value={b.enrollment_year} onChange={(e) => handleNestedChange("bar_details", i, "enrollment_year", e.target.value)} />
              <input placeholder="State" value={b.state} onChange={(e) => handleNestedChange("bar_details", i, "state", e.target.value)} />
              <input placeholder="City" value={b.city} onChange={(e) => handleNestedChange("bar_details", i, "city", e.target.value)} />
              <button type="button" onClick={() => removeNestedItem("bar_details", i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem("bar_details", { bar_license_number: "", bar_association_name: "", enrollment_year: "", state: "", city: "" })}>+ Add Bar</button>

          {/* Languages */}
          <label>Languages Spoken</label>
          <Select isMulti options={languageOptions} value={form.languages_spoken} onChange={handleLanguageChange} />

          {/* Education */}
          <h4>Education</h4>
          {form.education.map((ed, i) => (
            <div key={i} className="nested">
              <input placeholder="Degree" value={ed.degree} onChange={(e) => handleNestedChange("education", i, "degree", e.target.value)} />
              <input placeholder="College Name" value={ed.college_name} onChange={(e) => handleNestedChange("education", i, "college_name", e.target.value)} />
              <input placeholder="Graduation Year" value={ed.graduation_year} onChange={(e) => handleNestedChange("education", i, "graduation_year", e.target.value)} />
              <button type="button" onClick={() => removeNestedItem("education", i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem("education", { degree: "", college_name: "", graduation_year: "" })}>+ Add Education</button>
        </div>

        {/* === Step 3 === */}
        <div className="form-section">
          <h3>Practice Details</h3>
          <label>Practice Areas</label>
          <Select isMulti options={practiceOptions} value={form.practice_area} onChange={handlePracticeChange} />
          <label>Court Admitted To</label>
          <input name="court_admitted_to" value={form.court_admitted_to} onChange={handleChange} />
          <label>Active Since</label>
          <input name="active_since" value={form.active_since} onChange={handleChange} />

          <h4>Work Experience</h4>
          {form.work_experience.map((w, i) => (
            <div key={i} className="nested">
              <input placeholder="Company Name" value={w.company_name} onChange={(e) => handleNestedChange("work_experience", i, "company_name", e.target.value)} />
              <input placeholder="Role" value={w.role} onChange={(e) => handleNestedChange("work_experience", i, "role", e.target.value)} />
              <input placeholder="Duration" value={w.duration} onChange={(e) => handleNestedChange("work_experience", i, "duration", e.target.value)} />
              <button type="button" onClick={() => removeNestedItem("work_experience", i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem("work_experience", { company_name: "", role: "", duration: "" })}>+ Add Work Experience</button>
        </div>

        {/* === Step 4–6 === */}
        {/* Keep your existing nested fields exactly as they were */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">Submit Registration</button>
        </div>
      </form>
    </div>
  );
};

export default LawyerFullRegistration;
