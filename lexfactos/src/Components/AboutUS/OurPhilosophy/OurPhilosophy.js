import React from "react";
import "./OurPhilosophy.css";
import { FaUserFriends } from "react-icons/fa";  // People-First
import { AiOutlineHeart } from "react-icons/ai"; // Built with Care
import { FaBalanceScale } from "react-icons/fa"; // Justice for All

const OurPhilosophy = () => {
  const items = [
    {
      icon: <FaUserFriends />,
      title: "People-First",
      text: "We put people at the center of everything we do, ensuring both clients and lawyers have exceptional experiences."
    },
    {
      icon: <AiOutlineHeart />,
      title: "Built with Care",
      text: "Every feature is thoughtfully designed to reduce stress and complexity in challenging legal situations."
    },
    {
      icon: <FaBalanceScale />,
      title: "Justice for All",
      text: "Quality legal representation should be accessible to everyone, regardless of background or circumstances."
    }
  ];

  return (
    <section className="our-philosophy">
      <h2>
        Our <span>Philosophy</span>
      </h2>
      <p className="subtitle">
        Built on the foundation of justice, accessibility, and human connection
      </p>

      <div className="philosophy-cards">
        {items.map((item, index) => (
          <div key={index} className="philosophy-card">
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurPhilosophy;
