import React, { useState } from "react";
import axios from "axios";
import "./LawyerFullRegistration.css";
import CustomDropdown from "../../ReusableComponents/CustomDropDown/CustomDropDown";
import PracticeAreaDropdown from "../../ReusableComponents/PracticeArea/PracticeArea";
import LocationSelector from "../../ReusableComponents/CustomDropDown/LocationSelector/Locations";

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
        country: "",
        state: "",
        city: "",
      },
    ],
    languages_spoken: "",
    education: [
      {
        degree: "",
        college_name: "",
        graduation_year: "",
      },
    ],
    practice_area: "",
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
  const [errorPopup, setErrorPopup] = useState(""); // ✅ For duplicate errors

  // ===== Language Options =====
  const languagesList = [
    "Hindi",
    "English",
    "Tamil",
    "Telugu",
    "Malayalam",
    "Kannada",
    "Marathi",
    "Gujarati",
    "Bengali",
    "Punjabi",
    "Urdu",
    "Odia",
    "Assamese",
    "Arabic",
    "Persian (Farsi)",
    "Kurdish",
    "Pashto",
    "Sindhi",
  ];

  // ===== Handlers =====
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

  // ✅ Location handlers
  const handleBarLocationChange = (index, country, state, city) => {
    setForm((prev) => {
      const updated = [...prev.bar_details];
      updated[index].country = country;
      updated[index].state = state;
      updated[index].city = city;
      return { ...prev, bar_details: updated };
    });
  };

  const handleAddressLocationChange = (index, country, state, city) => {
    setForm((prev) => {
      const updated = [...prev.address];
      updated[index].country = country;
      updated[index].state = state;
      updated[index].city = city;
      return { ...prev, address: updated };
    });
  };

  // ✅ Handle multiple practice areas (comma-separated string)
  const handlePracticeChange = (selectedArea) => {
    setForm((prev) => {
      const selectedAreas = prev.practice_area
        ? prev.practice_area.split(",").map((a) => a.trim())
        : [];

      if (selectedAreas.includes(selectedArea)) {
        const updated = selectedAreas.filter((a) => a !== selectedArea);
        return { ...prev, practice_area: updated.join(", ") };
      } else {
        const updated = [...selectedAreas, selectedArea];
        return { ...prev, practice_area: updated.join(", ") };
      }
    });
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorPopup("");

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
      "languages_spoken",
      "practice_area",
    ];

    fields.forEach((f) => fd.append(f, form[f]));

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
      const res = await axios.post(
        "https://lexfactos-backend.fly.dev/lawyer/full/",
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("✅ Response:", res.data);
      setLoading(false);
      setSuccessPopup(true);

      // ✅ Clear form after success
      setForm({
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
            country: "",
            state: "",
            city: "",
          },
        ],
        languages_spoken: "",
        education: [
          {
            degree: "",
            college_name: "",
            graduation_year: "",
          },
        ],
        practice_area: "",
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
      setPhotoFile(null);
    } catch (err) {
      console.error("❌ Error:", err);
      setLoading(false);

      if (err.response?.data?.detail?.includes("duplicate key value")) {
        setErrorPopup("❌ Email or Phone Number already exists. Please use another.");
      } else {
        setErrorPopup("Something went wrong. Please try again.");
      }
    }
  };

  
  // ===== Language Dropdown Logic =====
  const handleLanguageSelect = (selectedLanguage) => {
    const selectedArray = form.languages_spoken
      ? form.languages_spoken.split(",").map((l) => l.trim())
      : [];
    const alreadySelected = selectedArray.includes(selectedLanguage);

    let updatedLanguages = "";
    if (alreadySelected) {
      updatedLanguages = selectedArray
        .filter((l) => l !== selectedLanguage)
        .join(", ");
    } else {
      updatedLanguages = [...selectedArray, selectedLanguage].join(", ");
    }

    setForm((prev) => ({
      ...prev,
      languages_spoken: updatedLanguages,
    }));
  };

  // ===== JSX =====
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


<div className="phone-input-container">
  <div className="phone-input-wrapper">
    <select
      className="phone-dropdown"
      value={form.country_code || "+91"}
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          country_code: e.target.value,
          phone_number: "",
        }))
      }
    >
      <option value="+91">🇮🇳 +91</option>
      <option value="+971">🇦🇪 +971</option>
      <option value="+966">🇸🇦 +966</option>
      <option value="+974">🇶🇦 +974</option>
      <option value="+965">🇰🇼 +965</option>
      <option value="+973">🇧🇭 +973</option>
      <option value="+968">🇴🇲 +968</option>
      <option value="+92">🇵🇰 +92</option>
      <option value="+880">🇧🇩 +880</option>
    </select>

    <input
      name="phone_number"
      type="text"
      value={form.phone_number}
      onChange={(e) => {
        const maxLengths = {
          "+91": 10,
          "+971": 9,
          "+966": 9,
          "+974": 8,
          "+965": 8,
          "+973": 8,
          "+968": 8,
          "+92": 10,
          "+880": 10,
        };
        const currentMax = maxLengths[form.country_code || "+91"];
        const value = e.target.value.replace(/\D/g, "").slice(0, currentMax);
        handleChange({ target: { name: "phone_number", value } });
      }}
      placeholder="Enter phone number"
      required
      className="phone-input-field"
    />
  </div>
