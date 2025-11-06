import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitStep4 } from "../../Service/Service";
import ErrorPopup from "../../ReusableComponents/ErrorPopUP/ErrorPopUp";
import { countriesData } from "../../ReusableComponents/CountryData/CountryData";

import WorkingHoursPopup from "../../ReusableComponents/WorkingHours/WorkingHours";// ✅ NEW IMPORT

import "./Step4.css";

const Step4 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const lawyer_id =
    (location.state && location.state.lawyer_id) ||
    localStorage.getItem("lawyerId");

  let storedStep4Data = { addresses: [], workingHours: "" };
  try {
    const saved = JSON.parse(localStorage.getItem("step4FormData"));
    if (saved && Array.isArray(saved.addresses)) storedStep4Data = saved;
  } catch {}

  const [addresses, setAddresses] = useState(
    storedStep4Data.addresses.length > 0
      ? storedStep4Data.addresses
      : [
          {
            country: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
          },
        ]
  );

  const [workingHours, setWorkingHours] = useState(
    storedStep4Data.workingHours || ""
  );

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedDays, setSelectedDays] = useState([]);
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("22:00");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    localStorage.setItem(
      "step4FormData",
      JSON.stringify({ addresses, workingHours })
    );
  }, [addresses, workingHours]);

  const addAddress = () => {
    setAddresses([
      ...addresses,
      { country: "", streetAddress: "", city: "", state: "", zipCode: "" },
    ]);
  };

  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };

  const toggleDay = (day) => {
    setSelectedDays(
      selectedDays.includes(day)
        ? selectedDays.filter((d) => d !== day)
        : [...selectedDays, day]
    );
  };

  const handleSaveWorkingHours = () => {
    if (selectedDays.length === 0) {
      setErrorMessage("Select at least one working day");
      return;
    }

    const sortedDays = days.filter((d) => selectedDays.includes(d));
    const dayString =
      sortedDays.length > 1
        ? `${sortedDays[0]}–${sortedDays[sortedDays.length - 1]}`
        : sortedDays[0];

    const formatted = `${dayString} ${formatTime(openTime)} – ${formatTime(
      closeTime
    )}`;

    setWorkingHours(formatted);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let i = 0; i < addresses.length; i++) {
      const addr = addresses[i];

      if (!addr.streetAddress.trim())
        return setErrorMessage(`Address ${i + 1}: Street Address is required`);
      if (!addr.country)
        return setErrorMessage(`Address ${i + 1}: Country is required`);
      if (!addr.state)
        return setErrorMessage(`Address ${i + 1}: State is required`);
      if (!addr.city)
        return setErrorMessage(`Address ${i + 1}: City is required`);
      if (!addr.zipCode.trim())
        return setErrorMessage(`Address ${i + 1}: Zip Code is required`);
    }

    if (!workingHours)
      return setErrorMessage("Working hours selection is required");

    try {
      setLoading(true);

      const formattedAddresses = addresses.map((addr) => ({
        country: addr.country,
        street_address: addr.streetAddress,
        city: addr.city,
        state: addr.state,
        zip_code: addr.zipCode,
      }));

      const payload = {
        lawyer_id,
        address: formattedAddresses,
        working_hours: workingHours,
      };

      await submitStep4(payload);

      navigate("/step5", { state: { lawyer_id } });
    } catch (err) {
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lr-step4-container">
      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />

      <div className="lr-step4-card">
        <div className="lr-step4-header">
          <h2 className="lr-step4-title">Lawyer Registration</h2>
          <p className="lr-step4-subtitle">Step 4 of 6: Office & Service Info</p>
        </div>

        <form className="lr-step4-form" onSubmit={handleSubmit}>
          {addresses.map((addr, index) => (
            <div key={index} className="lr-step4-address-block">
              <label className="lr-step4-label">
                Office Address {index + 1} *
              </label>

              <input
                type="text"
                className="lr-step4-input"
                placeholder="Street Address"
                value={addr.streetAddress}
                onChange={(e) =>
                  handleAddressChange(index, "streetAddress", e.target.value)
                }
              />

              <div className="lr-step4-row">
                {/* Country */}
                <select
                  className="lr-step4-input"
                  value={addr.country}
                  onChange={(e) => {
                    handleAddressChange(index, "country", e.target.value);
                    handleAddressChange(index, "state", "");
                    handleAddressChange(index, "city", "");
                  }}
                >
                  <option value="">Select Country</option>
                  {Object.keys(countriesData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                {/* State */}
                <select
                  className="lr-step4-input"
                  value={addr.state}
                  onChange={(e) => {
                    handleAddressChange(index, "state", e.target.value);
                    handleAddressChange(index, "city", "");
                  }}
                  disabled={!addr.country}
                >
                  <option value="">Select State</option>
                  {addr.country &&
                    Object.keys(countriesData[addr.country]).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>

                {/* City */}
                <select
                  className="lr-step4-input"
                  value={addr.city}
                  onChange={(e) =>
                    handleAddressChange(index, "city", e.target.value)
                  }
                  disabled={!addr.state}
                >
                  <option value="">Select City</option>
                  {addr.country &&
                    addr.state &&
                    countriesData[addr.country][addr.state]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>

              <input
                type="text"
                className="lr-step4-input"
                placeholder="Zip Code"
                value={addr.zipCode}
                onChange={(e) =>
                  handleAddressChange(index, "zipCode", e.target.value)
                }
              />

              {addresses.length > 1 && (
                <button
                  type="button"
                  className="lr-step4-remove-btn"
                  onClick={() => removeAddress(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="lr-step4-add-btn"
            onClick={addAddress}
          >
            + Add Another Address
          </button>

          <div className="lr-step4-section"> 
            <label className="lr-step4-label">Working Hours *</label>
            <div
              className="lr-step4-input lr-step4-workinghours-display"
              onClick={() => setShowModal(true)}
            >
              {workingHours || "Select Working Days & Hours"}
            </div>
          </div>

          <div className="lr-step4-btn-container">
            <button
              type="button"
              className="lr-step4-prev-btn"
              onClick={() => navigate("/step3", { state: { lawyer_id } })}
              disabled={loading}
            >
              Previous
            </button>

            <button type="submit" className="lr-step4-next-btn" disabled={loading}>
              {loading ? "Submitting..." : "Next"}
            </button>
          </div>
        </form>
      </div>

      {/* ✅ Working Hours Popup Component */}
      {showModal && (
        <WorkingHoursPopup
          selectedDays={selectedDays}
          toggleDay={toggleDay}
          openTime={openTime}
          closeTime={closeTime}
          setOpenTime={setOpenTime}
          setCloseTime={setCloseTime}
          handleSaveWorkingHours={handleSaveWorkingHours}
          closePopup={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Step4;
