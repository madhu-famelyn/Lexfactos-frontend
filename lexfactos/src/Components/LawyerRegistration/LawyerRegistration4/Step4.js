import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitStep4 } from "../../Service/Service";
import "./Step4.css";

const countries = ["India", "AE"];

const indiaStates = {
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati",
    "Kurnool", "Rajahmundry", "Kakinada", "Anantapur", "Chittoor",
  ],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Naharlagun", "Pasighat", "Ziro"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Leh"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  

 "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "Goa": ["Panaji", "Margao", "Mapusa", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangalore"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Manipur": ["Imphal", "Thoubal", "Churachandpur", "Ukhrul"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
  "Sikkim": ["Gangtok", "Namchi", "Geyzing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
  "Andaman and Nicobar Islands": ["Port Blair", "Havelock Island", "Neil Island"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
  "Delhi": ["New Delhi", "Dwarka", "Rohini", "Karol Bagh"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti", "Minicoy", "Agatti"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
};

const Step4 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const lawyer_id =
    (location.state && location.state.lawyer_id) ||
    localStorage.getItem("lawyerId");

  // ✅ Safe localStorage load
  let storedStep4Data = { addresses: [], workingHours: "" };
  try {
    const saved = JSON.parse(localStorage.getItem("step4FormData"));
    if (saved && Array.isArray(saved.addresses)) storedStep4Data = saved;
    else throw new Error();
  } catch {
    storedStep4Data = {
      addresses: [
        {
          country: "",
          streetAddress: "",
          city: "",
          state: "",
          zipCode: "",
          latitude: "",
          longitude: "",
        },
      ],
      workingHours: "",
    };
  }

  const [addresses, setAddresses] = useState(storedStep4Data.addresses);
  const [workingHours, setWorkingHours] = useState(storedStep4Data.workingHours);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const [selectedDays, setSelectedDays] = useState([]);
  const [openTime, setOpenTime] = useState("09:00");
  const [closeTime, setCloseTime] = useState("22:00");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // 🧠 Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "step4FormData",
      JSON.stringify({ addresses, workingHours })
    );
  }, [addresses, workingHours]);

  // ➕ Add new address
  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        country: "",
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        latitude: "",
        longitude: "",
      },
    ]);
  };

  // 🗑️ Remove address
  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  // ✏️ Handle address change
  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  // 🕒 Convert 24hr → 12hr format
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${minute} ${ampm}`;
  };

  // 🧩 Toggle day selection
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // 💾 Save working hours
  const handleSaveWorkingHours = () => {
    if (selectedDays.length === 0) {
      alert("Please select at least one day.");
      return;
    }

    // Group consecutive days (e.g., Mon–Fri)
    const sortedDays = days.filter((d) => selectedDays.includes(d));
    const dayString =
      sortedDays.length > 1
        ? `${sortedDays[0]}–${sortedDays[sortedDays.length - 1]}`
        : sortedDays[0];

    const formatted = `${dayString} ${formatTime(openTime)} – ${formatTime(closeTime)}`;
    setWorkingHours(formatted);
    setShowModal(false);
  };

  // 🚀 Submit to backend
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true); // start loader

    const formattedAddresses = addresses.map((addr) => ({
      country: addr.country,
      street_address: addr.streetAddress,
      city: addr.city,
      state: addr.state,
      zip_code: addr.zipCode,
      latitude: addr.latitude,
      longitude: addr.longitude,
    }));

    const payload = {
      lawyer_id,
      address: formattedAddresses,
      working_hours: workingHours,
    };

    const result = await submitStep4(payload);
    console.log("Step 4 saved:", result);

    navigate("/step5", { state: { lawyer_id } });
  } catch (err) {
    console.error(err);
    alert("Error saving step 4, please try again.");
  } finally {
    setLoading(false); // stop loader
  }
};


  return (
    <div className="lr-step4-container">
      <div className="lr-step4-card">
        <div className="lr-step4-header">
          <h2 className="lr-step4-title">Lawyer Registration</h2>
          <p className="lr-step4-subtitle">Step 4 of 6: Office & Service Info</p>
        </div>

        <div className="lr-step4-progress">
          <div className="lr-step4-progress-bar"></div>
          <span className="lr-step4-progress-text">44% Complete</span>
        </div>

        <form className="lr-step4-form" onSubmit={handleSubmit}>
          {addresses.map((addr, index) => (
            <div key={index} className="lr-step4-address-block">
              <div className="lr-step4-section">
                <label className="lr-step4-label">
                  Office Address {index + 1} *
                </label>
                <input
                  type="text"
                  className="lr-step4-input"
                  placeholder="123 Main Street, Suite 100"
                  value={addr.streetAddress}
                  onChange={(e) =>
                    handleAddressChange(index, "streetAddress", e.target.value)
                  }
                />
              </div>
              <p/>

              {/* 🌍 Country Field */}
              <div className="lr-step4-row">
                <div className="lr-step4-input-box">
                  <select
                    className="lr-step4-input"
                    value={addr.country}
                    onChange={(e) =>
                      handleAddressChange(index, "country", e.target.value)
                    }
                  >
                    <option value="">Select Country</option>
                    {countries.map((ct) => (
                      <option key={ct} value={ct}>
                        {ct}
                      </option>
                    ))}
                  </select>
                  <span className="lr-step4-placeholder">Country</span>
                </div>
              </div>
              <p/>

              <div className="lr-step4-row">
                <div className="lr-step4-input-box">
                  <select
                    className="lr-step4-input"
                    value={addr.state}
                    onChange={(e) => {
                      handleAddressChange(index, "state", e.target.value);
                      handleAddressChange(index, "city", "");
                    }}
                  >
                    <option value="">Select State</option>
                    {Object.keys(indiaStates || {}).map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <span className="lr-step4-placeholder">State</span>
                </div>

                <div className="lr-step4-input-box">
                  <select
                    className="lr-step4-input"
                    value={addr.city}
                    onChange={(e) =>
                      handleAddressChange(index, "city", e.target.value)
                    }
                    disabled={!addr.state}
                  >
                    <option value="">Select City</option>
                    {addr.state &&
                      indiaStates[addr.state]?.map((ct) => (
                        <option key={ct} value={ct}>
                          {ct}
                        </option>
                      ))}
                  </select>
                  <span className="lr-step4-placeholder">City</span>
                </div>
              </div>
              <p/>

              <div className="lr-step4-row">
  <div className="lr-step4-input-box">
    <input
      type="text"
      className="lr-step4-input"
      placeholder="Zip Code"
      value={addr.zipCode}
      onChange={(e) =>
        handleAddressChange(index, "zipCode", e.target.value)
      }
      style={{ width: "80%" }} // ✅ Inline width
    />
    <span className="lr-step4-placeholder">Zip Code</span>
  </div>

  <div className="lr-step4-input-box">
    <input
      type="text"
      className="lr-step4-input"
      placeholder="Latitude"
      value={addr.latitude}
      onChange={(e) =>
        handleAddressChange(index, "latitude", e.target.value)
      }
      style={{ width: "80%" }} // ✅ Inline width
    />
    <span className="lr-step4-placeholder">Latitude</span>
  </div>

  <div className="lr-step4-input-box">
    <input
      type="text"
      className="lr-step4-input"
      placeholder="Longitude"
      value={addr.longitude}
      onChange={(e) =>
        handleAddressChange(index, "longitude", e.target.value)
      }
      style={{ width: "80%" }} // ✅ Inline width
    />
    <span className="lr-step4-placeholder">Longitude</span>
  </div>
</div>


              {addresses.length > 1 && (
                <button
                  type="button"
                  className="lr-step4-remove-btn"
                  onClick={() => removeAddress(index)}
                >
                  Remove Address
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

          {/* Working Hours Section */}
          <div className="lr-step4-section">
            <label className="lr-step4-label">Working Hours</label>
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

  <button
    type="submit"
    className="lr-step4-next-btn"
    disabled={loading}
  >
    {loading ? "Submitting..." : "Next"}
  </button>
</div>

        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="working-hours-overlay">
          <div className="working-hours-popup">
            <h3>Choose Days and Hours</h3>

            <div className="days-selector">
              {days.map((day) => (
                <button
                  key={day}
                  className={`day-btn ${selectedDays.includes(day) ? "active" : ""}`}
                  onClick={() => toggleDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="time-inputs">
              <input
                type="time"
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
              />
              <span>–</span>
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
              />
            </div>

            <div className="popup-actions">
              <button className="save-btn" onClick={handleSaveWorkingHours}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step4;

