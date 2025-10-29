// src/Pages/Jobs/BrowseJobGrid.js
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaGlobeAsia } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./ApplyJobs.css";

export default function BrowseJobGrid() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    country: "",
    city: "",
  });
  const [mostRecent, setMostRecent] = useState(true);
  const navigate = useNavigate();

  // ✅ useCallback to prevent ESLint warnings (react-hooks/exhaustive-deps)
  const fetchJobs = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.title) params.append("title", filters.title);
      if (filters.country) params.append("country", filters.country);
      if (filters.city) params.append("city", filters.city);
      params.append("most_recent", mostRecent);
      params.append("skip", 0);
      params.append("limit", 50);

      const res = await axios.get(`https://lexfactos-backend.fly.dev/jobs/?${params.toString()}`);
      // ✅ Show only verified jobs
      const verifiedJobs = res.data.filter((job) => job.verified === true);
      setJobs(verifiedJobs);

      console.log("✅ Verified Jobs:");
      verifiedJobs.forEach((job, index) => {
        console.log(`${index + 1}. job_post_id: ${job.id}`);
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw new Error("Failed to fetch jobs"); // ✅ proper error object
    }
  }, [filters, mostRecent]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = () => {
    fetchJobs();
  };

  const handleViewJob = (jobId) => {
    navigate(`/view-job/${jobId}`);
  };

  return (
    <div>
      <div className="browse-job-container">
        <div className="browse-job-bg"></div>
        <div className="browse-job-overlay"></div>

        <div className="browse-job-title">
          <h1>Browse Job</h1>
          <p>
            Home <span className="mx-1">›</span>{" "}
            <span className="browse-job-active">Browse Job Grid</span>
          </p>
        </div>

        {/* 🔍 Search Bar */}
        <div className="browse-job-searchbar">
          <div className="browse-job-field">
            <FaGlobeAsia className="browse-job-icon" />
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
          </div>

          <div className="browse-job-field">
            <IoLocationOutline className="browse-job-icon" />
            <select
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            >
              <option value="">Select State or City</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="New York">New York</option>
              <option value="California">California</option>
            </select>
          </div>

          <div className="browse-job-field">
            <MdWorkOutline className="browse-job-icon" />
            <input
              type="text"
              placeholder="Job Title or Role"
              value={filters.title}
              onChange={(e) => setFilters({ ...filters, title: e.target.value })}
            />
          </div>

          <button className="browse-job-btn" onClick={handleSearch}>
            Find Job
          </button>
        </div>
      </div>

      {/* 🔄 Sort Option */}
      <div className="browse-job-sort">
        <button
          className={`browse-job-sort-btn ${mostRecent ? "active" : ""}`}
          onClick={() => setMostRecent(true)}
        >
          Most Recent
        </button>
        <button
          className={`browse-job-sort-btn ${!mostRecent ? "active" : ""}`}
          onClick={() => setMostRecent(false)}
        >
          Oldest
        </button>
      </div>

      {/* ✅ Job Grid */}
      <div className="job-grid">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div className="job-card" key={index}>
              <h3 className="job-title">{job.jobTitle}</h3>
              <p className="job-location">
                <IoLocationOutline /> {job.location}
              </p>
              <p className="job-type">{job.jobType}</p>
              <p className="job-desc">
                {job.jobDescription?.substring(0, 120)}...
              </p>
              <div className="job-footer">
                <span className="job-date">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
                <button
                  className="apply-btn"
                  onClick={() => handleViewJob(job.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-jobs-text">No verified jobs found.</p>
        )}
      </div>
    </div>
  );
}
