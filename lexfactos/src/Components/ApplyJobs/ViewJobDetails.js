// src/Pages/Jobs/ViewJobDetails.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaGlobe,
  FaBalanceScale,
  FaBullseye,
  FaUserTie,
} from "react-icons/fa";
import { useAuth } from "../Context/UserContext";
import "./ViewJobDetails.css";

export default function ViewJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth(); // get auth object
  const user = auth?.user; // extract user from auth

  const [job, setJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: user?.name || "",
    email: user?.email || "",
    mobile_number: user?.mobile || "",
    resume_file: null,
    cover_letter: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Fetch single job details
  const fetchJobDetails = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/job-posts/${id}`);
      setJob(res.data);
      console.log("Fetched job:", res.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  // Check if user has already applied
  const checkIfApplied = async () => {
    if (!user) return;
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/job-applications/user/${user.id}`
      );
      const applications = res.data || [];
      const alreadyApplied = applications.some(
        (app) => app.job_id === id
      );
      if (alreadyApplied) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error checking user applications:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
    checkIfApplied();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.id]);

  if (!job) return <p className="loading-text">Loading job details...</p>;

  // Helper to split description into paragraphs
  const formatDescription = (text) => {
    if (!text) return null;
    return text.split("\n").map((para, idx) => (
      <p key={idx} className="job-desc-para">
        {para.trim()}
      </p>
    ));
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume_file") {
      setFormData((prev) => ({ ...prev, resume_file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job) return alert("Job details not loaded yet!");
    if (!user) return alert("User not logged in!");
    if (!formData.resume_file) return alert("Please upload your resume!");

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("job_id", job.id);
      payload.append("user_id", user.id);
      payload.append("applicant_name", formData.applicant_name);
      payload.append("email", formData.email);
      payload.append("mobile_number", formData.mobile_number || "");
      payload.append("cover_letter", formData.cover_letter || "");
      payload.append("resume_file", formData.resume_file);

      const res = await axios.post(
        "http://127.0.0.1:8000/job-applications/",
        payload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Application submitted response:", res.data);
      setLoading(false);
      setShowSuccess(true);
      setSubmitted(true); // Update Apply button dynamically
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application");
      setLoading(false);
    }
  };

  return (
    <div className="view-job-container">
      <div className="view-job-card">
        <h1 className="view-job-title">{job.jobTitle}</h1>

        <div className="view-job-info">
          <p>
            <FaMapMarkerAlt /> <strong>Location:</strong> <span>{job.location}</span>
          </p>
          <p>
            <FaBriefcase /> <strong>Job Type:</strong> <span>{job.jobType}</span>
          </p>
          <p>
            <FaGlobe /> <strong>Work Mode:</strong> <span>{job.workMode}</span>
          </p>
          <p>
            <FaBalanceScale /> <strong>Practice Area:</strong> <span>{job.practiceArea}</span>
          </p>
          <p>
            <FaBullseye /> <strong>Specialization:</strong> <span>{job.specialization}</span>
          </p>
          <p>
            <FaUserTie /> <strong>Experience Level:</strong> <span>{job.experienceLevel}</span>
          </p>
        </div>

        <div className="view-job-description">
          <h3>Job Description</h3>
          <div className="job-desc-text">{formatDescription(job.jobDescription)}</div>
        </div>

        <div className="view-job-contact">
          <h3>Contact Information</h3>
          <p>{job.contactInfo}</p>
        </div>

        <div className="view-job-actions">
          <button
            className={`apply-now-btn ${submitted ? "submitted" : ""}`}
            onClick={() => setShowModal(true)}
            disabled={submitted}
          >
            {submitted ? "Application Submitted" : "Apply Now"}
          </button>
          <button className="save-job-btn">Save Job</button>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Jobs
        </button>
      </div>

      {/* APPLY JOB MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Apply for {job.jobTitle}</h2>
            <form onSubmit={handleSubmit} className="apply-form">
              <input
                type="text"
                name="applicant_name"
                placeholder="Full Name"
                value={formData.applicant_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="mobile_number"
                placeholder="Mobile Number"
                value={formData.mobile_number}
                onChange={handleChange}
              />
              <textarea
                name="cover_letter"
                placeholder="Cover Letter"
                value={formData.cover_letter}
                onChange={handleChange}
              />
              <input
                type="file"
                name="resume_file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <p>Your application was sent successfully!</p>
            <button onClick={() => setShowSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
