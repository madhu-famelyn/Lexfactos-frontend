import React, { useEffect, useState } from "react";
import "./ClientExperiences.css";

const testimonials = [
  {
    name: "Courtney Henry",
    role: "Analyst",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: `Navigating family law was overwhelming until I found this platform. 
           The lawyer I connected with was compassionate, professional, and got great results.`
  },
  {
    name: "Wade Warren",
    role: "Business Owner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: `This service made finding a reliable lawyer easy. I saved so much time and stress.`
  },
  {
    name: "Brooklyn Simmons",
    role: "Designer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: `Highly recommend! My lawyer was knowledgeable and handled my case perfectly.`
  }
];

const ClientExperiences = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) =>
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
        setIsAnimating(false);
      }, 600); // matches CSS animation duration
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="client-experiences">
      <h2>Client experiences</h2>
      <p className="subtitle">
        Real stories from clients who found the legal help they needed.
      </p>

      <div className="card-stack">
        {testimonials.map((t, index) => {
          let position =
            (index - currentIndex + testimonials.length) % testimonials.length;

          let cardClass = "";
          if (position === 0) cardClass = isAnimating ? "card active slide-up" : "card active";
          else if (position === 1) cardClass = isAnimating ? "card next slide-in" : "card next";
          else cardClass = "card inactive";

          return (
            <div
              key={index}
              className={cardClass}
              style={{ zIndex: testimonials.length - position }}
            >
              <div className="profile">
                <img src={t.image} alt={t.name} />
                <div>
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
              <p className="quote">"{t.text}"</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientExperiences;