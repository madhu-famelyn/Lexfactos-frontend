import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../AdminSidebar/AdminSidebar";
import "./AdminJobs.css";

// ✅ React Icons
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [selectedJob, setSelectedJob] = useState(null);
  const [confirmVerifyJob, setConfirmVerifyJob] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Wrap fetchJobs with useCallback to avoid missing dependency warnings
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:8000/jobs/?most_recent=${sort === "newest"}&skip=0&limit=100`
      );

      let data = response.data;

      // ✅ Filter by verification
      if (filter === "verified") data = data.filter((job) => job.verified === true);
      if (filter === "non-verified") data = data.filter((job) => job.verified === false);

      // ✅ Filter by status
      if (statusFilter === "active") data = data.filter((job) => job.status === true);
      if (statusFilter === "inactive") data = data.filter((job) => job.status === false);

      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  }, [filter, sort, statusFilter]);

  // ✅ No more ESLint warnings about missing dependencies
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleViewMore = () => setVisibleCount((prev) => prev + 10);

  const handleVerify = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/${id}/verified`, {
        verified: true,
      });
      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      console.error("Error verifying job:", err);
      throw new Error("Failed to verify job"); // ✅ Proper error object
    }
  };

  return (
    <div className="admin-jobs-container">
      {/* Sidebar */}
      <Sidebar />

      <div className="job-main-content">
        <div className="job-header">
          <h2>Job Posts</h2>
          <div className="filter-controls">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Jobs</option>
              <option value="verified">Verified</option>
              <option value="non-verified">Non-Verified</option>
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="loading">Loading jobs...</p>
        ) : (
          <div className="job-list">
            {jobs.slice(0, visibleCount).map((job) => (
              <div
                key={job.id}
                className={`job-card ${job.verified ? "verified" : "not-verified"}`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="job-card-header">
                  <h3>
                    <FaBriefcase className="icon" /> {job.jobTitle}
                  </h3>
                  <span className={`status-badge ${job.status ? "active" : "inactive"}`}>
                    {job.status ? "Active" : "Inactive"}
                  </span>
                </div>
                <p><strong>Type:</strong> {job.jobType}</p>
                <p><strong>Practice Area:</strong> {job.practiceArea}</p>
                <p><FaMapMarkerAlt className="inline-icon" /> {job.location}</p>
                <p><FaClock className="inline-icon" /> {job.workMode}</p>
                <p><FaEnvelope className="inline-icon" /> {job.contactInfo}</p>

                <div className="verify-status">
                  {job.verified ? (
                    <span className="verified-text">
                      <FaCheckCircle className="verify-icon verified" /> Verified
                    </span>
                  ) : (
                    <span className="not-verified-text">
                      <FaTimesCircle className="verify-icon not-verified" /> Not Verified
                    </span>
                  )}
                </div>
              </div>
            ))}

            {visibleCount < jobs.length && (
              <button className="view-more-btn" onClick={handleViewMore}>
                View More
              </button>
            )}
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedJob.jobTitle}</h2>
            <p><strong>Job Type:</strong> {selectedJob.jobType}</p>
            <p><strong>Practice Area:</strong> {selectedJob.practiceArea}</p>
            <p><strong>Specialization:</strong> {selectedJob.specialization}</p>
            <p><strong>Experience Level:</strong> {selectedJob.experienceLevel}</p>
            <p><strong>Description:</strong> {selectedJob.jobDescription}</p>
            <p><strong>Location:</strong> {selectedJob.location}</p>
            <p><strong>Work Mode:</strong> {selectedJob.workMode}</p>
            <p><strong>Contact Info:</strong> {selectedJob.contactInfo}</p>
            <p><strong>Status:</strong> {selectedJob.status ? "Active" : "Inactive"}</p>
            <p>
              <strong>Verified:</strong>{" "}
              {selectedJob.verified ? (
                <FaCheckCircle className="verify-icon verified" />
              ) : (
                <FaTimesCircle className="verify-icon not-verified" />
              )}
            </p>
            <p><strong>Posted On:</strong> {new Date(selectedJob.created_at).toLocaleString()}</p>

            <div className="modal-actions">
              <button className="close-btn" onClick={() => setSelectedJob(null)}>
                <FaTimes /> Close
              </button>
              {!selectedJob.verified && (
                <button
                  className="verify-btn"
                  onClick={() => setConfirmVerifyJob(selectedJob)}
                >
                  <FaCheck /> Verify
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Confirmation Popup */}
      {confirmVerifyJob && (
        <div className="confirm-overlay" onClick={() => setConfirmVerifyJob(null)}>
          <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Verification</h3>
            <p>
              Are you sure you want to verify the job{" "}
              <strong>{confirmVerifyJob.jobTitle}</strong>?
            </p>
            <div className="confirm-actions">
              <button className="cancel-btn" onClick={() => setConfirmVerifyJob(null)}>
                Cancel
              </button>
              <button
                className="confirm-btn"
                onClick={() => {
                  handleVerify(confirmVerifyJob.id);
                  setConfirmVerifyJob(null);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
