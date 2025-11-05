import React from "react";
import "./ProfileReview.css";
import { FaArrowLeft } from "react-icons/fa";
import reviewImage from "../Assets/review-illustration.png";
import { useNavigate } from "react-router-dom";

const ProfileReview = () => {
  const navigate = useNavigate();

  return (
    <div className="pr-container">
      <div className="pr-card">
        <img src={reviewImage} alt="Profile Review" className="pr-image" />

        <h2 className="pr-title">
          Your Profile Is Under Review <span className="pr-check-icon">✅</span>
        </h2>

        <p className="pr-text">
          Thank you for registering with Lexfactos. <br />
          Our team is reviewing your profile to ensure all details meet our
          verification standards.
        </p>

        <button className="pr-back-button" onClick={() => navigate("/")}>
          <FaArrowLeft className="pr-back-icon" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProfileReview;
