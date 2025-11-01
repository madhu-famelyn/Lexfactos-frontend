import React, { useState, useEffect } from "react";
import Sidebar from "../Slider/SideBar";
import { postJob } from "../../Service/Service";
import { useAuth } from "../../Context/UserContext";
import CustomDropdown from "../../ReusableComponents/CustomDropDown/CustomDropDown";
import PracticeAreaDropdown from "../../ReusableComponents/PracticeArea/PracticeArea";
import LocationSelector from "../../ReusableComponents/CustomDropDown/LocationSelector/Locations";
import "./PostJob.css";

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Contract",
  "Freelance",
  "Internship",
  "Temporary",
  "Retainer Basis",
  "Other",
];

const workModes = [
  "On-site",
  "Remote",
  "Hybrid",
  "Court-based",
  "Client-based",
];

export default function PostJob() {
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    practiceArea: "",
    specialization: "",
    experienceLevel: "",
    jobDescription: "",
    location: "",
    workMode: "",
    user_id: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (auth?.user?.id) {
      setFormData((prev) => ({ ...prev, user_id: auth.user.id }));
    }
  }, [auth]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (country, state, city) => {
    const locationValue =
      country && state && city ? `${country}, ${state}, ${city}` : "";
    setFormData((prev) => ({ ...prev, location: locationValue }));
  };

  const validateForm = () => {
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

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!formData.user_id) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { contactInfo, ...validData } = formData; // remove contactInfo if present
      const payload = {
        ...validData,
        location: formData.location.trim(),
      };

      console.log("Payload sending:", payload);
      const response = await postJob(payload);

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
        user_id: auth?.user?.id || "",
      });
    } catch (error) {
      console.error("Failed to post job:", error);
      alert("Failed to post job, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="postjob-container">
      <Sidebar />
      <div className="postjob-content">
        <h1 className="postjob-title">Post a Lawyer Job</h1>

        {error && <div className="error-message">{error}</div>}

        <form className="postjob-form" onSubmit={handleSubmit}>
          {/* Job Title */}
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

          {/* Job Type */}
          <div className="form-group">
            <label>Job Type</label>
            <CustomDropdown
              options={jobTypes}
              value={formData.jobType}
              onChange={(val) => setFormData({ ...formData, jobType: val })}
              placeholder="Select Job Type"
            />
          </div>

          {/* Practice Area */}
          <PracticeAreaDropdown
            value={formData.practiceArea}
            onChange={(val) => setFormData({ ...formData, practiceArea: val })}
          />

          {/* Specialization */}
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

          {/* Experience Level */}
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

          {/* Job Description */}
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

          {/* Location */}
          <LocationSelector onLocationChange={handleLocationChange} />

          {/* Work Mode */}
          <div className="form-group">
            <label>Work Mode</label>
            <CustomDropdown
              options={workModes}
              value={formData.workMode}
              onChange={(val) => setFormData({ ...formData, workMode: val })}
              placeholder="Select Work Mode"
            />
          </div>

          <button type="submit" className="postjob-btn" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}
