import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitStep4 } from "../../Service/Service";
import "./Step4.css";

// Simple state → cities mapping (can be expanded)
const indiaStates = {
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati",
    "Kurnool", "Rajahmundry", "Kakinada", "Anantapur", "Chittoor"
  ],
  "Arunachal Pradesh": [
    "Itanagar", "Tawang", "Naharlagun", "Pasighat", "Ziro"
  ],
  "Assam": [
    "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur"
  ],
  "Bihar": [
    "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga",
    "Purnia", "Begusarai", "Arrah", "Katihar", "Munger"
  ],
  "Chhattisgarh": [
    "Raipur", "Bhilai", "Bilaspur", "Korba", "Durg"
  ],
  "Goa": [
    "Panaji", "Margao", "Vasco da Gama", "Mapusa"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar",
    "Jamnagar", "Junagadh", "Anand", "Gandhinagar"
  ],
  "Haryana": [
    "Gurgaon", "Faridabad", "Panipat", "Ambala", "Karnal",
    "Hisar", "Rohtak", "Sonipat", "Panchkula"
  ],
  "Himachal Pradesh": [
    "Shimla", "Dharamshala", "Manali", "Solan", "Mandi"
  ],
  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"
  ],
  "Karnataka": [
    "Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi",
    "Davangere", "Ballari", "Tumakuru", "Shivamogga"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam",
    "Alappuzha", "Palakkad", "Kannur"
  ],
  "Madhya Pradesh": [
    "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain",
    "Sagar", "Satna", "Rewa"
  ],
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Thane",
    "Aurangabad", "Solapur", "Kolhapur", "Amravati"
  ],
  "Manipur": [
    "Imphal", "Thoubal", "Churachandpur"
  ],
  "Meghalaya": [
    "Shillong", "Tura", "Jowai"
  ],
  "Mizoram": [
    "Aizawl", "Lunglei", "Champhai"
  ],
  "Nagaland": [
    "Kohima", "Dimapur", "Mokokchung"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur"
  ],
  "Punjab": [
    "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda",
    "Mohali", "Hoshiarpur"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner",
    "Ajmer", "Alwar", "Sikar"
  ],
  "Sikkim": [
    "Gangtok", "Namchi", "Gyalshing"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
    "Tirunelveli", "Erode", "Vellore", "Thoothukudi"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"
  ],
  "Tripura": [
    "Agartala", "Udaipur", "Dharmanagar"
  ],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj",
    "Ghaziabad", "Noida", "Meerut", "Bareilly", "Aligarh"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Nainital"
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri",
    "Kharagpur", "Haldia"
  ],

  // ✅ Union Territories
  "Andaman and Nicobar Islands": [
    "Port Blair", "Havelock Island", "Car Nicobar"
  ],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman", "Diu", "Silvassa"
  ],
  "Jammu and Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Leh"
  ],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
};

const Step4 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const lawyer_id =
    (location.state && location.state.lawyer_id) ||
    localStorage.getItem("lawyerId");

  // ✅ Safely parse localStorage data
  let storedStep4Data = { addresses: [], workingHours: "" };
  try {
    const saved = JSON.parse(localStorage.getItem("step4FormData"));
    if (saved && Array.isArray(saved.addresses)) {
      storedStep4Data = saved;
    } else {
      storedStep4Data = {
        addresses: [
          {
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
  } catch {
    storedStep4Data = {
      addresses: [
        {
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

  // ✏️ Handle address changes
  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedAddresses = addresses.map((addr) => ({
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
          {Array.isArray(addresses) &&
            addresses.map((addr, index) => (
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
                <hr className="lr-step4-divider" />
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
            <input
              type="text"
              className="lr-step4-input"
              placeholder="Mon–Fri 9AM–6PM"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
            />
            <span className="lr-step4-placeholder">Working Hours</span>
          </div>

          <div className="lr-step4-btn-container">
            <button
              type="button"
              className="lr-step4-prev-btn"
              onClick={() => navigate("/step3", { state: { lawyer_id } })}
            >
              Previous
            </button>
            <button type="submit" className="lr-step4-next-btn">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Step4;