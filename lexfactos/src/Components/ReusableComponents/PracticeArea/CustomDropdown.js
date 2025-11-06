import React from "react";
import Select from "react-select";

export default function CustomDropdown({ options, value, onChange, placeholder, isMulti }) {
  return (
    <Select
      isMulti={isMulti}                                  // ✅ allow multiple selection
      options={options.map((item) => ({ value: item, label: item }))} // format to object
      value={value.map((v) => ({ value: v, label: v }))} // convert to react-select value format
      onChange={(selected) => onChange(selected.map((s) => s.value))}  // return clean array
      placeholder={placeholder}
      classNamePrefix="select"
    />
  );
}
