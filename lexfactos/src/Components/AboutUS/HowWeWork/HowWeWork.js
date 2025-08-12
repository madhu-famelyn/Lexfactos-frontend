import React from "react";
import "./HowWeWork.css";
import { FaMapMarkerAlt, FaEye, FaCalendarAlt } from "react-icons/fa";

const HowWeWork = () => {
  const steps = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Find Lawyers",
      description:
        "Search by location and specialization to find lawyers who match your specific legal needs and preferences.",
    },
    {
      icon: <FaEye />,
      title: "View Profiles",
      description:
        "Browse verified lawyer profiles with detailed information, credentials, and authentic client reviews.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Book Securely",
      description:
        "Schedule appointments online through our secure platform with instant confirmation and reminders.",
    },
  ];

  return (
    <section className="how-we-work">
      <h2>
        How We <span>Work</span>
      </h2>
      <p className="subtitle">
        Our streamlined process connects you with qualified lawyers in three simple steps
      </p>

      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWeWork;
