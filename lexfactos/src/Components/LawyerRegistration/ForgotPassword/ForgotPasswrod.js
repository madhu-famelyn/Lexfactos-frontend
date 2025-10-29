// src/Pages/LawyerForgotPassword.js
import React, { useState } from "react";
import "./ForgotPassword.css";

const LawyerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email) {
      setMessage("⚠️ Please enter your registered email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://lexfactos-backend.fly.dev/lawyer/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset link sent successfully! Check your email.");
        setEmail("");
      } else {
        setMessage(data.detail || "❌ Failed to send reset link. Try again.");
      }
    } catch (error) {
      setMessage("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lawyer-fp-wrapper">
      <div className="lawyer-fp-box">
        <h2 className="lawyer-fp-title">Forgot Password</h2>
        <p className="lawyer-fp-subtitle">
          Enter your registered email to receive a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="lawyer-fp-form">
          <div className="lawyer-fp-input-group">
            <label htmlFor="email" className="lawyer-fp-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="lawyer-fp-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="lawyer-fp-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && <p className="lawyer-fp-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LawyerForgotPassword;
