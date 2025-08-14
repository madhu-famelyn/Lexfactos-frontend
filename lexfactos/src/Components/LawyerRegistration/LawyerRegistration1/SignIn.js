import React from "react";
import "./SignIn.css";
import { FiUpload } from "react-icons/fi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";



const LawyerRegistration = () => {
  return (
    <div className="registration-container">
      <div className="registration-card">
        {/* Header */}
        <div className="registration-header">
          <div>
            <h2 className="registration-title">Lawyer Registration</h2>
            <p className="registration-step">
              Step 1 of 6: Personal & Contact Info
            </p>
          </div>
          <div className="progress-container">
            <span className="progress-text">11% Complete</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "11%" }}></div>
            </div>
          </div>
        </div>

        {/* Form layout */}
        <div className="registration-body">
          {/* Left side: Upload photo */}
          <div className="upload-section">
            <div className="photo-placeholder">
              <span className="photo-icon">🖼</span>
            </div>
            <button className="upload-btn">
                <FiUpload className="upload-icon" />
                Upload Profile Photo
            </button>
          </div>
        <div className="vertical-line"></div>

          {/* Right side: Form fields */}
          
          <form className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Gender (Optional)</label>
                <select>
                  <option>Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date of Birth (Optional)</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" placeholder="your.email@example.com" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="form-group">
                <label>Password *</label>
                <input type="password" placeholder="Create a strong password" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Confirm Password *</label>
                <input type="password" placeholder="Confirm your password" />
              </div>
              <div className="form-group">
                <label>LinkedIn URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label>Website / Firm URL (Optional)</label>
                <input type="url" placeholder="https://yourfirm.com" />
              </div>
            </div>

            {/* Buttons */}
          </form>
          
        </div>
                    {/* Buttons */}

       <div className="button-container">
            <button type="button" className="back-btn">
                <HiChevronLeft size={18} />
                Back
            </button>
            <button type="submit" className="next-btn">
                Next
                <HiChevronRight size={18} />
            </button>
        </div>
      </div>
      
    </div>
  );
};

export default LawyerRegistration;
