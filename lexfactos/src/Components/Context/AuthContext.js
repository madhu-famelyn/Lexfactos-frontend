// src/Components/Context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [adminId, setAdminId] = useState(localStorage.getItem("admin_id"));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded?.admin_id;
        if (id) {
          setAdminId(id);
          localStorage.setItem("admin_id", id);
        }
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);

    try {
      const decoded = jwtDecode(newToken);
      const id = decoded?.admin_id;
      if (id) {
        setAdminId(id);
        localStorage.setItem("admin_id", id);
      }
    } catch (err) {
      console.error("Invalid token", err);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("admin_id");
    setToken(null);
    setAdminId(null);
    window.location.href = "/admin-signin";
  };

  return (
    <AuthContext.Provider value={{ token, adminId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
