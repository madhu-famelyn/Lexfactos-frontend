import React from "react";
import "./BreadcrumbPage.css";

const BreadcrumbPage = () => {
  return (
    <div className="breadcrumb-page">
      <div className="breadcrumb-container">
        <nav className="breadcrumb">
          <a href="/" className="breadcrumb-link">Support</a>
          <span className="breadcrumb-separator">›</span>
          <a href="/account" className="breadcrumb-link active">Account & Sign in</a>
        </nav>
        <h1 className="page-title">Account & Sign In</h1>
      </div>
    </div>
  );
};

export default BreadcrumbPage;
