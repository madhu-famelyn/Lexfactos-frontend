import React from "react";
import "./HelpCenter.css";

const HelpCenter = () => {
  return (
    <div className="help-center">
      <div className="help-content">
<h1
  className="help-title"
  style={{
    color: "white",
    fontFamily: "Geist, sans-serif",
    fontWeight: 600,
    fontStyle: "normal",
    fontSize: "32px", 
    lineHeight: "100%",
    letterSpacing: "-0.02em",
    verticalAlign: "middle",
  }}
>
  Hey👋, how can we help you today?
</h1>


        <p className="help-subtext">
          Whether you’re trying to book a lawyer, manage your account, or ask a
          legal question, we’ve got your back.
        </p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Type your question... we’ll help you out!"
            className="search-input"
          />
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
