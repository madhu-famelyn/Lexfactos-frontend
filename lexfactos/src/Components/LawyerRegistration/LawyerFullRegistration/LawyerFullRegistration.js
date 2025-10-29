// src/Pages/LawyerFullRegistration.js
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
        country: "",
        state: "",
        city: "",
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

  const [loading, setLoading] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

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


//   const stateCityData = {
//   Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
//   "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Tirupati"],
//   Karnataka: ["Bengaluru", "Mysuru", "Mangalore", "Hubballi"],
// };
const locationData = {
  India: {
    Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur"],
    Karnataka: ["Bengaluru", "Mysore", "Hubli"],
  },
  USA: {
    California: ["Los Angeles", "San Diego", "San Francisco"],
    Texas: ["Houston", "Dallas", "Austin"],
    Florida: ["Miami", "Orlando", "Tampa"],
  },
  UK: {
    England: ["London", "Manchester", "Liverpool"],
    Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
    Wales: ["Cardiff", "Swansea", "Newport"],
  },
};



// 🌍 Small demo dataset for Bar Location (Country → State → City)
const barLocationData = {
  India: {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Delhi": ["New Delhi"],
  },
  USA: {
    California: ["Los Angeles", "San Francisco", "San Diego"],
    Texas: ["Houston", "Dallas", "Austin"],
    "New York": ["New York City", "Buffalo"],
  },
  UK: {
    England: ["London", "Manchester", "Birmingham"],
    Scotland: ["Edinburgh", "Glasgow"],
    Wales: ["Cardiff", "Swansea"],
  },
};

  // Handlers
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
      return {
        ...prev,
        [field]:
          arr.length > 0
            ? arr
            : [Object.keys(prev[field][0]).reduce((acc, k) => ({ ...acc, [k]: "" }), {})],
      };
    });
  };

  const handleLanguageChange = (selected) => {
    setForm((prev) => ({ ...prev, languages_spoken: selected || [] }));
  };

  const handlePracticeChange = (selected) => {
    setForm((prev) => ({ ...prev, practice_area: selected || [] }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    const fields = [
      "full_name",
      "email",
      "phone_number",
      "hashed_password",
      "bio",
      "years_of_experience",
      "court_admitted_to",
      "active_since",
      "working_hours",
      "professional_associations",
    ];
    fields.forEach((f) => fd.append(f, form[f]));

    fd.append("languages_spoken", form.languages_spoken.map((l) => l.value).join(","));
    fd.append("practice_area", form.practice_area.map((p) => p.value).join(","));

    [
      "bar_details",
      "education",
      "work_experience",
      "case_results",
      "address",
      "certifications",
      "awards",
      "publications",
    ].forEach((key) => fd.append(key, JSON.stringify(form[key])));

    if (photoFile) fd.append("photo", photoFile);
    // if (officeImageFile) fd.append("office_image", officeImageFile); // commented intentionally

    try {
      const res = await axios.post("http://127.0.0.1:8000/lawyer/full/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("✅ Response:", res.data);
      setLoading(false);
      setSuccessPopup(true);
    } catch (err) {
      console.error("❌ Error:", err);
      setLoading(false);
      if (err.response) {
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
        {/* === Step 1: Basic Info === */}
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
          {/* <label>Office Image (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setOfficeImageFile(e.target.files[0])} /> */}
        </div>

        {/* === Step 2: Profile & Qualifications === */}
        <div className="form-section">
          <h3>Profile & Qualifications</h3>
          <label>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} />
          <label>Years of Experience</label>
          <input name="years_of_experience" value={form.years_of_experience} onChange={handleChange} />

          <h4>Bar Details</h4>
              {form.bar_details.map((b, i) => (
                <div key={i} className="nested">
                  <input
                    placeholder="Bar License Number"
                    value={b.bar_license_number}
                    onChange={(e) =>
                      handleNestedChange("bar_details", i, "bar_license_number", e.target.value)
                    }
                  />

                  <input
                    placeholder="Bar Association Name"
                    value={b.bar_association_name}
                    onChange={(e) =>
                      handleNestedChange("bar_details", i, "bar_association_name", e.target.value)
                    }
                  />

                  <input
                    placeholder="Enrollment Year"
                    value={b.enrollment_year}
                    onChange={(e) =>
                      handleNestedChange("bar_details", i, "enrollment_year", e.target.value)
                    }
                  />

                  {/* === Country Dropdown === */}
                  <select
                    value={b.country || ""}
                    onChange={(e) =>
                      handleNestedChange("bar_details", i, "country", e.target.value)
                    }
                  >
                    <option value="">Select Country</option>
                    {Object.keys(barLocationData).map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>

                  {/* === State Dropdown (depends on country) === */}
                  <select
                    value={b.state || ""}
                    onChange={(e) =>
                      handleNestedChange("bar_details", i, "state", e.target.value)
                    }
                    disabled={!b.country}
                  >
                    <option value="">Select State</option>
                    {b.country &&
                      Object.keys(barLocationData[b.country]).map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                  </select>

                  {/* === City Dropdown (depends on state) === */}
                  <select
                    value={b.city || ""}
                    onChange={(e) =>
                      handleNestedChange("bar_details", i, "city", e.target.value)
                    }
                    disabled={!b.state}
                  >
                    <option value="">Select City</option>
                    {b.country &&
                      b.state &&
                      barLocationData[b.country][b.state]?.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => removeNestedItem("bar_details", i)}
                    className="lawreg-remove-btn"
                  >
                    Remove
                  </button>
                </div>
              ))}

          <button type="button" onClick={() => addNestedItem("bar_details", { bar_license_number: "", bar_association_name: "", enrollment_year: "", state: "", city: "" })}>+ Add Bar</button>

          <label>Languages Spoken</label>
          <Select isMulti options={languageOptions} value={form.languages_spoken} onChange={handleLanguageChange} />

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

        {/* === Step 3: Practice Details === */}
        <div className="form-section">
          <h3>Practice Details</h3>
          <label>Practice Areas</label>
          <Select isMulti options={practiceOptions} value={form.practice_area} onChange={handlePracticeChange} />
          {/* <label>Court Admitted To</label>
          <input name="court_admitted_to" value={form.court_admitted_to} onChange={handleChange} /> */}
          {/* <label>Active Since</label>
          <input name="active_since" value={form.active_since} onChange={handleChange} /> */}

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

        {/* === Step 4: Address & Other Details === */}
        <div className="form-section">
          <h3>Address Details</h3>
          {form.address.map((a, i) => (
            <div key={i} className="nested">
              <input placeholder="Street Address" value={a.street_address} onChange={(e) => handleNestedChange("address", i, "street_address", e.target.value)} />
<select
  value={a.country}
  onChange={(e) => handleNestedChange("address", i, "country", e.target.value)}
>
  <option value="">Select Country</option>
  {Object.keys(locationData).map((country, index) => (
    <option key={index} value={country}>
      {country}
    </option>
  ))}
</select>


<select
  value={a.state}
  onChange={(e) => handleNestedChange("address", i, "state", e.target.value)}
  disabled={!a.country}
>
  <option value="">Select State</option>
  {a.country &&
    Object.keys(locationData[a.country]).map((state, index) => (
      <option key={index} value={state}>
        {state}
      </option>
    ))}
</select>


<select
  value={a.city}
  onChange={(e) => handleNestedChange("address", i, "city", e.target.value)}
  disabled={!a.state}
>
  <option value="">Select City</option>
  {a.country &&
    a.state &&
    locationData[a.country] &&
    locationData[a.country][a.state] &&
    locationData[a.country][a.state].map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    ))}
</select>

        


              
              <input placeholder="Zip Code" value={a.zip_code} onChange={(e) => handleNestedChange("address", i, "zip_code", e.target.value)} />
              <input placeholder="Latitude" value={a.latitude} onChange={(e) => handleNestedChange("address", i, "latitude", e.target.value)} />
              <input placeholder="Longitude" value={a.longitude} onChange={(e) => handleNestedChange("address", i, "longitude", e.target.value)} />
              <button type="button" onClick={() => removeNestedItem("address", i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem("address", { street_address: "", city: "", state: "", zip_code: "", latitude: "", longitude: "" })}>+ Add Address</button>

          {/* <label>Working Hours</label> */}
          {/* <input name="working_hours" value={form.working_hours} onChange={handleChange} /> */}

          {/* <label>Professional Associations</label> */}
          {/* <input name="professional_associations" value={form.professional_associations} onChange={handleChange} /> */}

          {/* <h4>Certifications</h4> */}
          {/* {form.certifications.map((c, i) => (
            <div key={i} className="nested">
              <input placeholder="Certification Name" value={c.name} onChange={(e) => handleNestedChange("certifications", i, "name", e.target.value)} />
              <input placeholder="Issuer" value={c.issuer} onChange={(e) => handleNestedChange("certifications", i, "issuer", e.target.value)} />
              <button type="button" onClick={() => removeNestedItem("certifications", i)}>Remove</button>
            </div>
          ))} */}
          {/* <button type="button" onClick={() => addNestedItem("certifications", { name: "", issuer: "" })}>+ Add Certification</button> */}

          {/* <h4>Awards</h4>
          {form.awards.map((a, i) => (
            <div key={i} className="nested">
              <input placeholder="Award Name" value={a.name} onChange={(e) => handleNestedChange("awards", i, "name", e.target.value)} />
              <input placeholder="Organization" value={a.organization} onChange={(e) => handleNestedChange("awards", i, "organization", e.target.value)} />
              <input placeholder="Year" value={a.year} onChange={(e) => handleNestedChange("awards", i, "year", e.target.value)} />
              <button type="button" onClick={() => removeNestedItem("awards", i)}>Remove</button>
            </div>
          ))} */}
          {/* <button type="button" onClick={() => addNestedItem("awards", { name: "", organization: "", year: "" })}>+ Add Award</button> */}
{/* 
          <h4>Publications</h4>
          {form.publications.map((p, i) => (
            <div key={i} className="nested">
              <input placeholder="Title" value={p.title} onChange={(e) => handleNestedChange("publications", i, "title", e.target.value)} />
              <input placeholder="Journal" value={p.journal} onChange={(e) => handleNestedChange("publications", i, "journal", e.target.value)} />
              <input placeholder="Year" value={p.year} onChange={(e) => handleNestedChange("publications", i, "year", e.target.value)} />
              <button type="button" onClick={() => removeNestedItem("publications", i)}>Remove</button>
            </div>
          ))} */}
          {/* <button type="button" onClick={() => addNestedItem("publications", { title: "", journal: "", year: "" })}>+ Add Publication</button> */}
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </form>

      {/* Loader overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
          <p>Submitting your details...</p>
        </div>
      )}

      {/* Success popup */}
      {successPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>✅ Registration Successful!</h3>
            <p>Your details have been submitted successfully.</p>
            <button onClick={() => setSuccessPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerFullRegistration;
