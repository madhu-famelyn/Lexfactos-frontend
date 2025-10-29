// src/pages/MyAppliedJobsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Slider/SideBar";
import { useAuth } from "../../Context/UserContext";
import "./MyAppliedJobsPage.css";
import { useNavigate } from "react-router-dom";

const MyAppliedJobsPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jobsData, setJobsData] = useState({}); // store job details keyed by job_id

  const userId = auth?.user?.id; // get user id from context

  useEffect(() => {
    if (!userId) return;

    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `https://lexfactos-backend.fly.dev/job-applications/user/${userId}`
        );
        setApplications(res.data);

        // Fetch job details for each application
        const jobDetailsPromises = res.data.map(app =>
          axios.get(`https://lexfactos-backend.fly.dev/job-posts/${app.job_id}`)
        );
        const jobsRes = await Promise.all(jobDetailsPromises);

        // Create a map: job_id -> job details
        const jobsMap = {};
        jobsRes.forEach(job => {
          jobsMap[job.data.id] = job.data;
        });
        setJobsData(jobsMap);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications or job details:", error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  if (!userId) return <p>Please log in to view your applications.</p>;
  if (loading) return <p>Loading your applied jobs...</p>;

  return (
    <div className="my-applied-jobs-page">
      <Sidebar />
      <div className="applications-content">
        <h2>My Applied Jobs</h2>

        {applications.length === 0 ? (
          <p>You haven't applied to any jobs yet.</p>
        ) : (
          <div className="application-list">
            {applications.map(app => {
              const job = jobsData[app.job_id];
              if (!job) return null; // skip if job data not loaded yet

              return (
                <div
                  key={app.id}
                  className="application-card"
                  onClick={() => navigate(`/view-job/${job.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <h3>{job.jobTitle}</h3>
                  <p><strong>Job Type:</strong> {job.jobType}</p>
                  <p><strong>Practice Area:</strong> {job.practiceArea}</p>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Work Mode:</strong> {job.workMode}</p>
                  <p><strong>Applied At:</strong> {new Date(app.applied_at).toLocaleDateString()}</p>
                  {app.resume_url && (
                    <p>
                      <strong>Resume:</strong>{" "}
                      <a href={app.resume_url} target="_blank" rel="noopener noreferrer">
                        View Resume
                      </a>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppliedJobsPage;
