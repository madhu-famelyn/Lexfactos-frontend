// src/context/LawyerAuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

const LawyerAuthContext = createContext();

// 🔍 Helper function to decode lawyer ID from JWT
const decodeLawyerIdFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || "";
  } catch (err) {
    console.error("Failed to decode lawyer ID from token:", err);
    return "";
  }
};

export const LawyerAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("lawyer_token") || "");
  const [lawyerId, setLawyerId] = useState(
    localStorage.getItem("lawyer_id") || (token ? decodeLawyerIdFromToken(token) : "")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // 🧠 Keep auth state in sync
  useEffect(() => {
    if (token && !lawyerId) {
      const decodedId = decodeLawyerIdFromToken(token);
      setLawyerId(decodedId);
      localStorage.setItem("lawyer_id", decodedId);
    }
    setIsAuthenticated(!!token);
  }, [token, lawyerId]);

  // 🔑 Login function
  const login = (newToken) => {
    const decodedId = decodeLawyerIdFromToken(newToken);
    setToken(newToken);
    setLawyerId(decodedId);
    setIsAuthenticated(true);
    localStorage.setItem("lawyer_token", newToken);
    localStorage.setItem("lawyer_id", decodedId);
  };

  // 🚪 Logout function
  const logout = () => {
    setToken("");
    setLawyerId("");
    setIsAuthenticated(false);
    localStorage.removeItem("lawyer_token");
    localStorage.removeItem("lawyer_id");
  };

  return (
    <LawyerAuthContext.Provider
      value={{
        token,
        lawyerId,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </LawyerAuthContext.Provider>
  );
};

export const useLawyerAuth = () => useContext(LawyerAuthContext);
