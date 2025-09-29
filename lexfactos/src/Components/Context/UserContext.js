// src/Components/Context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    token_type: null,
  });

  const login = (user, token, token_type) => {
    setAuth({ user, token, token_type });
    console.log("Logged in user:", { user, token, token_type });
  };

  const logout = () => {
    setAuth({ user: null, token: null, token_type: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
