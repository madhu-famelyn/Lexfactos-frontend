import React from "react";
import "./Footer.css";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Brand and description */}
        <div className="footer-brand">
          <h3>Lexfactos</h3>
          <p>
            Connecting clients with trusted legal professionals for over a decade.
          </p>
          <div className="footer-socials">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <div>
            <h4>For Clients</h4>
            <ul>
              <li><a href="#">Find a lawyer</a></li>
              <li><a href="#">How it works</a></li>
              <li><a href="#">Practice areas</a></li>
              <li><a href="#">Client reviews</a></li>
              <li><a href="#">Legal resources</a></li>
            </ul>
          </div>

          <div>
            <h4>For Lawyers</h4>
            <ul>
              <li><a href="#">Join our network</a></li>
              <li><a href="#">Lawyer dashboard</a></li>
              <li><a href="#">Support center</a></li>
              <li><a href="#">Appointments</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2024 Lexfactos. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
