import React from "react";
import "./InputPage.css";

export default function InputPage() {
  return (
    <div className="search-page">
      <div className="search-header">
        <h1>Find a Lawyer You Can Trust</h1>
        <p>
          Search by legal specialty and location to connect with
          experienced professionals.
        </p>
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="e.g. Personal Injury, Divorce"
          className="search-input"
        />
        <select className="search-select">
          <option>Practice Area</option>
        </select>
        <select className="search-select">
          <option>City / Area</option>
        </select>
        <button className="search-button">
          <span className="search-icon">🔍</span> Search
        </button>
      </div>
    </div>
  );
}
