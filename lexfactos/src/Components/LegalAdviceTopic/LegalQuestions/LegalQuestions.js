import React, { useState } from "react";
import "./LegalQuestions.css";
import { FaRegBookmark } from "react-icons/fa";

const LegalQuestions = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 400;
  const questions = [
    {
      id: 1,
      title: "Forgot to remove ex from health insurance ?",
      description:
        "My ex spouse passed away and I realized that I forgot to remove them from my medical insurance when we divorced about 4 months prior. In WA state, com...",
      location: "Seattle, WA",
      date: "Jul 17, 2025",
      answers: 1,
    },
    {
      id: 2,
      title:
        "Can I reopen a divorce case because our assets and bank accounts from op wasn't fully disclosed?",
      description:
        "Repeatedly asked to get my ex’s financial documents and my attorney just kept telling me she asked but couldn’t get them. Also, when I went in to reta...",
      location: "Tallahassee, FL",
      date: "Jul 17, 2025",
      answers: 1,
    },
  ];

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        <button
          className={`page-btn ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
        <button className="page-btn" onClick={() => handlePageChange(2)}>
          2
        </button>
        <button className="page-btn" onClick={() => handlePageChange(3)}>
          3
        </button>
        <button className="page-btn" onClick={() => handlePageChange(4)}>
          4
        </button>
        <span className="dots">...</span>
        <button className="page-btn" onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </button>

        <button
          className="page-btn"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className="lq-wrapper">
      {/* Page Heading */}
      <h2 className="lq-heading">
        Trusted answers to real legal questions — from qualified attorneys.
      </h2>
      <p className="lq-subheading">
        Showing 1 - 25 of 10000 results for Divorce
      </p>

      {/* Questions List */}
      <div className="lq-list">
        {questions.map((q) => (
          <div className="lq-card" key={q.id}>
            <div className="lq-card-header">
              <span className="lq-tag">Question</span>
            </div>

            <h3 className="lq-title">{q.title}</h3>
            <p className="lq-description">{q.description}</p>

            <div className="lq-footer">
              <span className="lq-meta">
                Asked in {q.location} | {q.date} |{" "}
                <a href="/" className="lq-answers">
                  {q.answers} answers
                </a>
              </span>
              <button className="lq-save-btn">
                <FaRegBookmark /> Save
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  );
};

export default LegalQuestions;
