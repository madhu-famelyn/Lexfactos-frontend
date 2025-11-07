import React, { useState } from "react";
import { uploadLawyerExcel } from "../Service/Service";
import Sidebar from "../AdminSidebar/AdminSidebar";
import "./UploadExcel.css";

export default function LawyerExcelUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("⚠️ Please select an Excel file first!");
      return;
    }

    setIsUploading(true);
    setMessage("⏳ Uploading... Please wait.");

    try {
      const result = await uploadLawyerExcel(file);
      setMessage(`✅ Upload successful: ${result.message || "File processed"}`);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail || err.message || "Something went wrong";
      setMessage(`❌ Upload failed: ${errorMessage}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="excel-upload-container">
      <Sidebar />
      <div className="excel-upload-content">
        <h2 className="excel-upload-title">📤 Upload Lawyer Excel</h2>

        <div className="excel-upload-card">
          <label className="file-label">Select Excel File (.xlsx)</label>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="file-input"
          />

          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="upload-btn"
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>

          {message && (
            <p
              className={`upload-message ${
                message.startsWith("✅")
                  ? "success"
                  : message.startsWith("❌")
                  ? "error"
                  : "info"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
