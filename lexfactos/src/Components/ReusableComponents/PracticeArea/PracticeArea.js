import React from "react";
import CustomDropdown from "../CustomDropDown/CustomDropDown";

const practiceAreas = [
  "Corporate Law",
  "Commercial Law",
  "Mergers and Acquisitions (M&A)",
  "Banking and Finance Law",
  "Intellectual Property (IP) Law",
  "Competition and Antitrust Law",
  "Contract Law",
  "Joint Ventures and Partnerships",
  "Business Setup and Licensing",
  "Franchise Law",
  "Civil Litigation",
  "Arbitration and Dispute Resolution",
  "Mediation and Conciliation",
  "Consumer Protection Law",
  "Tort Law",
  "Property and Real Estate Law",
  "Landlord-Tenant Law",
  "Criminal Law",
  "White Collar Crime",
  "Cyber Crime and Cyber Law",
  "Taxation Law",
  "Regulatory Compliance",
  "Family Law",
  "Divorce and Child Custody Law",
  "Inheritance and Succession Law",
  "Wills and Estate Planning",
  "Personal Injury Law",
  "Labor and Employment Law",
  "Workplace Disputes",
  "Employee Benefits and Compensation",
  "International Trade Law",
  "Immigration and Visa Law",
  "Maritime and Shipping Law",
  "Aviation Law",
  "Construction Law",
  "Real Estate Development Law",
  "Infrastructure and Project Finance",
  "Environmental Law",
  "Energy and Natural Resources Law",
  "Oil and Gas Law",
  "Technology and Data Protection Law",
  "Media and Entertainment Law",
  "Sports Law",
  "Insurance Law",
  "Healthcare and Medical Law",
  "Education Law",
  "Human Rights Law",
  "Public Interest Litigation (PIL)",
  "Startup and Venture Capital Law",
  "Bankruptcy and Insolvency Law",
];

export default function PracticeAreaDropdown({ value, onChange }) {
  return (
    <div className="form-group">
      <label>Practice Area *</label>

      <CustomDropdown
        isMulti={true}              // ✅ allow multiple selection
        options={practiceAreas}
        value={value}
        onChange={(selectedValues) => onChange(selectedValues)}
        placeholder="Select Practice Areas"
      />
    </div>
  );
}
