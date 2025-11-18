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
      login(data.access_token);
      alert("Login successful ✅");
      window.location.href = "/admin-dashboard";
    } catch (err) {
      setError(err.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-signin-container">
      <div className="admin-signin-box">
        <h1 className="admin-signin-title">Sign in to Lexfactos</h1>

        <form className="admin-signin-form" onSubmit={handleSubmit}>
          <label className="admin-label">Email address</label>
          <input
            className="admin-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="admin-label">Password</label>
          <input
            className="admin-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="admin-signin-btn"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && <p className="admin-error-text">{error}</p>}
      </div>
    </div>
  );
};

export default AdminSignIn;
