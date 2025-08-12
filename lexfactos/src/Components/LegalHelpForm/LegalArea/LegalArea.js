import React from "react";
import { FaUsers, FaHome, FaShieldAlt, FaBriefcase, FaBuilding, FaFileAlt } from "react-icons/fa";
import "./LegalArea.css";
import { HiOutlineArrowRight } from "react-icons/hi";


const legalAreas = [
  {
    icon: <FaUsers />,
    title: "Family & Divorce",
    description: "Child custody, divorce proceedings, alimony",
    questions: "2,847",
    lawyers: 12
  },
  {
    icon: <FaHome />,
    title: "Property & Real Estate",
    description: "Property disputes, buying/selling, landlord issues",
    questions: "1,923",
    lawyers: 8
  },
  {
    icon: <FaShieldAlt />,
    title: "Criminal Defense",
    description: "Criminal charges, court representation, legal rights",
    questions: "1,456",
    lawyers: 15
  },
  {
    icon: <FaBriefcase />,
    title: "Employment & Workplace",
    description: "Wrongful termination, workplace harassment, contracts",
    questions: "2,134",
    lawyers: 6
  },
  {
    icon: <FaBuilding />,
    title: "Business & Startup Law",
    description: "Business formation, contracts, intellectual property",
    questions: "1,678",
    lawyers: 9
  },
  {
    icon: <FaFileAlt />,
    title: "Wills & Estate",
    description: "Estate planning, wills, probate, inheritance",
    questions: "987",
    lawyers: 4
  }
];

const LegalArea = () => {
  return (
    <div className="legal-area">
      <h1 className="legal-title">Browse Questions by Legal Area</h1>
      <p className="legal-subtitle">
        Find answers to questions similar to yours
      </p>
      <div className="legal-grid">
        {legalAreas.map((area, index) => (
          <div className="legal-card" key={index}>
            <div className="legal-icon">{area.icon}</div>
            <div className="legal-questions">
              {area.questions} <span>questions</span>
            </div>
            <h3 className="legal-card-title">{area.title}</h3>
            <p className="legal-desc">{area.description}</p>
         <p className="lawyers-active">
            {area.lawyers} lawyers active now
            <HiOutlineArrowRight className="arrow" />
          </p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalArea;
