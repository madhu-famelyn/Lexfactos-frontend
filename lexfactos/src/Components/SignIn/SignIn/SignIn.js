import React from "react";
import { FcGoogle } from "react-icons/fc";
import "./SignIn.css"
export default function SignIn() {
  return (
    <div className="signin-container">
      {/* Left Form Section */}
      <div className="signin-left">
        <h1 className="signin-title">Sign in to Lexfactos</h1>
        <p className="signin-subtitle">
          Sign up to find the right lawyer for your legal needs. <br />
          It's fast, simple, and free.
        </p>

     <button
  type="button"
  className="google-button"
  style={{
    height: "10.63px",
    minHeight: "40.63px",
    maxHeight: "40.63px",
    boxSizing: "border-box",
    lineHeight: "normal",
    alignSelf: "center"
  }}
>
  <FcGoogle size={20} /> <span>Continue with Google</span>
</button>



        <div className="divider">
            <span className="line"></span>
            <span className="divider-text">Or</span>
            <span className="line"></span>
        </div>


        <form>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter your email" />

          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="/" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="signup-link">
          Don’t have an account?{" "}
          <a href="/">Create free account</a>
        </p>
      </div>

      {/* Right Background Section */}
      <div className="signin-right">
        <div className="overlay-text">
          <h2>
            Trusted by professionals across India. Find the legal support you
            need.
          </h2>
          <p>
            Simplifying the way you find trusted lawyers across India.
          </p>
          <span className="brand-name">Lexfactos</span>
        </div>
      </div>
    </div>
  );
}
