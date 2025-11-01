import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Edit3, MessageSquare } from "lucide-react";
import { useLawyerAuth } from "../../Context/LawyerContext";
import LawyerPannel from "../LaywerPannel/LawyerPannel";
import "./ClientReviews.css";

const BASE_URL = "https://lexfactos-backend.fly.dev";

export default function LawyerReviews() {
  const { lawyerId, token } = useLawyerAuth();
  const [reviewsData, setReviewsData] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(true);

  // 🟩 Debug log - check if lawyerId and token are available
  useEffect(() => {
    console.log("🔹 Lawyer ID from context:", lawyerId);
    console.log("🔹 Token from context:", token);
    if (lawyerId) fetchReviews();
    else console.warn("⚠️ Lawyer ID is missing, skipping fetch...");
  }, [lawyerId]);

  // Fetch reviews API
  const fetchReviews = async () => {
    console.log("📡 Fetching reviews for lawyer:", lawyerId);
    try {
      const res = await axios.get(`${BASE_URL}/lawyer-rating/${lawyerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ API Response Data:", res.data);

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
  };

  // Handle reply API
  const handleReply = async (commentId, userId) => {
    if (!replyText[commentId]) return;
    try {
      console.log("✉️ Posting reply:", {
        lawyer_id: lawyerId,
        user_id: userId,
        comment_id: commentId,
        reply: replyText[commentId],
      });

      await axios.post(
        `${BASE_URL}/lawyer-rating/reply`,
        {
          lawyer_id: lawyerId,
          user_id: userId,
          comment_id: commentId,
          reply: replyText[commentId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Reply posted successfully!");
      await fetchReviews(); // refresh data
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
    } catch (err) {
      console.error("❌ Error posting reply:", err);
      if (err.response) {
        console.error("Response status:", err.response.status);
        console.error("Response data:", err.response.data);
      }
    }
  };

  // Conditional UI
  if (loading) return <div className="reviews-loading">Loading reviews...</div>;
  if (!reviewsData) return <div>No reviews found.</div>;

  const { average_rating = 0, total_reviews = 0, reviews = [] } = reviewsData;

  console.log("📊 Parsed Reviews:", reviews);

  // Compute breakdown
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (r) => reviews.filter((rev) => rev.rating === r).length
  );

  return (
    <div className="lawyer-reviews-container">
        <LawyerPannel/>
      <h2 className="reviews-title">Client Reviews</h2>
      <p className="reviews-subtitle">Manage and respond to client feedback</p>

      {/* Summary Card */}
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

        {/* <button className="filter-btn">
          <Filter size={16} /> Filter by Rating
        </button> */}
      </div>

      {/* Reviews List */}
 <div className="lawyer-reviews-list-container">
      {reviews.length === 0 ? (
        <p className="lawyer-no-reviews">No reviews yet for this lawyer.</p>
      ) : (
        reviews.map((rev) => (
          <div className="lawyer-review-card" key={rev.id}>
            {/* Header Section */}
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
            {rev.reply ? (
              <div className="lawyer-review-reply-box">
                <div className="lawyer-review-reply-header">
                  <strong>Your Reply:</strong>
                  <Edit3 size={15} className="lawyer-reply-edit-icon" />
                </div>
                <p className="lawyer-review-reply-text">{rev.reply}</p>
              </div>
            ) : (
              <div className="lawyer-reply-section">
                <textarea
                  placeholder="Write a reply..."
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
                  onClick={() => handleReply(rev.id, rev.user_id)}
                  className="lawyer-reply-btn"
                >
                  <MessageSquare size={16} /> Reply to Review
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
    </div>
  );
}
