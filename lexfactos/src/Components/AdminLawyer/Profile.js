import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLawyerDetails } from "../Service/Service";
import { FaClock, FaUniversity } from "react-icons/fa";
import { FaAward } from "react-icons/fa";


import "./Profile.css";

const LawyerProfile = () => {
  const { lawyerId } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const data = await getLawyerDetails(lawyerId);
        setLawyer(data);
      } catch (err) {
        console.error("Failed to load lawyer profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLawyer();
  }, [lawyerId]);

  if (loading) return <p className="loading-text">Loading lawyer details...</p>;
  if (!lawyer) return <p className="no-data-text">No details found.</p>;

return (
  <div className="lawyer-profile-container">
    <section className="lawyer-summary-section">
  <div className="lawyer-summary-card">
    <img
      src={lawyer.photo}
      alt={lawyer.full_name}
      className="lawyer-summary-photo"
    />
    <div className="lawyer-summary-details">
      <h2 className="lawyer-summary-name">{lawyer.full_name}</h2>
      <p className="lawyer-summary-court">
          <p className="lawyer-summary-court">
            <span className="lawyer-profile-item">
              <FaClock style={{ marginRight: "6px", color: "#555" }} />
              {lawyer.profile?.years_of_experience}+ years
            </span>

            <span className="lawyer-profile-item">
              <FaUniversity style={{ marginRight: "6px", color: "#555" }} />
              {lawyer.registration3?.court_admitted_to}
            </span>
          </p>
      </p>
      <div className="lawyer-summary-practice">
        <div className="practice-tags">
          {lawyer.registration3?.practice_area?.split(",").map((area, i) => (
            <span key={i} className="practice-tag">{area.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>


    {/* Profile */}
    <section className="lawyer-profile-section">
      <h2 className="section-title">About</h2>
      {lawyer.profile && (
        <>
<p className="lawyer-profile-item">Bio: {lawyer.profile.bio}</p>

      
<div className="lawyer-info-container">
  {/* Languages */}
  <div className="info-column">
    <h3 className="info-heading">Languages</h3>
    {lawyer.profile?.languages_spoken?.split(",").map((lang, i) => (
      <p key={i} className="info-item">{lang.trim()}</p>
    ))}
  </div>

  {/* Bar Registration */}
  <div className="info-column">
    <h3 className="info-heading">Bar Registration</h3>
    {lawyer.profile?.bar_details?.map((bar, i) => (
      <div key={i} className="bar-block">
        <p className="info-item">{bar.bar_association_name}</p>
        <p className="info-item">Reg. No: {bar.bar_license_number}</p>
        <p className="info-item">Enrolled: {bar.state}</p>
      </div>
    ))}
  </div>

  {/* Courts */}
  <div className="info-column">
    <h3 className="info-heading">Courts</h3>
    {lawyer.registration3?.court_admitted_to?.split(",").map((court, i) => (
      <p key={i} className="info-item">{court.trim()}</p>
    ))}
  </div>
</div>


<div className="education-section">
  <h3 className="education-heading">Education & Qualifications</h3>
  {lawyer.profile.education?.map((edu, i) => (
    <div className="education-item" key={i}>
      <span className="education-bullet"></span>
      <div className="education-content">
        <p className="education-degree">{edu.degree}</p>
        <p className="education-institute">{edu.college_name}</p>
        <p className="education-year">{edu.graduation_year} · {edu.result}</p>
      </div>
    </div>
  ))}
</div>




<h3 className="experience-heading">Professional Experience</h3>
<div className="experience-timeline">
  {lawyer.registration3.work_experience?.map((exp, i) => (
    <div className="experience-item" key={i}>
      <div className="experience-bullet"></div>
      <div className="experience-content">
        <p className="experience-role">{exp.role}</p>
        <p className="experience-company">{exp.company_name}</p>
        <p className="experience-duration">{exp.duration}</p>
        {exp.description && (
          <p className="experience-description">{exp.description}</p>
        )}
      </div>
    </div>
  ))}
</div>













         <h3 className="subsection-title">Case Results</h3>
{lawyer.registration4.case_results?.map((caseRes, i) => (
  <div className="lawyer-case-result" key={i}>
    <p>{caseRes.title}</p>
    <p>{caseRes.outcome}</p>
    <p>{caseRes.summary}</p>
    <p>{caseRes.court !== undefined ? caseRes.court : "N/A"} {caseRes.year !== undefined ? caseRes.year : "N/A"}</p>

  </div>
))}




<div className="awards-section">
      <h3 className="subsection-title">Awards & Recognition</h3>
      <div className="awards-grid">
        {lawyer.registration6.awards?.map((award, i) => (
          <div className="lawyer-award-item" key={i}>
            <FaAward className="award-icon" />
            <div className="award-text">
              <h4 className="award-name">{award.name}</h4>
              <p className="award-organization">{award.organization}</p>
              <p className="award-year">{award.year}</p>
              {award.description && (
                <p className="award-description">{award.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>



<div className="certifications-section">
      <h3 className="subsection-title">Certifications & Memberships</h3>
      <p className="cert-subtitle">Professional Certifications</p>
      <div className="certifications-grid">
        {lawyer.registration6.certifications?.map((cert, i) => (
          <div className="lawyer-certification-item" key={i}>
            <h4 className="cert-title">{cert.title}</h4>
            <p className="cert-issuer">{cert.issuer}</p>
            <div className="cert-dates">
              <span className="cert-issued">Issued: {cert.issued}</span>
              <span className="cert-validity">
                {cert.valid_until ? `Valid until ${cert.valid_until}` : "Lifetime"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
      )}
    </section>
  </div>
);

};

export default LawyerProfile;
