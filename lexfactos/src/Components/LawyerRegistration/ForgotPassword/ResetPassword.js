import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const LawyerResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from URL
  const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    if (!token) {
      setMessage("❌ Invalid or missing token. Please check your email link.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("❌ Invalid token. Try requesting a new reset link.");
      return;
    }

    if (!password || !confirmPassword) {
      setMessage("⚠️ Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/lawyer/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          new_password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/lawyer-auth"), 2000);
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
    <div className="lawyer-reset-wrapper">
      <div className="lawyer-reset-box">
        <h2 className="lawyer-reset-title">Reset Password</h2>
        <p className="lawyer-reset-subtitle">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="lawyer-reset-form">
          <div className="lawyer-input-group">
            <label htmlFor="password" className="lawyer-reset-label">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="lawyer-reset-input"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="lawyer-input-group">
            <label htmlFor="confirmPassword" className="lawyer-reset-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="lawyer-reset-input"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="lawyer-reset-btn" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          {message && <p className="lawyer-reset-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default LawyerResetPassword;
