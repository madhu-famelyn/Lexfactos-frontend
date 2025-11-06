import React from "react";
import "./WorkingHours.css";

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
    <div className="working-hours-overlay">
      <div className="working-hours-popup">
        <h3>Choose Days and Hours</h3>

        <button className="close-workingHours" onClick={closePopup}>
          ✖
        </button>

        <div className="days-selector">
          {daysList.map((day) => (
            <button
              key={day}
              className={`day-btn ${selectedDays.includes(day) ? "active" : ""}`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="time-inputs">
          <input
            type="time"
            value={openTime}
            onChange={(e) => setOpenTime(e.target.value)}
          />
          <span>–</span>
          <input
            type="time"
            value={closeTime}
            onChange={(e) => setCloseTime(e.target.value)}
          />
        </div>

        <div className="popup-actions">
          <button className="save-btn" onClick={handleSaveWorkingHours}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