</div>



          <label>Password *</label>
          <input
            name="hashed_password"
            type="password"
            value={form.hashed_password}
            onChange={handleChange}
            required
          />
          <label>Photo *</label>
          <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files[0])} required />
        </div>

        {/* === Step 2: Profile & Qualifications === */}
        <div className="full-reg-form-section">
          <h3>Profile & Qualifications</h3>
          <label>Bio *</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} required />
          <label>Years of Experience *</label>
          <input
            name="years_of_experience"
            type="number"
            min="0"
            value={form.years_of_experience}
            onChange={handleChange}
            required
          />

          <h4>Bar Details *</h4>
          {form.bar_details.map((b, i) => (
            <div key={i} className="full-reg-nested">
              <input
                placeholder="Bar License Number"
                value={b.bar_license_number}
                onChange={(e) => handleNestedChange("bar_details", i, "bar_license_number", e.target.value)}
                required
              />
              <input
                placeholder="Bar Association Name"
                value={b.bar_association_name}
                onChange={(e) => handleNestedChange("bar_details", i, "bar_association_name", e.target.value)}
                required
              />
              <label>Enrollment Year *</label>
              <input
                type="date"
                value={b.enrollment_year}
                onChange={(e) =>
                  handleNestedChange("bar_details", i, "enrollment_year", e.target.value)
                }
                required
              />
              <LocationSelector
                onLocationChange={(country, state, city) =>
                  handleBarLocationChange(i, country, state, city)
                }
              />
            
              <button
                type="button"
                onClick={() => removeNestedItem("bar_details", i)}
                className="full-reg-lawreg-remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addNestedItem("bar_details", {
                bar_license_number: "",
                bar_association_name: "",
                enrollment_year: "",
                country: "",
                state: "",
                city: "",
              })
            }
          >
            + Add Bar
          </button>
          <p/>

          <label>Languages Spoken *</label>
          <CustomDropdown
            label=""
            options={languagesList}
            value={form.languages_spoken}
            onChange={handleLanguageSelect}
            placeholder="Select languages"
          />

          <h4>Education *</h4>
          {form.education.map((ed, i) => (
            <div key={i} className="full-reg-nested">
              <input
                placeholder="Degree"
                value={ed.degree}
                onChange={(e) => handleNestedChange("education", i, "degree", e.target.value)}
                required
              />
              <input
                placeholder="College Name"
                value={ed.college_name}
                onChange={(e) => handleNestedChange("education", i, "college_name", e.target.value)}
                required
              />
              <input
                placeholder="Graduation Year"
                value={ed.graduation_year}
                onChange={(e) => handleNestedChange("education", i, "graduation_year", e.target.value)}
                required
              />
              <button type="button" onClick={() => removeNestedItem("education", i)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addNestedItem("education", { degree: "", college_name: "", graduation_year: "" })
            }
          >
            + Add Education
          </button>
        </div>

        {/* === Step 3: Practice Details === */}
        <div className="full-reg-form-section">
          <h3>Practice Details *</h3>
          <PracticeAreaDropdown value={form.practice_area} onChange={handlePracticeChange} />
          <p className="selected-values">Selected: {form.practice_area || "None"}</p>

          <h4>Work Experience *</h4>
          {form.work_experience.map((w, i) => (
            <div key={i} className="full-reg-nested">
              <input
                placeholder="Company Name"
                value={w.company_name}
                onChange={(e) => handleNestedChange("work_experience", i, "company_name", e.target.value)}
                required
              />
              <input
                placeholder="Role"
                value={w.role}
                onChange={(e) => handleNestedChange("work_experience", i, "role", e.target.value)}
                required
              />
              <input
                placeholder="Duration"
                value={w.duration}
                onChange={(e) => handleNestedChange("work_experience", i, "duration", e.target.value)}
                required
              />
              <button type="button" onClick={() => removeNestedItem("work_experience", i)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addNestedItem("work_experience", { company_name: "", role: "", duration: "" })
            }
          >
            + Add Work Experience
          </button>
        </div>

        {/* === Step 4: Address === */}
        <div className="full-reg-form-section">
          <h3>Address Details *</h3>
          {form.address.map((a, i) => (
            <div key={i} className="full-reg-nested">
              <input
                placeholder="Street Address"
                value={a.street_address}
                onChange={(e) => handleNestedChange("address", i, "street_address", e.target.value)}
                required
              />
              <LocationSelector
                onLocationChange={(country, state, city) =>
                  handleAddressLocationChange(i, country, state, city)
                }
              />
                <p/>
              <input
                placeholder="Zip Code"
                value={a.zip_code}
                onChange={(e) => handleNestedChange("address", i, "zip_code", e.target.value)}
                required
              />
              <input
                placeholder="Latitude"
                value={a.latitude}
                onChange={(e) => handleNestedChange("address", i, "latitude", e.target.value)}
                required
              />
              <input
                placeholder="Longitude"
                value={a.longitude}
                onChange={(e) => handleNestedChange("address", i, "longitude", e.target.value)}
                required
              />
              <button type="button" onClick={() => removeNestedItem("address", i)}>
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addNestedItem("address", {
                street_address: "",
                country: "",
                state: "",
                city: "",
                zip_code: "",
                latitude: "",
                longitude: "",
              })
            }
          >
            + Add Address
          </button>
        </div>

        <div className="full-reg-form-actions">
          <button type="submit" className="full-reg-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </div>
      </form>

      {/* ===== Popups ===== */}
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

      {errorPopup && (
        <div className="full-reg-popup-overlay">
          <div className="full-reg-popup-box error">
            <h3>⚠️ Registration Failed</h3>
            <p>{errorPopup}</p>
            <button onClick={() => setErrorPopup("")}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerFullRegistration;
