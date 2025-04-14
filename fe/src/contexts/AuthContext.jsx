// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { login, register, logout } from "../api/authApi";
import { decodeToken, isTokenValid } from "../utils/tokenUtils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isTokenValid(token)) {
      const decodedToken = decodeToken(token);
      setUser({
        id: decodedToken.id,
        username: decodedToken.sub,
        email: decodedToken.email,
        role: decodedToken.role,
      });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      setError(null);
      const response = await login(credentials);
      const { token, refreshToken, id, username, email, role } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      setUser({ id, username, email, role });
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    }
  };

  const handleRegister = async (userData) => {
    try {
      setError(null);
      await register(userData);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      return {
        success: false,
        error: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ROLE_ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
