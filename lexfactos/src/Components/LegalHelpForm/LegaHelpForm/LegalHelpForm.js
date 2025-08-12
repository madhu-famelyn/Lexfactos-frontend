import React from "react";
import "./LegalHelpForm.css";
import { FiInfo, FiShield, FiMessageCircle } from "react-icons/fi"; // Importing the icons from react-icons/fi
import { SlCheck } from "react-icons/sl";

export default function LegalHelpForm() {
  return (
    <div className="legal-help-container">
      <h1 className="legal-help-title">
        Get Free Legal Answers from Trusted Lawyers
      </h1>
      <p className="legal-help-subtitle">
        Ask your legal question and receive guidance from verified legal
        professionals within 24–48 hours.
      </p>

      <div className="legal-help-card">
        <label className="form-label-main">What's your legal question?</label>
        <textarea
          className="form-textarea"
          placeholder="Describe your legal situation in detail. Include relevant facts, dates, and your location to get the most accurate advice…"
        ></textarea>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Legal Category</label>
            <select className="form-select">
              <option>Select a category...</option>
              <option>Family Law</option>
              <option>Criminal Law</option>
              <option>Employment Law</option>
              <option>Business Law</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Your State</label>
            <select className="form-select">
              <option>Select your state...</option>
              <option>California</option>
              <option>New York</option>
              <option>Texas</option>
              <option>Florida</option>
            </select>
          </div>
        </div>
    <div className="form-info">
        <span className="status">
        <SlCheck className="check-icon" /> 
        Free • Anonymous • 24–48 hour response
      </span>
    </div>

        <button className="submit-btn">Ask Your Question</button>
      </div>

      <div className="tips-container">
      <div className="tip-box">
        <div className="tip-icon-container">
          <FiInfo className="tip-icon" />
        </div>
        <div className="tip-content">
          <strong>Be Specific</strong>
          <p>Include relevant details, dates, and locations in your question.</p>
        </div>
      </div>
      <div className="tip-box">
        <div className="tip-icon-container">
          <FiShield className="tip-icon" />
        </div>
        <div className="tip-content">
          <strong>Stay Anonymous</strong>
          <p>Don't include personal identifying information in your question.</p>
        </div>
      </div>
      <div className="tip-box">
        <div className="tip-icon-container">
          <FiMessageCircle className="tip-icon" />
        </div>
        <div className="tip-content">
          <strong>One Question</strong>
          <p>Ask one clear legal question per submission for best results.</p>
        </div>
      </div>
    </div>
    </div>
  );
}
