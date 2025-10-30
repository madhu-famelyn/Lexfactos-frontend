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

const locationData = {
  India: {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
    Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
    Goa: ["Panaji", "Margao", "Mapusa"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangalore", "Belagavi"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    Manipur: ["Imphal", "Churachandpur", "Thoubal"],
    Meghalaya: ["Shillong", "Tura", "Jowai"],
    Mizoram: ["Aizawl", "Lunglei"],
    Nagaland: ["Kohima", "Dimapur"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    Sikkim: ["Gangtok", "Namchi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    Tripura: ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida", "Ghaziabad", "Prayagraj"],
    Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
    "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah"],
    "Delhi (NCT)": ["New Delhi", "Dwarka", "Rohini", "Saket"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag"],
    Ladakh: ["Leh", "Kargil"],
    Chandigarh: ["Chandigarh"],
    "Puducherry (UT)": ["Puducherry", "Karaikal"],
  },

  UAE: {
    "Abu Dhabi": ["Abu Dhabi", "Al Ain", "Madinat Zayed", "Ruwais"],
    Dubai: ["Dubai", "Jebel Ali", "Hatta"],
    Sharjah: ["Sharjah", "Khor Fakkan", "Kalba", "Dhaid"],
    Ajman: ["Ajman"],
    "Umm Al Quwain": ["Umm Al Quwain"],
    "Ras Al Khaimah": ["Ras Al Khaimah", "Dibba Al Hisn"],
    Fujairah: ["Fujairah", "Dibba Al Fujairah"],
  },
};


  const barLocationData = {
  India: {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro"],
    Assam: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba"],
    Goa: ["Panaji", "Margao", "Mapusa"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangalore", "Belagavi"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    Manipur: ["Imphal", "Churachandpur", "Thoubal"],
    Meghalaya: ["Shillong", "Tura", "Jowai"],
    Mizoram: ["Aizawl", "Lunglei"],
    Nagaland: ["Kohima", "Dimapur"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner"],
    Sikkim: ["Gangtok", "Namchi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    Tripura: ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida", "Ghaziabad", "Prayagraj"],
    Uttarakhand: ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
    "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah"],
    "Delhi (NCT)": ["New Delhi", "Dwarka", "Rohini", "Saket"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag"],
    Ladakh: ["Leh", "Kargil"],
    Chandigarh: ["Chandigarh"],
    "Puducherry (UT)": ["Puducherry", "Karaikal"],
  },


 UAE: {
    "Abu Dhabi": ["Abu Dhabi", "Al Ain", "Madinat Zayed", "Ruwais"],
    Dubai: ["Dubai", "Jebel Ali", "Hatta"],
    Sharjah: ["Sharjah", "Khor Fakkan", "Kalba", "Dhaid"],
    Ajman: ["Ajman"],
    "Umm Al Quwain": ["Umm Al Quwain"],
    "Ras Al Khaimah": ["Ras Al Khaimah", "Dibba Al Hisn"],
    Fujairah: ["Fujairah", "Dibba Al Fujairah"],
  },
};


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

    try {
      const res = await axios.post("https://lexfactos-backend.fly.dev/lawyer/full/", fd, {
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
    <div className="full-reg-lawyer-form-container">
      <h2>Full Lawyer Registration</h2>

      <form onSubmit={handleSubmit}>
        {/* === Step 1: Basic Info === */}
        <div className="full-reg-form-section">
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
        </div>

        {/* === Step 2: Profile & Qualifications === */}
        <div className="full-reg-form-section">
          <h3>Profile & Qualifications</h3>
          <label>Bio *</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} required />
          <label>Years of Experience *</label>
          <input name="years_of_experience" value={form.years_of_experience} onChange={handleChange} required />

          <h4>Bar Details *</h4>
          {form.bar_details.map((b, i) => (
            <div key={i} className="full-reg-nested">
              <input placeholder="Bar License Number" value={b.bar_license_number} onChange={(e) => handleNestedChange("bar_details", i, "bar_license_number", e.target.value)} required />
              <input placeholder="Bar Association Name" value={b.bar_association_name} onChange={(e) => handleNestedChange("bar_details", i, "bar_association_name", e.target.value)} required />
              <input placeholder="Enrollment Year" value={b.enrollment_year} onChange={(e) => handleNestedChange("bar_details", i, "enrollment_year", e.target.value)} required />

              <select value={b.country || ""} onChange={(e) => handleNestedChange("bar_details", i, "country", e.target.value)} required>
                <option value="">Select Country</option>
                {Object.keys(barLocationData).map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select value={b.state || ""} onChange={(e) => handleNestedChange("bar_details", i, "state", e.target.value)} disabled={!b.country} required>
                <option value="">Select State</option>
                {b.country &&
                  Object.keys(barLocationData[b.country]).map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
              </select>

              <select value={b.city || ""} onChange={(e) => handleNestedChange("bar_details", i, "city", e.target.value)} disabled={!b.state} required>
                <option value="">Select City</option>
                {b.country &&
                  b.state &&
                  barLocationData[b.country][b.state]?.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </select>

              <button type="button" onClick={() => removeNestedItem("bar_details", i)} className="full-reg-lawreg-remove-btn">
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={() => addNestedItem("bar_details", { bar_license_number: "", bar_association_name: "", enrollment_year: "", state: "", city: "" })}>
            + Add Bar
          </button>
          <p />
          <label>Languages Spoken *</label>
          <Select isMulti options={languageOptions} value={form.languages_spoken} onChange={handleLanguageChange} required />

          <h4>Education *</h4>
          {form.education.map((ed, i) => (
            <div key={i} className="full-reg-nested">
              <input placeholder="Degree" value={ed.degree} onChange={(e) => handleNestedChange("education", i, "degree", e.target.value)} required />
              <input placeholder="College Name" value={ed.college_name} onChange={(e) => handleNestedChange("education", i, "college_name", e.target.value)} required />
              <input placeholder="Graduation Year" value={ed.graduation_year} onChange={(e) => handleNestedChange("education", i, "graduation_year", e.target.value)} required />
              <button type="button" onClick={() => removeNestedItem("education", i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem("education", { degree: "", college_name: "", graduation_year: "" })}>+ Add Education</button>
        </div>

        {/* === Step 3: Practice Details === */}
        <div className="full-reg-form-section">
          <h3>Practice Details *</h3>
          <label>Practice Areas *</label>
          <Select isMulti options={practiceOptions} value={form.practice_area} onChange={handlePracticeChange} required />

          <h4>Work Experience *</h4>
          {form.work_experience.map((w, i) => (
            <div key={i} className="full-reg-nested">
              <input placeholder="Company Name" value={w.company_name} onChange={(e) => handleNestedChange("work_experience", i, "company_name", e.target.value)} required />
              <input placeholder="Role" value={w.role} onChange={(e) => handleNestedChange("work_experience", i, "role", e.target.value)} required />
              <input placeholder="Duration" value={w.duration} onChange={(e) => handleNestedChange("work_experience", i, "duration", e.target.value)} required />
              <button type="button" onClick={() => removeNestedItem("work_experience", i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem("work_experience", { company_name: "", role: "", duration: "" })}>+ Add Work Experience</button>
        </div>

        {/* === Step 4: Address & Other Details === */}
        <div className="full-reg-form-section">
          <h3>Address Details *</h3>
          {form.address.map((a, i) => (
            <div key={i} className="full-reg-nested">
              <input placeholder="Street Address" value={a.street_address} onChange={(e) => handleNestedChange("address", i, "street_address", e.target.value)} required />
              <select value={a.country} onChange={(e) => handleNestedChange("address", i, "country", e.target.value)} required>
                <option value="">Select Country</option>
                {Object.keys(locationData).map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <select value={a.state} onChange={(e) => handleNestedChange("address", i, "state", e.target.value)} disabled={!a.country} required>
                <option value="">Select State</option>
                {a.country &&
                  Object.keys(locationData[a.country]).map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
              </select>

              <select value={a.city} onChange={(e) => handleNestedChange("address", i, "city", e.target.value)} disabled={!a.state} required>
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

              <input placeholder="Zip Code" value={a.zip_code} onChange={(e) => handleNestedChange("address", i, "zip_code", e.target.value)} required />
              <input placeholder="Latitude" value={a.latitude} onChange={(e) => handleNestedChange("address", i, "latitude", e.target.value)} required />
              <input placeholder="Longitude" value={a.longitude} onChange={(e) => handleNestedChange("address", i, "longitude", e.target.value)} required />
              <button type="button" onClick={() => removeNestedItem("address", i)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addNestedItem("address", { street_address: "", city: "", state: "", zip_code: "", latitude: "", longitude: "" })}>+ Add Address</button>
        </div>

        <div className="full-reg-form-actions">
          <button type="submit" className="full-reg-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </form>

      {loading && (
        <div className="full-reg-loader-overlay">
          <div className="full-reg-loader"></div>
          <p>Submitting your details...</p>
        </div>
      )}

      {successPopup && (
        <div className="full-reg-popup-overlay">
          <div className="full-reg-popup-box">
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
