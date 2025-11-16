// src/Pages/Jobs/ListJobs.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/UserContext";
import {
  fetchJobPosts,
  updateJobPost,
  toggleJobPostStatus,
} from "../../Service/Service";
import Sidebar from "../Slider/SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ListJobs.css";

const JobsPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({});
  const [confirmData, setConfirmData] = useState({ jobId: null, status: null });

  // Fetch jobs and applicant counts
  useEffect(() => {
    const fetchJobsAndApplicants = async () => {
      if (!auth.user?.id) {
        setLoading(false);
        return;
      }

      try {
        const jobsData = await fetchJobPosts(auth.user.id);

        // For each job, fetch applicant count
        const jobsWithApplicants = await Promise.all(
          jobsData.map(async (job) => {
            try {
              const res = await axios.get(
                `https://api.lexfactos.com/job-applications/job/${job.id}`
              );
              return { ...job, applicantCount: res.data.length };
            } catch (err) {
              console.error("Error fetching applicants for job:", job.id, err);
              return { ...job, applicantCount: 0 };
            }
          })
        );

        setJobs(jobsWithApplicants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job posts", error);
        setLoading(false);
      }
    };

    fetchJobsAndApplicants();
  }, [auth.user]);

  // Open update modal
  const handleUpdate = (job) => {
    setSelectedJob(job);
    const { id, user_id, status, created_at, updated_at, ...editableData } = job;
    setFormData(editableData);
    setShowUpdateModal(true);
  };

  // Submit update
  const handleSubmitUpdate = () => {
    if (!selectedJob) return;
    updateJobPost(selectedJob.id, formData)
      .then((updatedJob) => {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === selectedJob.id ? { ...job, ...updatedJob } : job
          )
        );
        setShowUpdateModal(false);
      })
      .catch((error) => console.error("Error updating job post", error));
  };

  // Open confirmation modal
  const handleDeactivate = (jobId, currentStatus) => {
    setConfirmData({ jobId, status: currentStatus });
    setShowConfirmModal(true);
  };

  // Confirm toggle status
  const confirmToggle = () => {
    const { jobId, status } = confirmData;
    const newStatus = !status;
    toggleJobPostStatus(jobId, newStatus)
      .then((updatedJob) => {
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === jobId ? { ...job, status: updatedJob.status } : job
          )
        );
        setShowConfirmModal(false);
      })
      .catch((error) => console.error("Error toggling job post status", error));
  };

  // Navigate to applicants page
  const handleViewApplicants = (jobId) => {
    navigate(`/applicents`, { state: { jobId } });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="jobs-page">
      <Sidebar />
      <div className="jobs-content">
        <h1>Your Job Posts</h1>
        {jobs.length > 0 ? (
          <div className="job-list">
            {jobs.map((job) => (
              <div
                key={job.id}
                className={`job-card ${job.status ? "active" : "deactivated"}`}
              >
                <h3>{job.jobTitle}</h3>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Practice Area:</strong> {job.practiceArea}</p>
                <p><strong>Specialization:</strong> {job.specialization}</p>
                <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
                <p><strong>Work Mode:</strong> {job.workMode}</p>
                <p><strong>Contact Info:</strong> {job.contactInfo}</p>
                <p className="status"><strong>Status:</strong> {job.status ? "Active" : "Deactivated"}</p>
                <p className="applicant-count"><strong>Applicants:</strong> {job.applicantCount || 0}</p>

                <div className="job-actions">
                  <button onClick={() => handleUpdate(job)} className="btn-update">
                    Update
                  </button>
                  <button
                    onClick={() => handleDeactivate(job.id, job.status)}
                    className={job.status ? "btn-deactivate" : "btn-activate"}
                  >
                    {job.status ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleViewApplicants(job.id)}
                    className="btn-view-applicants"
                  >
                    View Applicants
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No job posts found.</p>
        )}
      </div>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal-overlay">
          <div className="modal scrollable-modal">
            <h2>Update Job Post</h2>
            <div className="modal-form">
              {Object.keys(formData).map((key) => (
                <div className="form-group" key={key}>
                  <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  <textarea
                    value={formData[key] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    rows={key === "jobDescription" ? 5 : 2}
                  />
                </div>
              ))}
            </div>
            <div className="modal-actions">
              <button className="btn-update" onClick={handleSubmitUpdate}>
                Save Changes
              </button>
              <button
                className="btn-deactivate"
                onClick={() => setShowUpdateModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal confirm-modal">
            <h3>
              Are you sure you want to {confirmData.status ? "deactivate" : "activate"} this job?
            </h3>
            <div className="modal-actions">
              <button
                className={confirmData.status ? "btn-deactivate" : "btn-activate"}
                onClick={confirmToggle}
              >
                Yes, {confirmData.status ? "Deactivate" : "Activate"}
              </button>
              <button
                className="btn-update"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
