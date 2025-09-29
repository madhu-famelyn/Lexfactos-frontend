import React, { useState } from "react";
import "./Hero.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ✅ All Practice Areas
const allPracticeAreas = [
  "Administrative Law", "Admiralty & Maritime Law", "Alternative Dispute Resolution",
  "Animal Law", "Antitrust Law", "Appellate Law", "Arbitration & Mediation",
  "Aviation & Aerospace Law", "Banking & Finance Law", "Bankruptcy", "Civil Litigation",
  "Civil Rights", "Commercial Law", "Communications & Media Law", "Constitutional & Human Rights Law",
  "Construction Law", "Consumer Protection Law", "Contract Law", "Corporate & Commercial Law",
  "Criminal Defense", "Criminal Law", "Cybersecurity & Data Protection", "Elder Law",
  "Election & Political Law", "Employment Law", "Energy Law", "Entertainment & Sports Law",
  "Environmental Law", "Estate Planning", "Family Law", "Franchise Law", "Government Contracts",
  "Health Care Law", "Immigration", "Insurance Law", "Intellectual Property", "International Law",
  "Juvenile Law", "Labour & Employment Law", "Land Use & Zoning Law", "Legal Malpractice",
  "Medical Malpractice", "Military Law", "Nonprofit & Charities Law", "Patent Law", "Personal Injury",
  "Privacy & Data Security", "Product Liability", "Professional Responsibility", "Property & Real Estate Law",
  "Public Interest Law", "Securities Law", "Social Security Law", "Tax Law", "Technology Law",
  "Torts", "Trade Law", "Transportation Law", "Trusts & Estates", "Workers' Compensation"
];

// ✅ States + Cities
const indiaStates = {
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Tirupati","Kurnool","Rajahmundry","Kakinada","Anantapur", "Chittoor"],
  "Arunachal Pradesh": ["Itanagar","Tawang","Naharlagun","Pasighat","Ziro"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Jorhat","Tezpur"],
  "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga","Purnia","Begusarai","Arrah","Katihar","Munger"],
  "Chhattisgarh": ["Raipur","Bhilai","Bilaspur","Korba","Durg"],
  "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Junagadh","Anand","Gandhinagar"],
  "Haryana": ["Gurgaon","Faridabad","Panipat","Ambala","Karnal","Hisar","Rohtak","Sonipat","Panchkula"],
  "Himachal Pradesh": ["Shimla","Dharamshala","Manali","Solan","Mandi"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Hazaribagh"],
  "Karnataka": ["Bengaluru","Mysuru","Mangaluru","Hubli","Belagavi","Davangere","Ballari","Tumakuru","Shivamogga"],
  "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Alappuzha","Palakkad","Kannur"],
  "Madhya Pradesh": ["Bhopal","Indore","Gwalior","Jabalpur","Ujjain","Sagar","Satna","Rewa"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Thane","Aurangabad","Solapur","Kolhapur","Amravati"],
  "Manipur": ["Imphal","Thoubal","Churachandpur"],
  "Meghalaya": ["Shillong","Tura","Jowai"],
  "Mizoram": ["Aizawl","Lunglei","Champhai"],
  "Nagaland": ["Kohima","Dimapur","Mokokchung"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur"],
  "Punjab": ["Amritsar","Ludhiana","Jalandhar","Patiala","Bathinda","Mohali","Hoshiarpur"],
  "Rajasthan": ["Jaipur","Jodhpur","Udaipur","Kota","Bikaner","Ajmer","Alwar","Sikar"],
  "Sikkim": ["Gangtok","Namchi","Gyalshing"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Erode","Vellore","Thoothukudi"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam"],
  "Tripura": ["Agartala","Udaipur","Dharmanagar"],
  "Uttar Pradesh": ["Lucknow","Kanpur","Varanasi","Agra","Prayagraj","Ghaziabad","Noida","Meerut","Bareilly","Aligarh"],
  "Uttarakhand": ["Dehradun","Haridwar","Rishikesh","Haldwani","Nainital"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Kharagpur","Haldia"],
  "Andaman and Nicobar Islands": ["Port Blair","Havelock Island","Car Nicobar"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman","Diu","Silvassa"],
  "Jammu and Kashmir": ["Srinagar","Jammu","Anantnag","Baramulla","Leh"],
  "Ladakh": ["Leh","Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Puducherry": ["Puducherry","Karaikal","Mahe","Yanam"]
};

const LandingPage = () => {
  const [selectedPractice, setSelectedPractice] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  // ✅ handleSearch function like reference
  const handleSearch = () => {
    navigate(
      `/lawyers/search?practice_area=${encodeURIComponent(selectedPractice)}&city=${encodeURIComponent(selectedCity)}&state=${encodeURIComponent(selectedState)}`
    );
  };

  return (
    <div className="landing-container">
      {/* Trusted Badge */}
      <div className="trusted-badge">
        <span className="green-dot"></span>
        Trusted by 25,000+ users worldwide
      </div>

      {/* Title */}
      <h1 className="landing-title">
        <span className="title-dark">Legal expertise,</span>
        <br />
        <span className="title-gradient">simplified</span>
      </h1>

      {/* Subtitle */}
      <p className="landing-subtitle">
        Connect with verified legal professionals who understand your needs.
        Get expert advice, transparent pricing, and results you can trust.
      </p>

      {/* Search Box */}
      <div className="search-box">
        <div className="input-group">
          <FaSearch className="search-icon" />
          <select
            className="search-input"
            value={selectedPractice}
            onChange={(e) => setSelectedPractice(e.target.value)}
          >
            <option value="">Select Practice Area</option>
            {allPracticeAreas.map((area, index) => (
              <option key={index} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* State Dropdown */}
        <select
          className="location-dropdown"
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            setSelectedCity("");
          }}
        >
          <option value="">Select State</option>
          {Object.keys(indiaStates).map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* City Dropdown */}
        <select
          className="location-dropdown"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {selectedState &&
            indiaStates[selectedState].map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
        </select>

        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Bottom Stats */}
      <div className="bottom-stats">
        <div>
          <span className="green-dot"></span>
          5,000+ verified lawyers
        </div>
        <div>
          <span className="blue-dot"></span>
          Average response: 2 hours
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
