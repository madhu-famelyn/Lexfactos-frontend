import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { FaRupeeSign, FaRegClock } from "react-icons/fa";
import "./ChooseLawyer.css";

const features = [
  {
    icon: <FaRegStar />,
    title: "Relevant Experience",
    description: "Look for lawyers with specific experience in your type of case",
  },
  {
    icon: <FaUserGroup />,
    title: "Client Reviews",
    description: "Read testimonials and ratings from previous clients",
  },
  {
    icon: <FaRupeeSign />,
    title: "Fee Transparency",
    description: "Ensure clear understanding of costs and billing structure",
  },
  {
    icon: <FaRegClock />,
    title: "Consultation Availability",
    description: "Choose lawyers who offer initial consultations",
  },
];

export default function ChooseLawyer() {
  return (
    <div className="choose-lawyer-section">
      <h2 className="choose-lawyer-title">How to Choose the Right Lawyer</h2>
      <div className="choose-lawyer-grid">
        {features.map((item, index) => (
          <div className="choose-lawyer-item" key={index}>
            <div className="icon-wrapper">{item.icon}</div>
            <div>
              <h3 className="item-title">{item.title}</h3>
              <p className="item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
   
    </div>
  );
}
