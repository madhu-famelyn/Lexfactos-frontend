/**
 * ContactPage Component
 *
 * This page appears inside the Lawyer Dashboard layout.
 * The sidebar (LawyerPannel) stays on the left, and the contact
 * content appears on the right.
 */


import LawyerPannel from "../LaywerPannel/LawyerPannel";
import "./HelpCenter.css";

export default function ContactPage() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <LawyerPannel />

      {/* Main Content */}
      <div className="contact-container">
        <div className="contact-card">
          <h1>Contact Us</h1>

          <p className="contact-message">
            Need assistance? We’re here to help. You can reach our support team at:
          </p>

          <a href="mailto:admin@lexfactos.com" className="contact-email">
            admin@lexfactos.com
          </a>

          <p className="thank-note">We usually respond within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}
