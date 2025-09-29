import React from "react";
import "./SignUpLanding.css";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

const SignupLanding = () => {
  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">
          Create your <span className="brand">Lexfactos</span> account
        </h1>

        <p className="signup-subtext">
          Join thousands of users finding trusted legal professionals quickly
          and securely.
        </p>

        <button className="signup-btn google-btn">
          <FcGoogle className="google-icon" />
          Continue with Google
        </button>

        <button className="signup-btn email-btn">
          <MdEmail className="icon-email-icon" />
          Continue with Email
        </button>

        <p className="signup-footer">
          Don’t have an account?{" "}
          <a href="/signup" className="link">
            Create free account
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupLanding;
