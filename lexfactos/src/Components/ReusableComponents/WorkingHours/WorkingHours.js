import React from "react";
import "./WorkingHours.css"; // Keep using your existing CSS file

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WorkingHoursPopup({
  selectedDays,
  toggleDay,
  openTime,
  closeTime,
  setOpenTime,
  setCloseTime,
  handleSaveWorkingHours,
  closePopup,
}) {
  return (
    <div className="whp-overlay">
      <div className="whp-popup">
        <h3 className="whp-title">Choose Days and Hours</h3>

        <button className="whp-close-btn" onClick={closePopup}>
          ✖
        </button>

        <div className="whp-days">
          {daysList.map((day) => (
            <button
              key={day}
              className={`whp-day-btn ${
                selectedDays.includes(day) ? "whp-day-active" : ""
              }`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="whp-time-inputs">
          <input
            type="time"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
          />
          <span className="whp-separator">–</span>
          <input
            type="time"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
          />
        </div>

        <div className="whp-actions">
          <button className="whp-save-btn" onClick={handleSaveWorkingHours}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
