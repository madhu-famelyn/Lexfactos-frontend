import React, { useState } from "react";
import Sidebar from "../Slider/SideBar";
import { postJob } from "../../Service/Service";
import "./PostJob.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",    
    practiceArea: "",
    specialization: "",
    experienceLevel: "",
    jobDescription: "",
    location: "",
    workMode: "",
    contactInfo: "", // Add contactInfo field
    user_id: "52f57cdb-b260-4744-8089-c9abde8a1b2e", // Example user ID (replace it with dynamic user ID if needed)
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Check for required fields
    const requiredFields = [
      "jobTitle",
      "jobType",
      "experienceLevel",
      "jobDescription",
      "location",
      "workMode",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill the ${field} field.`);
        return false;
      }
    }

    // Clear the error if all required fields are filled
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Validate form before submission

    setIsSubmitting(true); // Disable submit button and show loader
    try {
      const response = await postJob(formData);
      console.log("Job Posted:", response);
      alert("Job posted successfully!");
      setFormData({
        jobTitle: "",
        jobType: "",
        practiceArea: "",
        specialization: "",
        experienceLevel: "",
        jobDescription: "",
        location: "",
        workMode: "",
        contactInfo: "",
        user_id: formData.user_id,
      }); // Reset the form after successful submission
    } catch (error) {
      console.error("Failed to post job:", error);
      alert("Failed to post job, please try again.");
    } finally {
      setIsSubmitting(false); // Re-enable the submit button and hide the loader
    }
  };

  return (
    <div className="postjob-container">
      <Sidebar />
      <div className="postjob-content">
        <h1 className="postjob-title">Post a Lawyer Job</h1>

        {error && <div className="error-message">{error}</div>} {/* Show error message */}

        <form className="postjob-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="e.g., Corporate Lawyer"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <input
              type="text"
              name="jobType"
              placeholder="e.g., Full-Time, Internship"
              value={formData.jobType}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Practice Area</label>
            <input
              type="text"
              name="practiceArea"
              placeholder="e.g., Corporate Law, Family Law"
              value={formData.practiceArea}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Specialization</label>
            <input
              type="text"
              name="specialization"
              placeholder="e.g., Mergers & Acquisitions"
              value={formData.specialization}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Experience Level</label>
            <input
              type="text"
              name="experienceLevel"
              placeholder="e.g., 2–5 years"
              value={formData.experienceLevel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              name="jobDescription"
              placeholder="Briefly describe the role and expectations"
              value={formData.jobDescription}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g., Chennai, Mumbai"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Work Mode</label>
            <input
              type="text"
              name="workMode"
              placeholder="e.g., On-site, Remote, Hybrid"
              value={formData.workMode}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="postjob-btn"
            disabled={isSubmitting} // Disable the submit button while submitting
          >
            {isSubmitting ? "Posting..." : "Post Job"} {/* Loader Text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
