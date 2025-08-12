import React from "react";
import "./HowItWorks.css";

const steps = [
  {
    number: "1",
    title: "Search for a lawyer",
    description:
      "Use filters like practice area, city, and language to find the right legal professional for your needs."
  },
  {
    number: "2",
    title: "Explore their profile",
    description:
      "Check out experience, services, fees, and reviews to decide who suits your case best."
  },
  {
    number: "3",
    title: "Get legal help",
    description:
      "Schedule consultations, communicate securely, and work with your chosen lawyer to resolve your legal matter."
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2 className="hiw-title">How it works</h2>
      <p className="hiw-subtitle">
        Three simple steps to connect with the right legal professional for your needs.
      </p>

      <div className="hiw-steps">
        {steps.map((step, index) => (
          <div className="hiw-step" key={index}>
            <div className="hiw-number">{step.number}</div>
            <h3 className="hiw-step-title">{step.title}</h3>
            <p className="hiw-step-desc">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
