import React, { useState } from "react";
import { countriesData } from "../../ReusableComponents/CountryData/CountryData";
import WorkingHoursPopup from "../../ReusableComponents/WorkingHours/WorkingHours";
import "./Section5.css";

export default function SectionReg5({
  formData,
  handleNestedChange,
  handleListChange,
  addListItem,
  removeListItem,
}) {
  const reg5 = formData.reg5 || { address: [], working_hours: "" };

  // ---------- 🕒 Working Hours Popup ----------
  const [showPopup, setShowPopup] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSaveWorkingHours = () => {
    if (selectedDays.length === 0 || !openTime || !closeTime) {
      alert("Please select days and both open/close times.");
      return;
    }

    const formatted = `${selectedDays.join(", ")}: ${openTime}–${closeTime}`;
    handleNestedChange("reg5", "working_hours", formatted);
    setShowPopup(false);
  };

  return (
    <div className="lu-section">
      <h3 className="lu-section-title">Office Locations & Working Hours</h3>

      {/* ============ ADDRESS LIST ============ */}
      {reg5.address.map((addr, index) => {
        const states = addr.country ? Object.keys(countriesData[addr.country] || {}) : [];
        const cities =
          addr.country && addr.state ? countriesData[addr.country][addr.state] || [] : [];

        return (
          <div key={index} className="lu-repeat-block">
            <span className="lu-badge">Office #{index + 1}</span>

            <div className="lu-grid">
              {/* Country Dropdown */}
              <div className="lu-field">
                <label>Country *</label>
                <select
                  value={addr.country || ""}
                  onChange={(e) =>
                    handleListChange("reg5", "address", index, "country", e.target.value)
                  }
                >
                  <option value="">Select Country</option>
                  {Object.keys(countriesData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Dropdown */}
              <div className="lu-field">
                <label>State *</label>
                <select
                  value={addr.state || ""}
                  onChange={(e) =>
                    handleListChange("reg5", "address", index, "state", e.target.value)
                  }
                  disabled={!addr.country}
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Dropdown */}
              <div className="lu-field">
                <label>City *</label>
                <select
                  value={addr.city || ""}
                  onChange={(e) =>
                    handleListChange("reg5", "address", index, "city", e.target.value)
                  }
                  disabled={!addr.state}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address Line & ZIP */}
            <div className="lu-grid">
              <div className="lu-field">
                <label>Street Address *</label>
                <input
                  type="text"
                  placeholder="Street / Building Name"
                  value={addr.street_address}
                  onChange={(e) =>
                    handleListChange("reg5", "address", index, "street_address", e.target.value)
                  }
                />
              </div>

              <div className="lu-field">
                <label>Zip / Pin Code *</label>
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={addr.zip_code}
                  onChange={(e) =>
                    handleListChange("reg5", "address", index, "zip_code", e.target.value)
                  }
                />
              </div>
            </div>

            <button
              type="button"
              className="lu-remove-btn"
              onClick={() => removeListItem("reg5", "address", index)}
            >
              Remove Address
            </button>
          </div>
        );
      })}

      {/* Add Address Button */}
      <button
        type="button"
        className="lu-add-btn"
        onClick={() =>
          addListItem("reg5", "address", {
            country: "",
            state: "",
            city: "",
            street_address: "",
            zip_code: "",
          })
        }
      >
        + Add Another Office Address
      </button>

      {/* ---------- 🕒 Working Hours Section ---------- */}
      <div className="lu-field" style={{ marginTop: "1.5rem" }}>
        <label>Working Hours *</label>
        <div className="working-hours-input">
          <input
            type="text"
            value={reg5.working_hours || ""}
            readOnly
            placeholder="Select your working hours"
            onClick={() => setShowPopup(true)}
          />
       
        </div>
      </div>

      {/* ---------- Popup ---------- */}
      {showPopup && (
        <WorkingHoursPopup
          selectedDays={selectedDays}
          toggleDay={toggleDay}
          openTime={openTime}
          closeTime={closeTime}
          setOpenTime={setOpenTime}
          setCloseTime={setCloseTime}
          handleSaveWorkingHours={handleSaveWorkingHours}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
