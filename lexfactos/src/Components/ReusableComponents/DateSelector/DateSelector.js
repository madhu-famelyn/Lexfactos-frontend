// DateSelector.js
import React from "react";
import "./DateSelector.css";

const DateSelector = ({ value, onChange, name, label, required }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="custom-date-input"
      />
    </div>
  );
};

export default DateSelector;
