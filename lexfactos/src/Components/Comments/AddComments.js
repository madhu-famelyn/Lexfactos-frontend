import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import {
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaPlus,
  FaEdit,
} from "react-icons/fa";
import "./AddComments.css";

export default function AddComments({ lawyerId }) {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const BASE_URL = "https://api.lexfactos.com";

  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [openReplyId, setOpenReplyId] = useState(null);

  // 🆕 Edit Review Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editLoading, setEditLoading] = useState(false);

  // 🕒 Format time ago
  const timeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  // 📥 Fetch reviews
  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/lawyer-rating/${lawyerId}`);
      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      setAvgRating(data.average_rating || 0);
      setTotalReviews(data.total_reviews || 0);
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("❌ Fetch reviews failed:", err);
    }
  }, [lawyerId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // ✍️ Toggle input box
  const handleWriteClick = () => {
    if (!auth?.user?.id) {
      setShowPopup(true);
      return;
    }
    setShowInput(!showInput);
  };

  // 🚀 Submit Review
  const handleSubmit = async () => {
    if (!comment.trim()) {
      setMessage("⚠️ Please enter a comment before submitting.");
      return;
    }

    setLoading(true);
    setMessage("");

    const payload = {
      rating,
      comment,
      user_id: auth.user.id,
      lawyer_id: lawyerId,
    };

    try {
      const res = await fetch(`${BASE_URL}/lawyer-rating/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${auth?.token_type || "Bearer"} ${auth?.token || ""}`,
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        // HTML or empty body -> avoid JSON error
        console.warn("⚠️ Non-JSON response received from backend");
      }

      console.log("📥 Response status:", res.status);
      console.log("📥 Response body:", data);

      if (!res.ok) {
        const errorMsg = data?.detail || "Failed to submit review";
        setMessage(`❌ ${errorMsg}`);
        return;
      }

      // ✅ Success
      setMessage("✅ Review submitted successfully!");
      setComment("");
      setShowInput(false);
      fetchReviews();
    } catch (err) {
      console.error("❌ Review submission failed:", err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Open Edit Modal
  const handleEditClick = (review) => {
    setEditReview(review);
    setEditComment(review.comment);
    setEditRating(review.rating);
    setEditModalOpen(true);
  };

  // 💾 Submit Edit
  const handleEditSubmit = async () => {
    if (!editComment.trim()) return;

    setEditLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/lawyer-rating/${editReview.id}/${auth.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth?.token_type || "Bearer"} ${auth?.token || ""}`,
          },
          body: JSON.stringify({
            rating: editRating,
            comment: editComment,
          }),
        }
      );

      let data = null;
      try {
        data = await res.json();
      } catch {
        console.warn("⚠️ Non-JSON response during update");
      }

      if (!res.ok) {
        const errorMsg = data?.detail || "Failed to update review";
        setMessage(`❌ ${errorMsg}`);
        return;
      }

      setEditModalOpen(false);
      setMessage("✅ Review updated successfully!");
      fetchReviews();
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="reviews-container">
      {/* ======= HEADER ======= */}
      <div className="reviews-header-top">
        <h2>Client Reviews</h2>
        <div className="avg-rating-box">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              color={i < Math.round(avgRating) ? "#facc15" : "#d1d5db"}
              size={18}
            />
          ))}
          <span className="avg-rating-value">{avgRating.toFixed(1)}</span>
          <span className="review-count">({totalReviews} reviews)</span>
        </div>
      </div>

      {/* ======= ACTIONS ======= */}
      <div className="review-controls">
        <div className="filter-text">
          Showing {totalReviews} of {totalReviews} reviews
        </div>
        <button className="write-review-btn" onClick={handleWriteClick}>
          <FaPlus /> Write a Review
        </button>
      </div>

      {/* ======= MESSAGE ======= */}
      {message && <p className="comment-message">{message}</p>}

      {/* ======= ADD COMMENT BOX ======= */}
      {showInput && (
        <div className="comment-input-box">
          <label className="rating-label">
            Rating:
            <select
              className="rating-select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} ⭐
                </option>
              ))}
            </select>
          </label>
          <textarea
            className="comment-textarea"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="submit-comment-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      )}

      {/* ======= REVIEWS LIST ======= */}
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to write one!</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="review-card">
             
              <div className="review-content">
                <div className="review-top">
                  <div className="review-user-info">
                    <span className="review-name">{rev.user_name}</span>
                    <div className="review-stars">
                      {[...Array(rev.rating)].map((_, i) => (
                        <FaStar key={i} color="#facc15" size={14} />
                      ))}
                    </div>
                  </div>
                  <span className="review-time">{timeAgo(rev.created_at)}</span>
                </div>

                <p className="review-comment">{rev.comment}</p>

                {/* ✅ Show edit button only if user owns this review */}
                {auth?.user?.id &&
                  String(auth.user.id) === String(rev.user_id) && (
                    <button
                      className="edit-review-btn"
                      onClick={() => handleEditClick(rev)}
                    >
                      <FaEdit /> Edit
                    </button>
                  )}

                {rev.reply && (
                  <div className="review-reply">
                    <button
                      className="view-reply-btn"
                      onClick={() =>
                        setOpenReplyId(openReplyId === rev.id ? null : rev.id)
                      }
                    >
                      {openReplyId === rev.id ? (
                        <>
                          Hide Reply <FaChevronUp />
                        </>
                      ) : (
                        <>
                          View Reply <FaChevronDown />
                        </>
                      )}
                    </button>
                    {openReplyId === rev.id && (
                      <div className="reply-box">
                        <p className="reply-text">{rev.reply}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ======= SIGN-IN POPUP ======= */}
      {showPopup && (
        <div className="signin-popup-overlay">
          <div className="signin-popup-box">
            <h3>Sign In Required</h3>
            <p>Please sign in to write a review.</p>
            <div className="popup-actions">
              <button
                className="popup-btn-signin-btn"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
              <button
                className="popup-btn-cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🆕 EDIT REVIEW MODAL */}
      {editModalOpen && (
        <div className="edit-review-overlay">
          <div className="edit-review-modal">
            <h3>Edit Your Review</h3>

            <label className="rating-label">
              Rating:
              <select
                className="rating-select"
                value={editRating}
                onChange={(e) => setEditRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} ⭐
                  </option>
                ))}
              </select>
            </label>

            <textarea
              className="edit-comment-textarea"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />

            <div className="edit-actions">
              <button
                className="save-edit-btn"
                onClick={handleEditSubmit}
                disabled={editLoading}
              >
                {editLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                className="cancel-edit-btn"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
