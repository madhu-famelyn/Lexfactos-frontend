import React from "react";
import "./ProfileReview.css";
import { FaArrowLeft } from "react-icons/fa";
import reviewImage from "../Assets/review-illustration.png";

const ProfileReview = () => {
  return (
    <div className="review-container">
      <div className="review-card">
        <img src={reviewImage} alt="Profile Review" className="review-image" />

        <h2 className="review-title">
          Your Profile Is Under Review <span className="check-icon">✅</span>
        </h2>

        <p className="review-text">
          Thank you for registering with Lexfactos. <br />
          Our team is reviewing your profile to ensure all details meet our
          verification standards.
        </p>

        <button className="back-button">
          <FaArrowLeft className="back-icon" /> Back to Home
        </button>
      </div>
    </div>
  );
};

export default ProfileReview;
