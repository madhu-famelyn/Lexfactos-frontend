import React, { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { FaRegQuestionCircle } from "react-icons/fa";
import { SlMagnifier } from "react-icons/sl";
import { MdEmail, MdConfirmationNumber } from "react-icons/md"; // Material icons for email and ticket
import "./SupportPage.css";

const faqs = [
  {
    question: "I forgot my password. How can I reset it?",
    answer: "Go to the Sign In page, click Forgot Password, and follow the link sent to your email."
  },
  {
    question: "How do I update my email address?",
    answer: "Sign in to your account, go to Settings > Account Info, and update your email."
  },
  {
    question: "Why didn’t I receive the verification email?",
    answer: "Check your spam folder or add support@lexfactos.com to your contacts. If you still don’t see it, request a new verification email."
  },
  {
    question: "My account is locked. What should I do?",
    answer: "Contact us via email at support@lexfactos.com to unlock your account within 24 hours."
  },
  {
    question: "Can I delete my Lexfactos account?",
    answer: "Yes, email our support team with your request, and we'll process it within 48 hours."
  }
];

const SupportPage = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="support-page">
      {/* Left section */}
      <div className="support-left">
        <input
          type="text"
          placeholder="Search within Account & Sign in Topics.."
          className="search-bar"
        />

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className={`faq-item ${isOpen ? "open" : ""}`}
              >
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {isOpen ? <SlArrowUp /> : <SlArrowDown />}
                  </span>
                </div>
                {isOpen && (
                  <div className="faq-answer" style={{ marginTop: 8 }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right section */}
      <div className="support-right">
        <div className="help-card">
  <h3>
    <FaRegQuestionCircle className="help-icon" />
    Need Help quickly
  </h3>


        <div className="help-option" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <MdEmail size={24} />
        <div>
            <p style={{ margin: 0 }}>Email Support</p>
            <small>support@lexfactos.com</small>
        </div>
        </div>
          <div className="help-option">
            <MdConfirmationNumber size={24} />
            <p style={{ marginLeft: 8 }}>Raise Ticket</p>
          </div>
        </div>

        <div className="related-topics">
            <h4>Related topics</h4>
            <a href="/" className="related-link">
                Find Lawyer <SlArrowRight />
            </a>
            <a href="/" className="related-link">
                Booking Appointments <SlArrowRight />
            </a>
            <a href="/" className="related-link">
                Free Legal Advice <SlArrowRight />
            </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
