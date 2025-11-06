import React, { useEffect } from "react";
import "./ErrorPopUp.css";

const ErrorPopup = ({ message, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 3500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="error-popup-container">
      <div className="error-popup">
        <p>{message}</p>
        <button onClick={onClose} className="error-popup-close">✖</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
