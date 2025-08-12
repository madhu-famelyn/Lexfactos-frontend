import React from "react";
import "./OurMission.css";

const missionPoints = [
  {
    id: 1,
    title: "Accessibility First",
    description:
      "We believe that everyone deserves access to quality legal help when they need it most. Our platform eliminates traditional barriers, making professional legal services more accessible than ever before.",
  },
  {
    id: 2,
    title: "Trust & Transparency",
    description:
      "Every interaction on our platform is built on trust. We provide complete transparency in pricing, lawyer credentials, and client reviews to help you make informed decisions.",
  },
  {
    id: 3,
    title: "User-Centric Experience",
    description:
      "We've designed every aspect of our platform with you in mind, ensuring that finding and connecting with the right lawyer is intuitive, efficient, and stress-free.",
  },
];

const OurMission = () => {
  return (
    <section className="our-mission-section">
      <div className="mission-left">
        <h2 className="mission-title">
          Our <span className="mission-highlight">Mission</span>
        </h2>
        <p className="mission-subtitle">
          Democratizing access to legal services through technology and human-centered design.
        </p>
        <div className="mission-underline" />
      </div>

      <div className="mission-points">
        {missionPoints.map(({ id, title, description }) => (
          <div key={id} className="mission-point-card">
            <div className="point-number">{id}</div>
            <div>
              <h3 className="point-title">{title}</h3>
              <p className="point-description">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurMission;
