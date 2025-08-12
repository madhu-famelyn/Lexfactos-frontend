import React from "react";
import { MdEmail } from "react-icons/md";
import { FaLightbulb } from "react-icons/fa";
import "./HelpSection.css";

const HelpSection = () => {
  return (
    <div className="help-section">
      <div className="help-card">
        <h2 className="help-title">Still need help? Let’s talk.</h2>
        <p className="help-subtitle">
          We’re just a click away. Whether it’s a quick question or a big issue,
          we’re here to help.
        </p>
        <p className="help-line">
          <MdEmail className="help-icon email-icon" /> Email us: support@lexfactos.com
        </p>
        <p className="help-tip">
          <FaLightbulb className="help-icon tip-icon" /> Tip: Check our Help Center first—you might find
          your answer instantly!
        </p>
      </div>
    </div>
  );
};

export default HelpSection;
