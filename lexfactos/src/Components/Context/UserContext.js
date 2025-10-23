// src/Context/UserContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth
      ? JSON.parse(storedAuth)
      : { user: null, token: null, token_type: null };
  });

  useEffect(() => {
    if (auth.user) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  const login = (user, token, token_type) => {
    setAuth({ user, token, token_type });
    console.log("Logged in user:", { user, token, token_type });
  };

  const logout = () => {
    setAuth({ user: null, token: null, token_type: null });
    localStorage.removeItem("auth");
    console.log("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
