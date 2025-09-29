import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./SignIn.css";
import { loginUser, loginWithGoogle } from "../../Service/Service";
import { useAuth } from "../../Context/UserContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // Use auth context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await loginUser(email, password);

      // Save in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);

      // Store in auth context
      login({ email }, data.access_token, data.token_type);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setMessage(err.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const credential = response.credential;
      const data = await loginWithGoogle(credential);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);

      // Google returns only basic info, you can decode JWT if needed
      const userInfo = { email: "google_user" }; // optionally parse from JWT

      login(userInfo, data.access_token, data.token_type);

      alert("Google login successful!");
      navigate("/");
    } catch (err) {
      setMessage(err.detail || "Google login failed.");
    }
  };

  const handleGoogleFailure = () => {
    setMessage("Google login was unsuccessful. Please try again.");
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <h1 className="signin-title">Sign in to Lexfactos</h1>
        <p className="signin-subtitle">
          Sign up to find the right lawyer for your legal needs. <br />
          It's fast, simple, and free.
        </p>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />

        <div className="divider">
          <span className="line"></span>
          <span className="divider-text">Or</span>
          <span className="line"></span>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </form>

        <p className="signup-link">
          Don’t have an account?{" "}
          <span
            style={{ color: "#007bff", cursor: "pointer" }}
            onClick={() => navigate("/sign-up")}
          >
            Create free account
          </span>
        </p>
      </div>

      <div className="signin-right">
        <div className="overlay-text">
          <h2>
            Trusted by professionals across India. Find the legal support you
            need.
          </h2>
          <p>Simplifying the way you find trusted lawyers across India.</p>
          <span className="brand-name">Lexfactos</span>
        </div>
      </div>
    </div>
  );
}

