import React, { useState, useEffect } from "react";
import "./Step2.css";
import { useLocation, useNavigate } from "react-router-dom";
import { createLawyerProfile } from "../../Service/Service";




const countriesData = {
  India: {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Chittoor"],
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
  },

  UAE: {
    "Abu Dhabi": ["Abu Dhabi City", "Al Ain", "Madinat Zayed", "Baniyas"],
    "Dubai": ["Dubai City", "Deira", "Jumeirah", "Bur Dubai", "Jebel Ali"],
    "Sharjah": ["Sharjah City", "Khor Fakkan", "Kalba", "Dibba Al Hisn"],
    "Ajman": ["Ajman City", "Masfout"],
    "Umm Al Quwain": ["Umm Al Quwain City", "Falaj Al Mualla"],
    "Ras Al Khaimah": ["Ras Al Khaimah City", "Digdaga", "Al Jazirah Al Hamra"],
    "Fujairah": ["Fujairah City", "Dibba Al Fujairah", "Masafi"]
  }
};



const LawyerRegistrationStep2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const storedId = localStorage.getItem("lawyerId");
  const { lawyerId: idFromState } = location.state || {};
  const lawyerId = idFromState || storedId;

  useEffect(() => {
    if (idFromState) localStorage.setItem("lawyerId", idFromState);
  }, [idFromState]);

  const safeParse = (key, fallback) => {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value !== null && value !== undefined ? value : fallback;
    } catch {
      return fallback;
    }
  };

  const storedData = safeParse("lawyerStep2Data", {
    bio: "",
    yearsOfExperience: "",
    barDetails: [
      { bar_license_number: "", bar_association_name: "", state: "", city: "" },
    ],
    educationList: [{ degree: "", college_name: "", graduation_year: "" }],
    languages: [],
  });

    const allLanguages = [
    // 🇮🇳 Indian Languages
    "Hindi", "English", "Bengali", "Telugu", "Marathi", "Tamil", "Gujarati",
    "Urdu", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", "Maithili",
    "Santali", "Kashmiri", "Konkani", "Manipuri", "Sindhi", "Dogri", "Bodo",
    "Sanskrit",

    // 🇦🇪 UAE / Middle Eastern Languages
    "Arabic", "English (UAE)", "Hindi (UAE)", "Urdu (UAE)", "Malayalam (UAE)",
    "Tamil (UAE)", "Tagalog", "Persian (Farsi)", "Pashto", "Balochi",
    "Bengali (UAE)", "Sinhalese", "Nepali"
  ];


  const [bio, setBio] = useState(storedData.bio || "");
  const [yearsOfExperience, setYearsOfExperience] = useState(
    storedData.yearsOfExperience || ""
  );
  const [barDetails, setBarDetails] = useState(storedData.barDetails);
  const [educationList, setEducationList] = useState(storedData.educationList);
  const [languages, setLanguages] = useState(storedData.languages);

  useEffect(() => {
    const step2Data = {
      bio,
      yearsOfExperience,
      barDetails,
      educationList,
      languages,
    };
    localStorage.setItem("lawyerStep2Data", JSON.stringify(step2Data));
  }, [bio, yearsOfExperience, barDetails, educationList, languages]);

  const addEducation = () => {
    setEducationList([
      ...educationList,
      { degree: "", college_name: "", graduation_year: "" },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...educationList];
    updated[index][field] = value;
    setEducationList(updated);
  };

  const addBarDetail = () => {
    setBarDetails([
      ...barDetails,
      { bar_license_number: "", bar_association_name: "", state: "", city: "" },
    ]);
  };

  const handleBarDetailChange = (index, field, value) => {
    const updated = [...barDetails];
    updated[index][field] = value;

    if (field === "state") {
      updated[index].city = "";
    }
    setBarDetails(updated);
  };

  const toggleLanguage = (lang) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSubmit = async () => {
    if (!lawyerId) {
      alert("Lawyer ID missing. Please complete Step 1 first.");
      return;
    }

    const profileData = {
      lawyer_id: lawyerId,
      bio,
      years_of_experience: parseInt(yearsOfExperience, 10) || 0,
      bar_details: barDetails,
      languages_spoken: languages.join(", "),
      education: educationList.map((edu) => ({
        degree: edu.degree,
        college_name: edu.college_name,
        graduation_year: parseInt(edu.graduation_year, 10) || 0,
      })),
    };

    try {
      const res = await createLawyerProfile(profileData);
      const profileId = res.id || res.lawyer_profile_id;

      if (profileId) {
        localStorage.setItem("lawyerProfileId", profileId);
        navigate("/step3", { state: { lawyerProfileId: profileId } });
      } else {
        alert("Profile created but ID missing");
      }
    } catch (err) {
      alert(err.detail || "Profile creation failed");
    }



  };
  const visibleLanguages = showAll ? allLanguages : allLanguages.slice(0, 10);

  return (
    <div className="lr-step2-container">
      <div className="lr-step2-card">
        <h2 className="lr-step2-title">Lawyer Registration</h2>
        <p className="lr-step2-subtitle">Step 2 of 6: Professional Summary</p>

        <div className="lr-step2-progress">
          <div className="lr-step2-progress-bar" style={{ width: "22%" }}></div>
          <span className="lr-step2-progress-text">22% Complete</span>
        </div>

        <label className="lr-step2-label">Short Bio *</label>
        <textarea
          className="lr-step2-textarea"
          placeholder="Tell potential clients about yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>

        <label className="lr-step2-label">Years of Experience *</label>
            <input
              type="number"
              className="lr-step2-input"
              placeholder="e.g. 5"
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              min="0"
            />


        <div className="lr-step2-section">
          <label className="lr-step2-label">Bar Details</label>
          {barDetails.map((bar, index) => (
            <div key={index} className="lr-step2-row">
              <input
                type="text"
                className="lr-step2-input"
                placeholder="Bar License Number"
                value={bar.bar_license_number}
                onChange={(e) =>
                  handleBarDetailChange(index, "bar_license_number", e.target.value)
                }
              />
              <input
                type="text"
                className="lr-step2-input"
                placeholder="Bar Association Name"
                value={bar.bar_association_name}
                onChange={(e) =>
                  handleBarDetailChange(index, "bar_association_name", e.target.value)
                }
              />

              {/* 🌍 Country Dropdown */}
              <select
                className="lr-step2-input"
                value={bar.country || ""}
                onChange={(e) => handleBarDetailChange(index, "country", e.target.value)}
              >
                <option value="">Select Country</option>
                {Object.keys(countriesData).map((country, i) => (
                  <option key={i} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              {/* 🏙️ State Dropdown */}
              <select
                className="lr-step2-input"
                value={bar.state || ""}
                onChange={(e) => handleBarDetailChange(index, "state", e.target.value)}
                disabled={!bar.country}
              >
                <option value="">Select State</option>
                {bar.country &&
                  Object.keys(countriesData[bar.country]).map((state, i) => (
                    <option key={i} value={state}>
                      {state}
                    </option>
                  ))}
              </select>

              {/* 🌆 City Dropdown */}
              <select
                className="lr-step2-input"
                value={bar.city || ""}
                onChange={(e) => handleBarDetailChange(index, "city", e.target.value)}
                disabled={!bar.state}
              >
                <option value="">Select City</option>
                {bar.country &&
                  bar.state &&
                  countriesData[bar.country][bar.state]?.map((city, i) => (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          ))}
          <button className="lr-step2-add-btn" onClick={addBarDetail}>
            + Add Bar Detail
          </button>
        </div>

         <div className="lr-step2-section">
      <label className="lr-step2-label">Languages Spoken</label>
      <div className="lr-step2-checkboxes">
        {visibleLanguages.map((lang) => (
          <label key={lang} className="lr-step2-checkbox-label">
            <input
              type="checkbox"
              className="lr-step2-checkbox"
              checked={languages.includes(lang)}
              onChange={() => toggleLanguage(lang)}
            />
            {lang}
          </label>
        ))}
      </div>

      {allLanguages.length > 10 && (
        <button
          type="button"
          className="lr-showmore-btn"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      )}
    </div>

        <div className="lr-step2-section">
          <label className="lr-step2-label">Education</label>
          {educationList.map((edu, index) => (
            <div key={index} className="lr-step2-row">
              <input
                type="text"
                className="lr-step2-input"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) =>
                  handleEducationChange(index, "degree", e.target.value)
                }
              />
              <input
                type="text"
                className="lr-step2-input"
                placeholder="College Name"
                value={edu.college_name}
                onChange={(e) =>
                  handleEducationChange(index, "college_name", e.target.value)
                }
              />
              <input
                type="text"
                className="lr-step2-input"
                placeholder="e.g. 2020"
                value={edu.graduation_year}
                onChange={(e) =>
                  handleEducationChange(index, "graduation_year", e.target.value)
                }
              />
            </div>
          ))}
          <button className="lr-step2-add-btn" onClick={addEducation}>
            + Add Education
          </button>
        </div>

        <div className="lr-step2-footer">
          <button className="lr-step2-prev-btn" onClick={() => navigate(-1)}>
            Previous
          </button>
          <button className="lr-step2-next-btn" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistrationStep2;
