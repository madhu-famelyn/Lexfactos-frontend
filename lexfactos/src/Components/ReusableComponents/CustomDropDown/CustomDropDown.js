import React, { useState, useRef, useEffect } from "react";
import "./CustomDropDown.css";
import { ChevronDown, ChevronUp } from "lucide-react";

const CustomDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      {label && <label className="dropdown-label">{label} </label>}
      <div
        className={`dropdown-selected ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span>{value || placeholder}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {open && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li
              key={index}
              className={`dropdown-item ${
                option === value ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
