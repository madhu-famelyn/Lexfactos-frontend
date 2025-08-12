import React from "react";
import {
  FaEye,
  FaMapMarkerAlt,
  FaStar,
  FaRegThumbsUp,
  FaRegBookmark,
  FaShareAlt
} from "react-icons/fa";
import "./RecentlyAskedQuestions.css";

const questions = [
  {
    status: "Answered",
    category: "Property & Real Estate",
    title: "Can I sell property if my co-owner disagrees?",
    description:
      "In most cases, you cannot sell jointly owned property without the consent of all co-owners. However, you may have options such as partition actions or buyout agreements. A partition action allows you to petition the court to force a sale or physical division of the property. This legal process can be complex and costly, so it's often better to try negotiating with your co-owner first.",
    views: 156,
    timeAgo: "2 hours ago",
    author: "Sarah Mitchell",
    location: "San Francisco, CA",
    rating: 4.9,
    likes: 23
  }
];

export default function RecentlyAskedQuestions() {
  return (
    <div className="raq-container">
      <h1 className="raq-title">Recently Asked Questions</h1>
      <p className="raq-subtitle">
        See how lawyers are helping people with real legal issues
      </p>

      {/* Filters */}
      <div className="raq-filters">
        <button className="filter-btn">
          <span className="filter-icon">⇅</span> Most Recent
        </button>
        <button className="filter-btn">
          <span className="filter-icon">⌄</span> All Categories
        </button>
        <input
          type="text"
          className="raq-search"
          placeholder="Search questions, categories, or lawyers..."
        />
      </div>

      <p className="raq-showing">Showing 6 of 10 questions</p>

      {/* Questions */}
      {questions.map((q, index) => (
        <div className="raq-card" key={index}>
          {/* Status, Category and Views/Time */}
          <div className="raq-top-row">
            <div className="raq-tags">
              <span className="raq-status">{q.status}</span>
              <span className="raq-category">{q.category}</span>
            </div>
            <div className="raq-meta">
              <span className="raq-views">
                <FaEye /> {q.views}
              </span>
              <span className="raq-time">{q.timeAgo}</span>
            </div>
          </div>

          <h2 className="raq-question">{q.title}</h2>
          <p className="raq-description">{q.description}</p>

          {/* Author and Actions in same line */}
          <div className="raq-bottom-row">
            <div className="raq-author">
              <div className="raq-avatar"></div>
              <div className="raq-author-info">
                <p className="raq-name">{q.author}</p>
                <p className="raq-location">
                  <FaMapMarkerAlt /> {q.location}{" "}
                  <FaStar className="star" /> {q.rating}
                </p>
              </div>
            </div>
            <div className="raq-actions">
              <span>
                <FaRegThumbsUp /> {q.likes}
              </span>
              <FaRegBookmark />
              <FaShareAlt />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
