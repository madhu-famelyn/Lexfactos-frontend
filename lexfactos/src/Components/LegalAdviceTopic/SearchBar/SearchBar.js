import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const [state, setState] = useState("All states");

  const handleSearch = () => {
    console.log("Searching for:", keyword, "in", state);
  };

  return (
    <div className="sb-wrapper-unique">
      {/* Tag */}
    <div className="sb-tag-unique">LEGAL RESOURCES</div>


      {/* Heading */}
      <h2 className="sb-heading-unique">
        Get Answers. Make Informed Legal Decisions.
      </h2>

      {/* Search Row */}
      <div className="sb-row-unique">
        <div className="sb-input-wrapper-unique">
          <FaSearch className="sb-icon-unique" />
          <input
            type="text"
            placeholder="Search for keywords of your issue"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <select
          className="sb-dropdown-unique"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option>All states</option>
          <option>California</option>
          <option>New York</option>
          <option>Texas</option>
          <option>Florida</option>
        </select>

        <button className="sb-button-unique" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
