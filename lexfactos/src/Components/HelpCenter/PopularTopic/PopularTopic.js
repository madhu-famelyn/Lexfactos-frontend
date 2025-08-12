import React from "react";
import { FiChevronRight } from "react-icons/fi"; // Import arrow icon
import "./PopularTopic.css";

const topics = [
  {
    title: "Account & Sign In",
    image: require("../../Assets/Account & Sign in Vector.png"),
    bgColor: "#E7F0FA"
  },
  {
    title: "Finding a Lawyer",
    image: require("../../Assets/Find a lawyer vector.png"),
    bgColor: "#E8F5F0"
  },
  {
    title: "Booking Appointments",
    image: require("../../Assets/Booking Appointment Vector.png"),
    bgColor: "#F3ECFB"
  },
  {
    title: "Free Legal Advice",
    image: require("../../Assets/Free Legal Advice Vector.png"),
    bgColor: "#E8F5F0"
  }
];

export default function PopularTopics() {
  return (
    <div className="popular-topics">
      <h2 className="heading">Start with these popular topics</h2>
      <p className="subheading">Find answers to questions similar to yours</p>

      <div className="topics-grid">
        {topics.map((topic, index) => (
          <div
            className="topic-card"
            style={{ backgroundColor: topic.bgColor }}
            key={index}
          >
            <div className="topic-header">
              <span className="topic-title">
                {topic.title} <FiChevronRight className="arrow-icon" />
              </span>
            </div>
            <img src={topic.image} alt={topic.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
