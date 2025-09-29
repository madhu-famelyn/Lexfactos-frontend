import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPhone, FaCalendarAlt, FaShareAlt } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";
import "./LawyerDetails.css";
import { getLawyerById } from "../Service/Service";

export default function LawyerProfilePage() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getLawyerById(id);
        setLawyer(data);
      } catch (err) {
        setError("Failed to load lawyer details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyer();
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this lawyer profile",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  if (!lawyer) return <p>No lawyer found.</p>;

  return (
    <div className="lawyer-profile-container">
      <div className="lawyer-profile-header">
        {/* LEFT SECTION */}
        <div className="lawyer-profile-left">
          <img
            src={lawyer.photo}
            alt={lawyer.full_name}
            className="lawyer-profile-photo"
          />

          <div className="lawyer-profile-info">
            {/* Top Badges */}
            <div className="lawyer-top-badges">
              <span className="lawyer-verified">Verified Lawyer</span>
              <span className="lawyer-role">Senior Advocate</span>
            </div>

            {/* Name + Designation */}
            <h1 className="lawyer-name">{lawyer.full_name}</h1>
            <p className="lawyer-designation">{lawyer.short_note}</p>
            <p className="lawyer-chamber-name">
              Kumar & Associates Law Chambers
            </p>

            {/* Tags */}
            <div className="lawyer-tags">
              <span>{lawyer.profile?.years_of_experience}+ Years</span>
              <span>{lawyer.registration3?.court_admitted_to}</span>
            </div>

            {/* Rating */}
            <div className="lawyer-rating-section">
              <span className="lawyer-star">⭐</span>
              <span className="lawyer-rating">{lawyer.rating || "4.8"}</span>
              <span className="lawyer-reviews">
                ({lawyer.reviews_count || "245 reviews"})
              </span>
            </div>

            {/* Practice Areas */}
            <div className="lawyer-practice-areas">
              <span>Criminal Law</span>
              <span>Civil Law</span>
              <span>Corporate Law</span>
              <span>Family Law</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lawyer-profile-right">
          <a href={`tel:${lawyer.phone_number}`} className="lawyer-primary-btn">
            <FaPhone style={{ marginRight: "8px" }} />
            Call for Free Consultation ({lawyer.phone_number})
          </a>

          <button className="lawyer-secondary-btn">
            <FaCalendarAlt style={{ marginRight: "8px" }} /> Schedule Appointment
          </button>

          <button className="lawyer-secondary-btn" onClick={handleShare}>
            <FaShareAlt style={{ marginRight: "6px" }} /> Share
          </button>
        </div>
      </div>

      <div className="lawyer-profile-container">
        <div className="lawyer-profile-columns">
          {/* Left Column */}
          <div className="lawyer-left-column">
            {/* About */}
            <section className="lawyer-about-section">
              <h2 className="lawyer-section-title">About</h2>
              <p className="lawyer-about-text">
                Advocate Rajesh Kumar is a distinguished Senior Advocate with
                over 20 years of extensive experience in various fields of law.
                He has been practicing in the Delhi High Court and Supreme Court
                of India, specializing in Criminal Law, Civil Litigation,
                Corporate Law, and Family Disputes.
              </p>
            </section>

            {/* Languages, Bar Registration, Courts */}
            <section className="lawyer-info-section">
              <div className="lawyer-info-block">
                <h3 className="lawyer-info-title">Languages</h3>
                <ul className="lawyer-info-list">
                  <li>Hindi</li>
                  <li>English</li>
                  <li>Punjabi</li>
                  <li>Urdu</li>
                </ul>
              </div>
              <div className="lawyer-info-block">
                <h3 className="lawyer-info-title">BarRegistration</h3>
                <p>Bar Council of Delhi</p>
                <p>Reg. No: D/1234/2003</p>
                <p>Enrolled: 2003</p>
              </div>
              <div className="lawyer-info-block">
                <h3 className="lawyer-info-title">Courts</h3>
                <ul className="lawyer-info-list">
                  <li>Supreme Court of India</li>
                  <li>Delhi High Court</li>
                  <li>District Courts</li>
                </ul>
              </div>
            </section>

            {/* Education */}
            <section className="education-section">
              <h2>Education & Qualifications</h2>
              <ul>
                {lawyer.profile?.education?.map((edu, idx) => (
                  <li key={idx}>
                    <strong>{edu.degree}</strong>
                    <span className="college">{edu.college_name}</span>
                    <span className="details">
                      {edu.graduation_year}{" "}
                      {edu.additional_info && `• ${edu.additional_info}`}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Professional Experience */}
            <section>
              <h2>Professional Experience</h2>
              <ul>
                {lawyer.registration3?.work_experience?.map((job, idx) => (
                  <li key={idx}>
                    <strong>{job.role}</strong>
                    <div className="company">{job.company_name}</div>
                    <div className="duration">{job.duration}</div>
                    <div className="description">{job.description}</div>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column */}
          <div className="lawyer-right-column">
            {/* Overview */}
            <section className="lawyer-overview-section">
              <h2 className="lawyer-section-title">Overview</h2>
              <div className="lawyer-overview-grid">
                <div className="lawyer-overview-card">
                  <h3>500+</h3>
                  <p>Cases Won</p>
                </div>
                <div className="lawyer-overview-card">
                  <h3>20+</h3>
                  <p>Years Experience</p>
                </div>
                <div className="lawyer-overview-card">
                  <h3>95%</h3>
                  <p>Success Rate</p>
                </div>
                <div className="lawyer-overview-card">
                  <h3>4.8/5</h3>
                  <p>Rating</p>
                </div>
              </div>
            </section>

            {/* Office Location */}
            <section className="lawyer-office-section">
              <h2 className="lawyer-section-title">Office Location</h2>
              <p>
                {lawyer.registration5?.[0]?.street_address},{" "}
                {lawyer.registration5?.[0]?.city},{" "}
                {lawyer.registration5?.[0]?.state} –{" "}
                {lawyer.registration5?.[0]?.zip_code}
              </p>
              <iframe
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: "8px", marginTop: "1rem" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${lawyer.registration5?.[0]?.latitude},${lawyer.registration5?.[0]?.longitude}&z=15&output=embed`}
              />
            </section>
          </div>
        </div>
      </div>

      {/* Certifications & Awards */}
      <section>
        <h2>Certifications</h2>
        <ul>
          {lawyer.registration6?.certifications?.map((cert, idx) => (
            <li key={idx}>
              {cert.title} – {cert.issuer} ({cert.year})
            </li>
          ))}
        </ul>

        <div className="awards-container">
          <h2>Awards & Recognition</h2>
          <ul className="awards-list">
            {lawyer.registration6?.awards?.map((award, idx) => (
              <li key={idx} className="award-item">
                <FaTrophy className="award-icon" />
                <span className="award-details">
                  {award.name} – {award.organization} ({award.year})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
