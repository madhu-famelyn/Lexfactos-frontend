import React, { useState, useRef, useEffect } from "react";
import "./CustomDropDown.css";

const CustomDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef();

  const handleSelect = (option) => {
    onChange(option);
    setSearchValue(option);
    setOpen(false);
  };

  const displayValue = open ? searchValue : value || "";

  const filteredOptions = options
    .filter((opt) =>
      opt.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      const s = searchValue.toLowerCase();
      const aStarts = a.toLowerCase().startsWith(s);
      const bStarts = b.toLowerCase().startsWith(s);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      {label && <label className="dropdown-label">{label}</label>}

      <div className="dropdown-input-wrapper">
        <input
          className="dropdown-input"
          value={displayValue}
          placeholder={placeholder}
          onClick={() => {
            setOpen(true);
            setSearchValue("");
          }}
          onChange={(e) => {
            setSearchValue(e.target.value);
            if (!open) setOpen(true);
          }}
        />
      </div>

      {open && (
        <ul className="dropdown-list">
          {filteredOptions.length === 0 ? (
            <li className="dropdown-item no-results">No results found</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`dropdown-item ${
                  option === value ? "selected" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
