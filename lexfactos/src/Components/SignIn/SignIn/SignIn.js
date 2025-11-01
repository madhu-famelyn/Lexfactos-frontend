// src/pages/auth/SignIn.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./SignIn.css";
import { loginUser, loginWithGoogle } from "../../Service/Service";
import { useAuth } from "../../Context/UserContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await loginUser(email, password);

      const decoded = jwtDecode(data.access_token);
      const userId = decoded.sub;

      const userInfo = { id: userId, email };

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);

      login(userInfo, data.access_token, data.token_type);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response?.data?.detail) {
        if (err.response.data.detail === "Invalid credentials") {
          setMessage("Username or password is incorrect.");
        } else {
          setMessage(err.response.data.detail);
        }
      } else {
        setMessage("Username or password is incorrect.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const credential = response.credential;
      const data = await loginWithGoogle(credential);

      const decoded = jwtDecode(data.access_token);
      const userId = decoded.sub;

      const userInfo = { id: userId, email: "google_user" };

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("token_type", data.token_type);

      login(userInfo, data.access_token, data.token_type);

      alert("Google login successful!");
      navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err);
      if (err.response?.data?.detail) {
        setMessage(err.response.data.detail);
      } else {
        setMessage("Google Username or password is incorrect.");
      }
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

        {/* Google Login Section */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <div className="google-login-wrapper">
         <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={handleGoogleFailure}
  useOneTap={false}
  ux_mode="popup"
  theme="outline"
  shape="rectangular"
  text="signin_with"
  type="standard"
  size="large"
  prompt="select_account"
  // 👇 prevent showing logged-in email
  auto_select={false}
/>

            </div>
          </div>
        </div>

        <div className="divider">
          <span className="line"></span>
          <span className="divider-text">Or</span>
          <span className="line"></span>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password-user" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {message && <p className="form-message">{message}</p>}
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
