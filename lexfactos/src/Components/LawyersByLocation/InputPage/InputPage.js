import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./InputPage.css";

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

const indianStates = {
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Tirupati","Kurnool","Rajahmundry","Kadapa","Anantapur", "Chittoor"],
  "Arunachal Pradesh": ["Itanagar","Naharlagun","Pasighat","Tawang","Ziro"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Jorhat","Tezpur"],
  "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga"],
  "Chhattisgarh": ["Raipur","Bhilai","Bilaspur","Korba","Durg"],
  "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar"],
  "Haryana": ["Gurgaon","Faridabad","Panipat","Ambala","Hisar","Karnal"],
  "Himachal Pradesh": ["Shimla","Manali","Dharamshala","Mandi","Solan"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Hazaribagh"],
  "Karnataka": ["Bengaluru","Mysuru","Mangaluru","Hubli","Belagavi","Kalaburagi"],
  "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Alappuzha"],
  "Madhya Pradesh": ["Bhopal","Indore","Jabalpur","Gwalior","Ujjain"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Thane","Aurangabad","Solapur"],
  "Manipur": ["Imphal","Thoubal","Bishnupur","Ukhrul"],
  "Meghalaya": ["Shillong","Tura","Jowai","Nongpoh"],
  "Mizoram": ["Aizawl","Lunglei","Saiha"],
  "Nagaland": ["Kohima","Dimapur","Mokokchung","Tuensang"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Puri","Sambalpur"],
  "Punjab": ["Chandigarh","Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda"],
  "Rajasthan": ["Jaipur","Jodhpur","Udaipur","Kota","Ajmer","Bikaner"],
  "Sikkim": ["Gangtok","Namchi","Gyalshing","Mangan"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Khammam","Karimnagar"],
  "Tripura": ["Agartala","Dharmanagar","Udaipur"],
  "Uttar Pradesh": ["Lucknow","Kanpur","Varanasi","Agra","Prayagraj","Ghaziabad","Meerut","Noida"],
  "Uttarakhand": ["Dehradun","Haridwar","Rishikesh","Haldwani","Nainital"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Kharagpur","Haldia"],
  "Andaman and Nicobar Islands": ["Port Blair","Havelock Island","Car Nicobar"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman","Diu","Silvassa"],
  "Delhi": ["New Delhi"],
  "Jammu and Kashmir": ["Srinagar","Jammu","Anantnag","Baramulla","Leh"],
  "Ladakh": ["Leh","Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Puducherry": ["Puducherry","Karaikal","Mahe","Yanam"]
};

export default function InputPage() {
  const [selectedPractice, setSelectedPractice] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigate = useNavigate();

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => setSelectedCity(e.target.value);
  const handlePracticeChange = (e) => setSelectedPractice(e.target.value);

  const handleSearch = () => {
    // Send both city and state to results page
    navigate(
      `/lawyers/search?practice_area=${encodeURIComponent(selectedPractice)}&city=${encodeURIComponent(selectedCity)}&state=${encodeURIComponent(selectedState)}`
    );
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Find a Lawyer You Can Trust</h1>
        <p>Search by legal specialty and location to connect with experienced professionals.</p>
      </div>

      <div className="search-bar-container">
        <select className="search-select" value={selectedPractice} onChange={handlePracticeChange}>
          <option value="">Practice Area</option>
          {allPracticeAreas.map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>

        <select className="search-select" value={selectedState} onChange={handleStateChange}>
          <option value="">State</option>
          {Object.keys(indianStates).map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select className="search-select" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">City / Area</option>
          {selectedState && indianStates[selectedState].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <button className="search-button" onClick={handleSearch}>
          <span className="search-icon">🔍</span> Search
        </button>
      </div>
    </div>
  );
}
