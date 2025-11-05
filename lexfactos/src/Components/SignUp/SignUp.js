import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import axios from "axios";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Prepare URL-encoded form data
      const formData = new URLSearchParams();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("mobile_number", mobileNumber);
      formData.append("password", password);

      const response = await axios.post(
        "https://lexfactos-backend.fly.dev/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      setMessage(`Signup successful! Welcome, ${response.data.full_name}`);

      // Redirect to Sign-In page after short delay
      setTimeout(() => navigate("/sign-in"), 1500);
    } catch (error) {
      console.error("Signup error:", error);
      const errMsg =
        error.response?.data?.detail || "Signup failed. Please try again.";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Left Section */}
      <div className="signup-left">
        <h1>
          Welcome to <span className="brand">Lexfactos</span>
        </h1>
        <p>
          Join our community to access verified lawyer profiles and simplify
          your legal search experience.
        </p>

        <div className="testimonial">
          <div className="stars">★★★★★</div>
          <p>
            Lexfactos made it incredibly easy to find the right lawyer for my
            case. The process was quick and reliable.
          </p>
          <div className="user-info">
            <img
              src="https://via.placeholder.com/30"
              alt="User"
              className="user-img"
            />
            <div>
              <h4>Aanya Patel</h4>
              <span>Lexfactos User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="signup-right">
        <h2>Create your Lexfactos account</h2>
        <p>
          Sign up to find the right lawyer for your legal needs. <br />
          It’s fast, simple, and free.
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            className="form-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-input"
            placeholder="Mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgot-password-user" className="forgot">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {message && (
            <p
              style={{
                marginTop: "10px",
                color:
                  message.includes("successful") || message.includes("Welcome")
                    ? "green"
                    : "red",
              }}
            >
              {message}
            </p>
          )}

          <p className="create-account">
            Already have an account?{" "}
            <span
              style={{ color: "#007bff", cursor: "pointer" }}
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
