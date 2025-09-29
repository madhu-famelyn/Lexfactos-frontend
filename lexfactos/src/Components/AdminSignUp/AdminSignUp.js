import React from "react";
import "./AdminSignUp.css";  

const AdminSignUp = () => {     
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1 className="signin-title">Sign up for Lexfactos</h1>

        <form className="signin-form">
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email address</label>
          <input type="email" placeholder="Enter your email" />

          <label>Mobile Number</label>
          <input type="text" placeholder="Enter your mobile number" />

          <label>Password</label> 
          <input type="password" placeholder="Enter your password" />

          <button type="submit" className="signin-btn">
            Sign Up
          </button>
        </form>

        <p className="signup-text">
          Already have an account?{" "}
          <a href="/admin-signin" className="signup-link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignUp;
