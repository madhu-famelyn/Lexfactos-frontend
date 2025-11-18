// ✅ FULL UPDATED FILE — LawyerProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaPhone,
  FaCalendarAlt,
  FaShareAlt,
  FaTrophy,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";
import "./LawyerDetails.css";
import { getLawyerById } from "../Service/Service";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import AddComments from "../Comments/AddComments";
import L from "leaflet";

// -------------------------------------------------------------------
// ✅ FUNCTION: Convert Address → Latitude/Longitude (Geocoding)
// -------------------------------------------------------------------
async function geocodeAddress(fullAddress) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    fullAddress
  )}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon),
      };
    }
  } catch (error) {
    console.error("Geocoding error:", error);
  }

  // fallback - Charminar Hyderabad
  return { latitude: 17.3616, longitude: 78.4747 };
}

// -------------------------------------------------------------------
// Auto fit bounds for all markers
// -------------------------------------------------------------------
function FitBounds({ addresses }) {
  const map = useMap();

  useEffect(() => {
    if (!addresses || addresses.length === 0) return;

    const validCoords = addresses
      .map((a) => [a.latitude, a.longitude])
      .filter(([lat, lng]) => !isNaN(lat) && !isNaN(lng));

    if (validCoords.length > 0) {
      const bounds = L.latLngBounds(validCoords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [addresses, map]);

  return null;
}

// -------------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------------
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

        // Safe JSON parser
        const safeParse = (value) => {
          if (!value) return [];
          if (typeof value === "string") {
            try {
              return JSON.parse(value);
            } catch {
              return [];
            }
          }
          return value;
        };

        if (data.profile) {
          data.profile.bar_details = safeParse(data.profile.bar_details);
          data.profile.languages_spoken = safeParse(
            data.profile.languages_spoken
          );
          data.profile.education = safeParse(data.profile.education);
        }

        if (data.registration3) {
          data.registration3.work_experience = safeParse(
            data.registration3.work_experience
          );
        }

        // -------------------------------------------------------------------
        // 🟢 Convert all addresses → lat/lng using geocoding API
        // -------------------------------------------------------------------
        if (Array.isArray(data.registration5)) {
          const addressesRaw = safeParse(data.registration5[0].address);
          const resolved = [];

          for (const addr of addressesRaw) {
            const fullAddr = `${addr.street_address}, ${addr.city}, ${addr.state}, ${addr.zip_code}, ${addr.country}`;

            const geo = await geocodeAddress(fullAddr);

            resolved.push({
              ...addr,
              latitude: geo.latitude,
              longitude: geo.longitude,
            });
          }

          data.registration5[0].address = resolved;
        }

        if (data.registration6) {
          data.registration6.certifications = safeParse(
            data.registration6.certifications
          );
          data.registration6.awards = safeParse(data.registration6.awards);
        }

        setLawyer(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load lawyer details.");
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
            <p className="lawyer-designation">{lawyer.short_note || ""}</p>

            <div className="lawyer-tags">
              <span>{lawyer.profile?.years_of_experience || 0}+ Years</span>
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
              <p className="lawyer-about-text">{lawyer.profile?.bio || ""}</p>
            </section>

            {/* EDUCATION */}
            <section className="education-section">
              <h2 className="lawyer-section-title">
                Education & Qualifications
              </h2>
              <ul>
                {Array.isArray(lawyer.profile?.education) &&
                lawyer.profile.education.length > 0 ? (
                  lawyer.profile.education.map((edu, idx) => (
                    <li key={idx}>
                      <strong>{edu.degree}</strong>{" "}
                      <span className="college">{edu.college_name}</span>{" "}
                      ({edu.graduation_year})
                    </li>
                  ))
                ) : (
                  <p>No education details available.</p>
                )}
              </ul>
            </section>

            {/* WORKING HOURS */}
            <section className="lawyer-working-hours-section">
              <h2 className="lawyer-section-title">Working Hours</h2>
              {lawyer.working_hours && lawyer.working_hours.length > 0 ? (
                <ul className="working-hours-list">
                  {lawyer.working_hours.map((slot, idx) => (
                    <li key={idx} className="working-hour-item">
                      <strong>{slot.day}</strong>: {slot.time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Available Monday to Friday, 9:00 AM – 6:00 PM</p>
              )}
            </section>

            {/* EXPERIENCE */}
            <section>
              <h2 className="lawyer-section-title">Professional Experience</h2>
              <ul>
                {Array.isArray(lawyer.registration3?.work_experience) &&
                lawyer.registration3.work_experience.length > 0 ? (
                  lawyer.registration3.work_experience.map((job, idx) => (
                    <li key={idx}>
                      <strong>{job.role}</strong>
                      <div>{job.company_name}</div>
                      <div>{job.duration}</div>
                      <div>{job.description}</div>
                    </li>
                  ))
                ) : (
                  <p>No professional experience available.</p>
                )}
              </ul>
            </section>

            {/* OFFICE LOCATIONS */}
            <section className="lawyer-office-section">
              <h2 className="lawyer-section-title">Office Locations</h2>

              {addresses.length > 0 ? (
                <>
                  <MapContainer
                    center={[addresses[0].latitude, addresses[0].longitude]}
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
                      attribution="&copy; OpenStreetMap contributors"
                    />

                    {addresses.map((addr, idx) => (
                      <Marker
                        key={idx}
                        position={[addr.latitude, addr.longitude]}
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
              <h2 className="lawyer-section-title">Certifications</h2>
              <ul>
                {Array.isArray(lawyer.registration6?.certifications) &&
                lawyer.registration6.certifications.length > 0 ? (
                  lawyer.registration6.certifications.map((cert, idx) => (
                    <li key={idx}>
                      {cert.title} – {cert.issuer} ({cert.year})
                    </li>
                  ))
                ) : (
                  <p>No certifications available.</p>
                )}
              </ul>

              <h2 className="lawyer-section-title">Awards & Recognition</h2>
              <ul className="awards-list">
                {Array.isArray(lawyer.registration6?.awards) &&
                lawyer.registration6.awards.length > 0 ? (
                  lawyer.registration6.awards.map((award, idx) => (
                    <li key={idx} className="award-item">
                      <FaTrophy className="award-icon" />
                      <span>
                        {award.name} – {award.organization} ({award.year})
                      </span>
                    </li>
                  ))
                ) : (
                  <p>No awards available.</p>
                )}
              </ul>
            </section>

            {/* COMMENTS */}
            <AddComments lawyerId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
