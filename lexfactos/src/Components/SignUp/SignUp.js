import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // import useNavigate
import "./SignUp.css";
import { signupUser } from "../Service/Service";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null); // preview URL
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // initialize navigate

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // set preview image
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      formData.append("mobile_number", mobileNumber);
      formData.append("password", password);
      if (photo) {
        formData.append("photo", photo);
      }

      const data = await signupUser(formData);

      setMessage(`Signup successful! Welcome, ${data.full_name}`);

      // Redirect to Sign-In page after successful signup
      navigate("/sign-in");
    } catch (err) {
      setMessage(err.detail || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side */}
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

      {/* Right Side */}
      <div className="signup-right">
        <h2>Create your Lexfactos account</h2>
        <p>
          Sign up to find the right lawyer for your legal needs. <br />
          It’s fast, simple, and free.
        </p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="profile-upload">
            <div className="circle">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <i className="camera-icon"></i>
              )}
            </div>
            <label className="upload-btn">
              <FaUpload className="upload-icon" /> Upload Profile Photo
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </div>

          <input
            type="text"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {message && <p style={{ marginTop: "10px" }}>{message}</p>}

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
