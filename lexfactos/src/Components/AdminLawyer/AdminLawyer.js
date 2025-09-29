import React, { useState } from "react";
import Sidebar from "../AdminSidebar/AdminSidebar";
import PendingLawyers from "./PendingLawyers";
import ApprovedLawyers from "./ApprovedLawyers";
import RejectedLawyers from "./RejectedLawyers";
import "./AdminLawyer.css";

const AdminLawyer = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const pendingLawyers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      location: "New York, NY",
      experience: "8 years",
      specialization: "Corporate Law",
      rating: 4.8,
      status: "Pending",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      location: "Los Angeles, CA",
      experience: "12 years",
      specialization: "Criminal Defense",
      rating: 4.9,
      status: "Pending",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      email: "emma.rodriguez@email.com",
      location: "Chicago, IL",
      experience: "6 years",
      specialization: "Family Law",
      rating: 4.7,
      status: "Pending",
    },
  ];

  const approvedLawyers = [
    {
      id: 4,
      name: "David Miller",
      email: "david.miller@email.com",
      location: "Boston, MA",
      experience: "10 years",
      specialization: "Civil Law",
      rating: 4.6,
    },
  ];

  const rejectedLawyers = [
    {
      id: 5,
      name: "Sophia White",
      email: "sophia.white@email.com",
      location: "Houston, TX",
      experience: "5 years",
      specialization: "Immigration Law",
      rating: 4.2,
    },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-content">
        <div className="lawyer-container">
          {/* Tabs */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "pending" ? "active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending <span className="count">{pendingLawyers.length}</span>
            </button>
            <button
              className={`tab ${activeTab === "approved" ? "active" : ""}`}
              onClick={() => setActiveTab("approved")}
            >
              Approved
            </button>
            <button
              className={`tab ${activeTab === "rejected" ? "active" : ""}`}
              onClick={() => setActiveTab("rejected")}
            >
              Rejected
            </button>
          </div>

          {/* Render Based on Tab */}
          {activeTab === "pending" && <PendingLawyers lawyers={pendingLawyers} />}
          {activeTab === "approved" && (
            <ApprovedLawyers lawyers={approvedLawyers} />
          )}
          {activeTab === "rejected" && (
            <RejectedLawyers lawyers={rejectedLawyers} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminLawyer;
