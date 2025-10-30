import React, { useState } from "react";
import "./ForgotPassword.css";

const UserForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://lexfactos-backend.fly.dev/user/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("✅ Password reset link sent successfully! Check your email.");
        setEmail("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "❌ Failed to send reset link. Try again.");
      }
    } catch (error) {
      setMessage("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-forgot-wrapper">
      <div className="user-forgot-box">
        <h2 className="user-forgot-title">Forgot Password</h2>
        <p className="user-forgot-subtitle">
          Enter your registered email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="user-forgot-form">
          <div className="user-forgot-input-group">
            <label htmlFor="email" className="user-forgot-label">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="user-forgot-input"
            />
          </div>

          <button
            type="submit"
            className="user-forgot-btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && <p className="user-forgot-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserForgotPassword;
