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
            <a href="javascript:void(0)"><FaTwitter /></a>
            <a href="javascript:void(0)"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <div>
            <h4>For Clients</h4>
            <ul>
              <li><a href="javascript:void(0)">Find a lawyer</a></li>
              <li><a href="javascript:void(0)">How it works</a></li>
              <li><a href="javascript:void(0)">Practice areas</a></li>
              <li><a href="javascript:void(0)">Client reviews</a></li>
              <li><a href="javascript:void(0)">Legal resources</a></li>
            </ul>
          </div>

          <div>
            <h4>For Lawyers</h4>
            <ul>
              <li><a href="javascript:void(0)">Join our network</a></li>
              <li><a href="javascript:void(0)">Lawyer dashboard</a></li>
              <li><a href="javascript:void(0)">Support center</a></li>
              <li><a href="javascript:void(0)">Appointments</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="javascript:void(0)">About us</a></li>
              <li><a href="javascript:void(0)">Contact</a></li>
              <li><a href="javascript:void(0)">Blog</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2024 Lexfactos. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="javascript:void(0)">Privacy Policy</a>
          <a href="javascript:void(0)">Terms of Service</a>
          <a href="javascript:void(0)">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
