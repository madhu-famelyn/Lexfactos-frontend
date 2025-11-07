// src/Pages/LawyerAuth.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLawyerAuth } from "../../Context/LawyerContext";
import "./LawyerAuth.css";

const LawyerAuth = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useLawyerAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!uniqueId || !password) {
      setMessage("⚠️ Please enter both User Name and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://lexfactos-backend.fly.dev/lawyer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unique_id: uniqueId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.access_token;
        const lawyerId = data.lawyer_id || "";

        // ✅ Store in Context + LocalStorage
        login(token, lawyerId);

        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/lawyer-dashboard"), 1500);
      } else {
        setMessage(data.detail || "❌ Invalid User Name or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("⚠️ Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lawyer-auth-wrapper">
      <div className="lawyer-auth-card">
        <h2 className="lawyer-auth-title">Lawyer Login</h2>
        <p className="lawyer-auth-subtitle">
          Access your account using your credentials
        </p>

        <form onSubmit={handleLogin} className="lawyer-auth-form">
          <div className="lawyer-input-group">
            <label htmlFor="uniqueId">User Name</label>
            <input
              type="text"
              id="uniqueId"
              placeholder="Enter your User Name"
              value={uniqueId}
              onChange={(e) => setUniqueId(e.target.value)}
              required
            />
          </div>

          <div className="lawyer-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="lawyer-auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && <p className="lawyer-auth-message">{message}</p>}
        </form>

        <div className="lawyer-auth-links">
          <p>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/sign-up-lawyer")} className="link">
              Sign Up
            </span>
          </p>
          <p>
            Forgot your password?{" "}
            <span
              onClick={() => navigate("/change-lawyer-password")}
              className="link"
            >
              Reset Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LawyerAuth;
