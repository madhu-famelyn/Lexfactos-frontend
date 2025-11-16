import React, { useState } from "react";
import axios from "axios";
import "./LawyerFullRegistration.css";
import PracticeAreaDropdown from "../../ReusableComponents/PracticeArea/PracticeArea";
import LocationSelector from "../../ReusableComponents/CustomDropDown/LocationSelector/Locations";

const LawyerFullRegistration = () => {
  const initialNested = (fields) =>
    fields.reduce((acc, key) => ({ ...acc, [key]: "" }), {});

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    unique_id: "",
    hashed_password: "",
    bio: "",
    years_of_experience: "",
    bar_details: [
      initialNested([
        "bar_license_number",
        "bar_association_name",
        "enrollment_year",
        "country",
        "state",
        "city",
      ]),
    ],
    languages_spoken: "",
    education: [initialNested(["degree", "college_name", "graduation_year"])],
    practice_area: "",
    work_experience: [initialNested(["company_name", "role", "duration"])],
    address: [
      initialNested([
        "street_address",
        "country",
        "state",
        "city",
        "zip_code",
      ]),
    ],
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNested = (field, i, key, value) => {
    const update = [...form[field]];
    update[i][key] = value;
    setForm({ ...form, [field]: update });
  };

  const addNested = (field) => {
    setForm({ ...form, [field]: [...form[field], { ...form[field][0] }] });
  };

  const removeNested = (field, i) => {
    const update = form[field].filter((_, idx) => idx !== i);
    setForm({
      ...form,
      [field]: update.length
        ? update
        : [initialNested(Object.keys(form[field][0]))],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup({ type: "", message: "" });

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) fd.append(key, JSON.stringify(value));
      else fd.append(key, value);
    });

    if (photoFile) fd.append("photo", photoFile);

    try {
      await axios.post("https://api.lexfactos.com/lawyer/full/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPopup({ type: "success", message: "✅ Registration Successful!" });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.detail || "Something went wrong";
      if (msg.toLowerCase().includes("unique")) {
        setPopup({
          type: "error",
          message: "⚠️ Unique ID already exists. Please choose another!",
        });
      } else if (
        msg.toLowerCase().includes("email") ||
        msg.toLowerCase().includes("phone")
      ) {
        setPopup({
          type: "error",
          message: "⚠️ Email or Phone already exists!",
        });
      } else {
        setPopup({ type: "error", message: msg });
      }
    }
  };

  return (
    <div className="lfr-container">
      <h2 className="lfr-title">Lawyer Registration</h2>

      <form onSubmit={handleSubmit} className="lfr-form">
        {/* BASIC DETAILS */}
        <section className="lfr-section">
          <h3 className="lfr-section-title">Basic Info</h3>
          <input
            placeholder="Full Name *"
            name="full_name"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Unique ID (username) *"
            name="unique_id"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email *"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Phone Number *"
            name="phone_number"
            type="text"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password *"
            name="hashed_password"
            type="password"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            required
          />
        </section>

        {/* PROFILE */}
        <section className="lfr-section">
          <h3 className="lfr-section-title">Profile</h3>
          <textarea
            placeholder="Bio *"
            name="bio"
            onChange={handleChange}
            required
          />
          <input
            placeholder="Years of Experience *"
            name="years_of_experience"
            type="number"
            onChange={handleChange}
            required
          />
        </section>

        {/* BAR DETAILS */}
        <section className="lfr-section">
          <h3 className="lfr-section-title">Bar Details</h3>
          {form.bar_details.map((b, i) => (
            <div key={i} className="lfr-nested-box">
              <input
                placeholder="License Number"
                onChange={(e) =>
                  handleNested("bar_details", i, "bar_license_number", e.target.value)
                }
                required
              />
              <input
                placeholder="Association Name"
                onChange={(e) =>
                  handleNested("bar_details", i, "bar_association_name", e.target.value)
                }
                required
              />
              <input
                type="date"
                onChange={(e) =>
                  handleNested("bar_details", i, "enrollment_year", e.target.value)
                }
                required
              />
              <LocationSelector
                onLocationChange={(c, s, ci) => {
                  handleNested("bar_details", i, "country", c);
                  handleNested("bar_details", i, "state", s);
                  handleNested("bar_details", i, "city", ci);
                }}
              />
              <button
                type="button"
                onClick={() => removeNested("bar_details", i)}
                className="lfr-remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNested("bar_details")}
            className="lfr-add-btn"
          >
            + Add Bar
          </button>
        </section>

        {/* PRACTICE AREAS */}
        <section className="lfr-section">
          <h3 className="lfr-section-title">Practice Area</h3>
          <PracticeAreaDropdown
            value={form.practice_area}
            onChange={(v) => setForm({ ...form, practice_area: v })}
          />
        </section>

        {/* ADDRESS */}
        <section className="lfr-section">
          <h3 className="lfr-section-title">Address</h3>
          {form.address.map((a, i) => (
            <div key={i} className="lfr-nested-box">
              <input
                placeholder="Street Address"
                onChange={(e) =>
                  handleNested("address", i, "street_address", e.target.value)
                }
                required
              />
              <LocationSelector
                onLocationChange={(c, s, ci) => {
                  handleNested("address", i, "country", c);
                  handleNested("address", i, "state", s);
                  handleNested("address", i, "city", ci);
                }}
              />
              <input
                placeholder="Zip Code"
                onChange={(e) =>
                  handleNested("address", i, "zip_code", e.target.value)
                }
                required
              />
              <button
                type="button"
                onClick={() => removeNested("address", i)}
                className="lfr-remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNested("address")}
            className="lfr-add-btn"
          >
            + Add Address
          </button>
        </section>

        <button
          type="submit"
          disabled={loading}
          className="lfr-submit-btn"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {popup.message && (
        <div className="lfr-popup-overlay">
          <div className={`lfr-popup-box ${popup.type}`}>
            <h3>{popup.message}</h3>
            <button
              onClick={() => setPopup({ type: "", message: "" })}
              className="lfr-popup-close"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerFullRegistration;
