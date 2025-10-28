import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaPhone,
  FaCalendarAlt,
  FaShareAlt,
  FaChevronDown,
  FaChevronUp,
  FaTrophy,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "./LawyerDetails.css";
import { getLawyerById } from "../Service/Service";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// ✅ helper to auto fit all markers
function FitBounds({ addresses }) {
  const map = useMap();
  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const bounds = L.latLngBounds(
        addresses.map((a) => [parseFloat(a.latitude), parseFloat(a.longitude)])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [addresses, map]);
  return null;
}

export default function LawyerProfilePage() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMoreLocations, setShowMoreLocations] = useState(false);

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

  const addresses = lawyer.registration5?.[0]?.address || [];

  return (
    <div className="lawyer-profile-container">
      {/* HEADER */}
      <div className="lawyer-profile-header">
        <div className="lawyer-profile-left">
          <img
            src={lawyer.photo}
            alt={lawyer.full_name}
            className="lawyer-profile-photo"
          />

          <div className="lawyer-profile-info">
            <h1 className="lawyer-name">{lawyer.full_name}</h1>
            <p className="lawyer-designation">{lawyer.short_note}</p>
            <p className="lawyer-chamber-name">
              Kumar & Associates Law Chambers
            </p>

            <div className="lawyer-tags">
              <span>{lawyer.profile?.years_of_experience}+ Years</span>
              <span>{lawyer.registration3?.court_admitted_to}</span>
            </div>

            <div className="lawyer-rating-section">
              <span className="lawyer-star">⭐</span>
              <span className="lawyer-rating">{lawyer.rating || "4.8"}</span>
              <span className="lawyer-reviews">
                ({lawyer.reviews_count || "245 reviews"})
              </span>
            </div>

            <div className="lawyer-practice-areas">
              <span>Criminal Law</span>
              <span>Civil Law</span>
              <span>Corporate Law</span>
              <span>Family Law</span>
            </div>
          </div>
        </div>

        <div className="lawyer-profile-right">
          <a href={`tel:${lawyer.phone_number}`} className="lawyer-primary-btn">
            <FaPhone style={{ marginRight: "8px" }} />
            Call for Free Consultation ({lawyer.phone_number})
          </a>

          <button className="lawyer-secondary-btn">
            <FaCalendarAlt style={{ marginRight: "8px" }} />
            Schedule Appointment
          </button>

          <button className="lawyer-secondary-btn" onClick={handleShare}>
            <FaShareAlt style={{ marginRight: "6px" }} /> Share
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="lawyer-profile-container-full">
        <div className="lawyer-profile-columns">
          <div className="lawyer-left-column">
            {/* ABOUT */}
            <section className="lawyer-about-section">
              <h2 className="lawyer-section-title">About</h2>
              <p className="lawyer-about-text">{lawyer.profile?.bio}</p>
            </section>

            {/* EDUCATION */}
            <section className="education-section">
              <h2 className="education-section-h2">
                Education & Qualifications
              </h2>
              <ul>
                {lawyer.profile?.education?.map((edu, idx) => (
                  <li key={idx}>
                    <strong>{edu.degree}</strong>{" "}
                    <span className="college">{edu.college_name}</span>{" "}
                    ({edu.graduation_year})
                  </li>
                ))}
              </ul>
            </section>

            {/* EXPERIENCE */}
            <section>
              <h2 className="education-section-h2">Professional Experience</h2>
              <ul>
                {lawyer.registration3?.work_experience?.map((job, idx) => (
                  <li key={idx}>
                    <strong>{job.role}</strong>
                    <div>{job.company_name}</div>
                    <div>{job.duration}</div>
                    <div>{job.description}</div>
                  </li>
                ))}
              </ul>
            </section>

            {/* OFFICE LOCATIONS */}
            <section className="lawyer-office-section">
              <h2 className="education-section-h2">Office Locations</h2>

              {addresses.length > 0 ? (
                <>
                  {/* ✅ Leaflet Map replacing Google Map */}
                  <MapContainer
                    center={[
                      parseFloat(addresses[0].latitude),
                      parseFloat(addresses[0].longitude),
                    ]}
                    zoom={13}
                    style={{
                      width: "100%",
                      height: "400px",
                      borderRadius: "8px",
                      marginBottom: "1rem",
                    }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; OpenStreetMap contributors'
                    />
                    {addresses.map((addr, idx) => (
                      <Marker
                        key={idx}
                        position={[
                          parseFloat(addr.latitude),
                          parseFloat(addr.longitude),
                        ]}
                        icon={L.icon({
                          iconUrl:
                            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                        })}
                      >
                        <Popup>
                          <strong>{addr.street_address}</strong>
                          <br />
                          {addr.city}, {addr.state} – {addr.zip_code}
                        </Popup>
                      </Marker>
                    ))}
                    <FitBounds addresses={addresses} />
                  </MapContainer>

                  <div className="location-list">
                    {addresses.map((addr, idx) => (
                      <div key={idx} className="location-item">
                        <FaMapMarkerAlt className="location-icon" />
                        <div>
                          <p>
                            {addr.street_address}, {addr.city}, {addr.state} –{" "}
                            {addr.zip_code}
                          </p>
                          <a
                            href={`https://www.google.com/maps?q=${addr.latitude},${addr.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="get-directions-link"
                          >
                            View on Google Maps <FaExternalLinkAlt />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>No office locations available.</p>
              )}
            </section>

            {/* CERTIFICATIONS */}
            <section className="lawyer-certifications-section">
              <h2 className="education-section-h2">Certifications</h2>
              <ul>
                {lawyer.registration6?.certifications?.map((cert, idx) => (
                  <li key={idx}>
                    {cert.title} – {cert.issuer} ({cert.year})
                  </li>
                ))}
              </ul>

              <h2 className="education-section-h2">Awards & Recognition</h2>
              <ul className="awards-list">
                {lawyer.registration6?.awards?.map((award, idx) => (
                  <li key={idx} className="award-item">
                    <FaTrophy className="award-icon" />
                    <span>
                      {award.name} – {award.organization} ({award.year})
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
