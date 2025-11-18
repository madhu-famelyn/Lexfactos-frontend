import React, { useState, useRef, useEffect } from "react";

const practiceAreas = [
  "Corporate Law",
  "Commercial Law",
  "Civil Litigation",
  "Criminal Law",
  "Healthcare and Medical Law",
  "Family Law",
  "Taxation Law",
  "Property and Real Estate Law",
  "Intellectual Property (IP) Law",
  "Arbitration and Dispute Resolution",
];

export default function PracticeAreaDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected = value ? value.split(", ") : [];

  const toggleSelect = (area) => {
    let updated;

    if (selected.includes(area)) {
      updated = selected.filter((i) => i !== area);
    } else {
      updated = [...selected, area];
    }

    onChange(updated.join(", "));
  };

  // Close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <style>{`
        .pa-container {
          position: relative;
          font-family: 'Inter', sans-serif;
        }

        .pa-label {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .pa-display {
          width: 100%;
          min-height: 42px;
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
          padding: 10px;
          background: white;
          border: 1.6px solid #d0d5dd;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.2s;
        }

        .pa-display:hover {
          border-color: #030303ff;
        }

        .pa-tag {
          background: #eef2ff;
          color: #000000ff;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .pa-placeholder {
          color: #98a2b3;
          font-size: 14px;
        }

        .pa-menu {
          position: absolute;
          width: 100%;
          background: white;
          border: 1.5px solid #e4e7ec;
          border-radius: 10px;
          margin-top: 8px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          max-height: 240px;
          overflow-y: auto;
          animation: fadeDown .15s ease;
          z-index: 30;
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pa-item {
          padding: 10px 14px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: 0.15s;
          font-size: 14px;
        }

        .pa-item:hover {
          background: #d7d7d7ff;
        }

        .pa-item.selected {
          background: #cdcdcdff;
          font-weight: 600;
          color: #000000ff;
        }

        .checkmark {
          font-size: 16px;
          color: #000000ff;
        }
      `}</style>

      <div className="pa-container" ref={dropdownRef}>
        <label className="pa-label">Practice Area *</label>

        <div
          className="pa-display"
          onClick={() => setOpen(!open)}
        >
          {selected.length > 0 ? (
            selected.map((tag) => (
              <span key={tag} className="pa-tag">
                {tag}
              </span>
            ))
          ) : (
            <span className="pa-placeholder">Select Practice Areas</span>
          )}
        </div>

        {open && (
          <div className="pa-menu">
            {practiceAreas.map((area) => (
              <div
                key={area}
                className={`pa-item ${selected.includes(area) ? "selected" : ""}`}
                onClick={() => toggleSelect(area)}
              >
                {area}
                {selected.includes(area) && (
                  <span className="checkmark">✓</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
