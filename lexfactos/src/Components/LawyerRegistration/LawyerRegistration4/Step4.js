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

  const storedStep4Data = JSON.parse(localStorage.getItem("step4FormData")) || {
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    calendlyLink: "",
    workingHours: "",
    latitude: "",
    longitude: "",
  };

  const [streetAddress, setStreetAddress] = useState(storedStep4Data.streetAddress);
  const [city, setCity] = useState(storedStep4Data.city);
  const [state, setState] = useState(storedStep4Data.state);
  const [zipCode, setZipCode] = useState(storedStep4Data.zipCode);
  const [calendlyLink, setCalendlyLink] = useState(storedStep4Data.calendlyLink);
  const [workingHours, setWorkingHours] = useState(storedStep4Data.workingHours);
  const [latitude, setLatitude] = useState(storedStep4Data.latitude);
  const [longitude, setLongitude] = useState(storedStep4Data.longitude);

  useEffect(() => {
    const saveData = {
      streetAddress,
      city,
      state,
      zipCode,
      calendlyLink,
      workingHours,
      latitude,
      longitude,
    };
    localStorage.setItem("step4FormData", JSON.stringify(saveData));
  }, [streetAddress, city, state, zipCode, calendlyLink, workingHours, latitude, longitude]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        lawyer_id,
        street_address: streetAddress,
        city,
        state,
        zip_code: zipCode,
        calendly_link: calendlyLink,
        working_hours: workingHours,
        latitude,
        longitude,
      };

      const result = await submitStep4(payload);
      console.log("Step 4 saved:", result);

      navigate("/step5", { state: { lawyer_id } });
    } catch (err) {
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
          <div className="lr-step4-section">
            <label className="lr-step4-label">Office Address *</label>
            <input
              type="text"
              className="lr-step4-input"
              placeholder="123 Main Street, Suite 100"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>

          <div className="lr-step4-row">
            {/* State Dropdown */}
            <div className="lr-step4-input-box">
              <select
                className="lr-step4-input"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity(""); // reset city when state changes
                }}
              >
                <option value="">Select State</option>
                {Object.keys(indiaStates).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              <span className="lr-step4-placeholder">State</span>
            </div>

            {/* City Dropdown */}
            <div className="lr-step4-input-box">
              <select
                className="lr-step4-input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!state}
              >
                <option value="">Select City</option>
                {state &&
                  indiaStates[state]?.map((ct) => (
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
                placeholder="90210"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
              <span className="lr-step4-placeholder">Zip Code</span>
            </div>
            <div className="lr-step4-input-box">
              <input
                type="text"
                className="lr-step4-input"
                placeholder="Calendly link"
                value={calendlyLink}
                onChange={(e) => setCalendlyLink(e.target.value)}
              />
              <span className="lr-step4-placeholder">Calendly Link *</span>
            </div>
          </div>

          <div className="lr-step4-section">
            <input
              type="text"
              className="lr-step4-input"
              placeholder="Mon-Fri 9AM–6PM"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
            />
            <span className="lr-step4-placeholder">Working Hours</span>
          </div>

          <div className="lr-step4-row">
            <div className="lr-step4-input-box">
              <input
                type="text"
                className="lr-step4-input"
                placeholder="Latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
              <span className="lr-step4-placeholder">Latitude *</span>
            </div>
            <div className="lr-step4-input-box">
              <input
                type="text"
                className="lr-step4-input"
                placeholder="Longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
              <span className="lr-step4-placeholder">Longitude *</span>
            </div>
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