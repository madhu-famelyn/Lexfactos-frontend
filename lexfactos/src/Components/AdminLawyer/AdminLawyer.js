import React, { useState, useEffect } from "react";
import Sidebar from "../AdminSidebar/AdminSidebar";
import PendingLawyers from "./PendingLawyers";
import ApprovedLawyers from "./ApprovedLawyers";
import RejectedLawyers from "./RejectedLawyers";
import axios from "axios";
import "./AdminLawyer.css";

const AdminLawyer = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingLawyers, setPendingLawyers] = useState([]);
  const [approvedLawyers, setApprovedLawyers] = useState([]);
  const [rejectedLawyers, setRejectedLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/lawyers");
      
      // Filter based on status from backend
      const pending = response.data.filter(l => l.status === "Pending");
      const approved = response.data.filter(l => l.status === "Approved");
      const rejected = response.data.filter(l => l.status === "Rejected");

      setPendingLawyers(pending);
      setApprovedLawyers(approved);
      setRejectedLawyers(rejected);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    } finally {
      setLoading(false);
    }
  };

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
              Approved <span className="count">{approvedLawyers.length}</span>
            </button>

            <button
              className={`tab ${activeTab === "rejected" ? "active" : ""}`}
              onClick={() => setActiveTab("rejected")}
            >
              Rejected <span className="count">{rejectedLawyers.length}</span>
            </button>
          </div>

          {loading ? (
            <p className="loading-text">Loading lawyers...</p>
          ) : (
            <>
              {activeTab === "pending" && (
                <PendingLawyers lawyers={pendingLawyers} />
              )}
              {activeTab === "approved" && (
                <ApprovedLawyers lawyers={approvedLawyers} />
              )}
              {activeTab === "rejected" && (
                <RejectedLawyers lawyers={rejectedLawyers} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminLawyer;
