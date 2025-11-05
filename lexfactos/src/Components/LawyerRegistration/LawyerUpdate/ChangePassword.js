// src/Components/LawyerUpdate/ChangePassword.js
import React from "react";

export default function ChangePassword({
  currentPassword,
  newPassword,
  confirmPassword,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
}) {
  return (
    <div className="change-password-container">
      <h3>Change Password</h3>

      {/* Current Password */}
      <div className="cp-field">
        <label>Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      {/* New Password */}
      <div className="cp-field">
        <label>New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>

      {/* Confirm Password */}
      <div className="cp-field">
        <label>Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </div>
    </div>
  );
}
