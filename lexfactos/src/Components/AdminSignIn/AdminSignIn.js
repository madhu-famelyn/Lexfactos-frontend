import React, { useState } from "react";
import { adminLogin } from "../Service/Service";
import { useAuth } from "../Context/AuthContext";
import "./AdminSignIn.css";

const AdminSignIn = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await adminLogin(email, password);
      login(data.access_token); // store JWT + adminId in context & localStorage
      alert("Login successful ✅");
      window.location.href = "/admin-dashboard";
    } catch (err) {
      setError(err.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="signin-title">Sign in to Lexfactos</h1>

        <form className="signin-form" onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p className="signup-text">
          Don’t have an account?{" "}
          <a href="/" className="signup-link">
            Create free account
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignIn;
