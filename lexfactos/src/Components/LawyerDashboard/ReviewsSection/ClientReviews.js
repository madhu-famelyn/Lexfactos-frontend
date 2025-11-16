// src/Components/LawyerDashboard/ReviewsSection/ClientReviews.js

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Star, Edit3, MessageSquare } from "lucide-react";
import { useLawyerAuth } from "../../Context/LawyerContext";
import LawyerPannel from "../LaywerPannel/LawyerPannel";
import "./ClientReviews.css";

const BASE_URL = "https://api.lexfactos.com";

export default function LawyerReviews() {
  const { lawyerId, token } = useLawyerAuth();
  const [reviewsData, setReviewsData] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(true);

  // ✅ Fetch reviews
  const fetchReviews = useCallback(async () => {
    if (!lawyerId || !token) return;

    console.log("📡 Fetching reviews for lawyer:", lawyerId);

    try {
      const res = await axios.get(`${BASE_URL}/lawyer-rating/${lawyerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Reviews fetched successfully:", res.data);
      setReviewsData(res.data);
    } catch (err) {
      console.error("❌ Error fetching reviews:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
    } finally {
      setLoading(false);
    }
  }, [lawyerId, token]);

  useEffect(() => {
    if (lawyerId && token) {
      fetchReviews();
    } else {
      console.warn("⚠️ Missing lawyerId or token, skipping fetch...");
      setLoading(false);
    }
  }, [lawyerId, token, fetchReviews]);

  // ✅ Handle reply submission (POST for add, PUT for update)
  const handleReply = async (commentId, userId, existingReply) => {
    const reply = replyText[commentId]?.trim();

    if (!reply) {
      alert("Please write a reply before submitting.");
      return;
    }

    const payload = {
      lawyer_id: lawyerId,
      user_id: userId,
      comment_id: commentId,
      reply,
    };

    const method = existingReply ? "put" : "post";
    const url = `${BASE_URL}/lawyer-rating/reply`;

    console.log(`✉️ ${method.toUpperCase()} request to:`, url, payload);

    try {
      const res = await axios({
        method,
        url,
        data: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Reply submitted successfully:", res.data);
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      await fetchReviews();
      alert(existingReply ? "Reply updated successfully!" : "Reply added successfully!");
    } catch (err) {
      console.error("❌ Error submitting reply:", err);
      if (err.response) {
        alert(
          `Failed to ${
            existingReply ? "update" : "post"
          } reply: ${err.response.data.detail || "Unexpected error"}`
        );
      } else {
        alert("Network error while submitting reply.");
      }
    }
  };

  // ✅ Loading and empty states
  if (loading) return <div className="reviews-loading">Loading reviews...</div>;
  if (!reviewsData)
    return <div className="no-reviews-message">No reviews found.</div>;

  const { average_rating = 0, total_reviews = 0, reviews = [] } = reviewsData;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (r) => reviews.filter((rev) => rev.rating === r).length
  );

  return (
    <div className="lawyer-reviews-container">
      <LawyerPannel />

      <h2 className="reviews-title">Client Reviews</h2>
      <p className="reviews-subtitle">Manage and respond to client feedback</p>

      {/* Summary Section */}
      <div className="reviews-summary-card">
        <div className="rating-left">
          <h1 className="rating-score">{average_rating.toFixed(1)}</h1>
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                fill={i < Math.round(average_rating) ? "#FFD700" : "none"}
                stroke="#FFD700"
              />
            ))}
          </div>
          <p className="rating-total">{total_reviews} total reviews</p>
        </div>

        <div className="rating-right">
          {ratingCounts.map((count, idx) => {
            const stars = 5 - idx;
            return (
              <div key={stars} className="rating-bar-row">
                <span>{stars}★</span>
                <div className="rating-bar">
                  <div
                    className="rating-bar-fill"
                    style={{
                      width:
                        total_reviews > 0
                          ? `${(count / total_reviews) * 100}%`
                          : "0%",
                    }}
                  ></div>
                </div>
                <span className="rating-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="lawyer-reviews-list-container">
        {reviews.length === 0 ? (
          <p className="lawyer-no-reviews">No reviews yet for this lawyer.</p>
        ) : (
          reviews.map((rev) => (
            <div className="lawyer-review-card" key={rev.id}>
              {/* Header */}
              <div className="lawyer-review-header">
                <img
                  src={rev.user_photo || "/default-user.png"}
                  alt={rev.user_name || "User"}
                  className="lawyer-review-user-photo"
                />
                <div className="lawyer-review-user-details">
                  <h4 className="lawyer-review-user-name">
                    {rev.user_name || "Anonymous"}
                  </h4>
                  <p className="lawyer-review-date">
                    {rev.created_at
                      ? new Date(rev.created_at).toLocaleDateString()
                      : ""}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="lawyer-review-rating">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < rev.rating ? "#FFD700" : "none"}
                    stroke="#FFD700"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="lawyer-review-comment">{rev.comment}</p>

              {/* Reply Section */}
              <div className="lawyer-reply-section">
                {rev.reply && (
                  <div className="lawyer-review-reply-box">
                    <div className="lawyer-review-reply-header">
                      <strong>Your Reply:</strong>
                      <Edit3 size={15} className="lawyer-reply-edit-icon" />
                    </div>
                    <p className="lawyer-review-reply-text">{rev.reply}</p>
                  </div>
                )}

                <textarea
                  placeholder={
                    rev.reply
                      ? "Update your existing reply..."
                      : "Write a reply..."
                  }
                  value={replyText[rev.id] || ""}
                  onChange={(e) =>
                    setReplyText((prev) => ({
                      ...prev,
                      [rev.id]: e.target.value,
                    }))
                  }
                  className="lawyer-reply-textarea"
                />
                <button
                  onClick={() => handleReply(rev.id, rev.user_id, rev.reply)}
                  className="lawyer-reply-btn"
                >
                  <MessageSquare size={16} />{" "}
                  {rev.reply ? "Update Reply" : "Reply to Review"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
