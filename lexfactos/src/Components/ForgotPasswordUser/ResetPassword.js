// src/Pages/UserResetPassword.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetPassword.css";

const UserResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  // ✅ Extract token from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    let tokenParam = params.get("token");

    if (tokenParam && tokenParam.includes("&")) {
      // Removes tracking params like "&subid1="
      tokenParam = tokenParam.split("&")[0];
    }

    setToken(tokenParam);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setMessage("⚠️ Please enter your new password.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset successful! Redirecting...");
        setTimeout(() => navigate("/sign-in"), 2000);
      } else {
        setMessage(data.detail || "❌ Failed to reset password. Try again.");
      }
    } catch (error) {
      setMessage("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-reset-wrapper">
      <div className="user-reset-box">
        <h2 className="user-reset-title">Reset Your Password</h2>
        <p className="user-reset-subtitle">
          Enter your new password below to complete the reset.
        </p>

        <form onSubmit={handleSubmit} className="user-reset-form">
          <div className="user-reset-input-group">
            <label htmlFor="newPassword" className="user-reset-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="user-reset-input"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="user-reset-btn" disabled={loading}>
            {loading ? "Updating..." : "Reset Password"}
          </button>

          {message && <p className="user-reset-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserResetPassword;
