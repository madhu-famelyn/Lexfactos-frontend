import React from "react";
import "./LawyerTypes.css";

const lawyerTypes = [
  {
    title: "Family Lawyer",
    description: "Divorce, custody, adoption, domestic violence",
  },
  {
    title: "Civil Lawyer",
    description: "Property disputes, contracts, personal injury",
  },
  {
    title: "Criminal Lawyer",
    description: "Criminal defense, bail, court representation",
  },
  {
    title: "Corporate Lawyer",
    description: "Business law, mergers, compliance, contracts",
  },
  {
    title: "Employment Lawyer",
    description: "Workplace disputes, wrongful termination",
  },
  {
    title: "Property Lawyer",
    description: "Real estate, land disputes, documentation",
  },
];

export default function LawyerTypes() {
return (
  <div className="lawyer-section-container">
    <h2 className="lawyer-section-title">What Kind of Lawyer Do I Need?</h2>
    <div className="lawyer-section-grid">
      {lawyerTypes.map((lawyer, index) => (
        <div key={index} className="lawyer-section-card">
          <h3 className="lawyer-section-card-title">{lawyer.title}</h3>
          <p className="lawyer-section-card-description">{lawyer.description}</p>
        </div>
      ))}
    </div>
  </div>
);

}
