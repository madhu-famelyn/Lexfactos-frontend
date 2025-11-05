import React, { useState } from "react";
import CustomDropdown from "../CustomDropDown";

const countries = {
  India: {
    "Andhra Pradesh": [
      "Visakhapatnam",
      "Vijayawada",
      "Guntur",
      "Nellore",
      "Tirupati",
      "Rajahmundry",
      "Kakinada",
      "Anantapur",
      "Chittoor",
      "Kadapa"
    ],
    "Arunachal Pradesh": [
      "Itanagar",
      "Naharlagun",
      "Tawang",
      "Pasighat",
      "Ziro"
    ],
    Assam: [
      "Guwahati",
      "Dibrugarh",
      "Jorhat",
      "Silchar",
      "Tezpur",
      "Nagaon"
    ],
    Bihar: [
      "Patna",
      "Gaya",
      "Muzaffarpur",
      "Bhagalpur",
      "Purnia",
      "Darbhanga"
    ],
    Chhattisgarh: [
      "Raipur",
      "Bhilai",
      "Bilaspur",
      "Korba",
      "Durg",
      "Rajnandgaon"
    ],
    Goa: ["Panaji", "Margao", "Mapusa", "Ponda"],
    Gujarat: [
      "Ahmedabad",
      "Surat",
      "Vadodara",
      "Rajkot",
      "Bhavnagar",
      "Gandhinagar",
      "Junagadh",
      "Jamnagar"
    ],
    Haryana: [
      "Gurugram",
      "Faridabad",
      "Panipat",
      "Ambala",
      "Hisar",
      "Karnal",
      "Rohtak"
    ],
    "Himachal Pradesh": [
      "Shimla",
      "Dharamshala",
      "Mandi",
      "Solan",
      "Kullu",
      "Manali"
    ],
    Jharkhand: [
      "Ranchi",
      "Jamshedpur",
      "Dhanbad",
      "Bokaro",
      "Hazaribagh"
    ],
    Karnataka: [
      "Bengaluru",
      "Mysuru",
      "Mangalore",
      "Hubli",
      "Belgaum",
      "Davangere",
      "Shimoga"
    ],
    Kerala: [
      "Thiruvananthapuram",
      "Kochi",
      "Kozhikode",
      "Thrissur",
      "Alappuzha",
      "Palakkad"
    ],
    "Madhya Pradesh": [
      "Bhopal",
      "Indore",
      "Gwalior",
      "Jabalpur",
      "Ujjain",
      "Sagar"
    ],
    Maharashtra: [
      "Mumbai",
      "Pune",
      "Nagpur",
      "Nashik",
      "Aurangabad",
      "Solapur",
      "Kolhapur"
    ],
    Manipur: ["Imphal", "Thoubal", "Churachandpur", "Ukhrul"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
    Odisha: [
      "Bhubaneswar",
      "Cuttack",
      "Rourkela",
      "Berhampur",
      "Sambalpur",
      "Balasore"
    ],
    Punjab: [
      "Amritsar",
      "Ludhiana",
      "Jalandhar",
      "Patiala",
      "Bathinda",
      "Mohali"
    ],
    Rajasthan: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Kota",
      "Ajmer",
      "Bikaner",
      "Alwar"
    ],
    Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
    "Tamil Nadu": [
      "Chennai",
      "Coimbatore",
      "Madurai",
      "Tiruchirappalli",
      "Salem",
      "Erode",
      "Tirunelveli",
      "Vellore",
      "Thoothukudi"
    ],
    Telangana: [
      "Hyderabad",
      "Warangal",
      "Nizamabad",
      "Karimnagar",
      "Khammam",
      "Mahbubnagar"
    ],
    Tripura: ["Agartala", "Udaipur", "Kailasahar", "Dharmanagar"],
    "Uttar Pradesh": [
      "Lucknow",
      "Kanpur",
      "Varanasi",
      "Agra",
      "Prayagraj",
      "Noida",
      "Ghaziabad",
      "Meerut",
      "Bareilly"
    ],
    Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Nainital"],
    "West Bengal": [
      "Kolkata",
      "Howrah",
      "Durgapur",
      "Asansol",
      "Siliguri",
      "Kharagpur"
    ],
    "Union Territories": {
      Delhi: ["New Delhi", "Dwarka", "Saket"],
      "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag"],
      Ladakh: ["Leh", "Kargil"],
      Chandigarh: ["Chandigarh City"],
      Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
      "Andaman and Nicobar Islands": ["Port Blair", "Havelock Island"],
      "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"]
    }
  },

  "United Arab Emirates": {
    AbuDhabi: ["Abu Dhabi City", "Al Ain", "Madinat Zayed", "Liwa"],
    Dubai: ["Dubai City", "Deira", "Jumeirah", "Bur Dubai", "Al Barsha"],
    Sharjah: ["Sharjah City", "Khor Fakkan", "Kalba", "Dhaid"],
    Ajman: ["Ajman City", "Masfout"],
    UmmAlQuwain: ["Umm Al Quwain City"],
    RasAlKhaimah: ["Ras Al Khaimah City", "Digdaga", "Al Rams"],
    Fujairah: ["Fujairah City", "Dibba Al-Fujairah", "Masafi"]
  }
};

export default function LocationSelector({ onLocationChange }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const countryList = Object.keys(countries);
  const stateList = selectedCountry ? Object.keys(countries[selectedCountry]) : [];
  const cityList = selectedCountry && selectedState ? countries[selectedCountry][selectedState] : [];

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
    onLocationChange(country, "", "");
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
    onLocationChange(selectedCountry, state, "");
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    onLocationChange(selectedCountry, selectedState, city);
  };

  return (
    <div className="form-group">
   
      <div
        className="location-group"
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {/* Country Dropdown */}
        <CustomDropdown
          options={countryList}
          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder="Select Country"
        />

        {/* State Dropdown (Disabled until country selected) */}
        <CustomDropdown
          options={stateList}
          value={selectedState}
          onChange={handleStateChange}
          placeholder="Select State"
          disabled={!selectedCountry}
        />

        {/* City Dropdown (Disabled until state selected) */}
        <CustomDropdown
          options={cityList}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Select City"
          disabled={!selectedState}
        />
      </div>
    </div>
  );
}
