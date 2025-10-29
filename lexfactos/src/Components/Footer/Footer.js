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
            <a href="/coming-soon" ><FaTwitter /></a>
            <a href="/coming-soon" ><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer-links">
          <div>
            <h4>For Clients</h4>
            <ul>
              <li><a href="/coming-soon" >Find a lawyer</a></li>
              <li><a href="/coming-soon" >How it works</a></li>
              <li><a href="/coming-soon" >Practice areas</a></li>
              <li><a href="/coming-soon" >Client reviews</a></li>
              <li><a href="/coming-soon" >Legal resources</a></li>
            </ul>
          </div>

          <div>
            <h4>For Lawyers</h4>
            <ul>
              <li><a href="/coming-soon" >Join our network</a></li>
              <li><a href="/coming-soon" >Lawyer dashboard</a></li>
              <li><a href="/coming-soon" >Support center</a></li>
              <li><a href="/coming-soon" >Appointments</a></li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/coming-soon" >About us</a></li>
              <li><a href="/coming-soon" >Contact</a></li>
              <li><a href="/coming-soon" >Blog</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2024 Lexfactos. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="/coming-soon" >Privacy Policy</a>
          <a href="/coming-soon" >Terms of Service</a>
          <a href="/coming-soon" >Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
