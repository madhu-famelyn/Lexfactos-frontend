import React, { useState, useCallback } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const SubHeader = () => {


  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <Link to="/">
              Lexfactos
            </Link>
          </div>
        </div>
      </header>


    </>
  );
};

export default SubHeader;
