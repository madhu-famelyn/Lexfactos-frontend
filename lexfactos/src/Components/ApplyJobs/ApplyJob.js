import React from "react";
import { FaGlobeAsia } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import "./ApplyJobs.css";

export default function BrowseJobGrid() {
  return (
    <div>
    <div className="browse-job-container">
      {/* Background */}
      <div className="browse-job-bg"></div>
      <div className="browse-job-overlay"></div>

      {/* Title */}
      <div className="browse-job-title">
        <h1>Browse Job Grid</h1>
        <p>
          Home <span className="mx-1">›</span>{" "}
          <span className="browse-job-active">Browse Job Grid</span>
        </p>
      </div>

      {/* Search Bar */}
      <div className="browse-job-searchbar">
        {/* Country Dropdown */}
        <div className="browse-job-field">
          <FaGlobeAsia className="browse-job-icon" />
          <select defaultValue="">
            <option value="" disabled>
              Select Country
            </option>
            <option value="india">India</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="canada">Canada</option>
          </select>
        </div>

        {/* State or City Dropdown */}
        <div className="browse-job-field">
          <IoLocationOutline className="browse-job-icon" />
          <select defaultValue="">
            <option value="" disabled>
              Select State or City
            </option>
            <option value="tamilnadu">Tamil Nadu</option>
            <option value="karnataka">Karnataka</option>
            <option value="maharashtra">Maharashtra</option>
            <option value="delhi">Delhi</option>
          </select>
        </div>

        {/* Job Title Input */}
        <div className="browse-job-field">
          <MdWorkOutline className="browse-job-icon" />
          <input type="text" placeholder="Job Title or Role" />
        </div>

        {/* Button */}
        <button className="browse-job-btn">Find Job</button>
      </div>

      {/* ✅ Sort Options Section */}
      
    </div>
    <div className="browse-job-sort">
        <button className="browse-job-sort-btn active">Most Recent</button>
        <button className="browse-job-sort-btn">Featured Jobs</button>
        <button className="browse-job-sort-btn">Popular Jobs</button>
      </div>
      </div>
  );
}
