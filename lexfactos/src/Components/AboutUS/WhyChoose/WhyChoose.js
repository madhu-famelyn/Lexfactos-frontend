import React from "react";
import "./WhyChoose.css";
import { FaCheckCircle, FaStar, FaBolt, FaShieldAlt } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: "Verified Lawyers",
      description:
        "Every lawyer undergoes thorough verification to ensure they meet our high standards for professionalism and expertise.",
    },
    {
      icon: <FaStar />,
      title: "Real Client Reviews",
      description:
        "Make informed decisions with authentic reviews and ratings from real clients who have worked with our lawyers.",
    },
    {
      icon: <FaBolt />,
      title: "Easy Booking Experience",
      description:
        "Our intuitive platform makes it simple to find, compare, and book appointments with the right lawyer for your needs.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure and Private",
      description:
        "Your privacy and security are our top priorities. All communications and data are protected with enterprise-grade security.",
    },
  ];

  return (
    <section className="why-choose">
      <h2>
        Why Choose <span>Lexfactos</span>
      </h2>
      <p className="subtitle">
        We've built the most comprehensive and secure platform for legal services
      </p>

      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <a href="javascript:void(0)" className="learn-more">
              Learn more →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChoose;
