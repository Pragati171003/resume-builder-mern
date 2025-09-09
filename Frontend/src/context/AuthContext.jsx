import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // --- THIS IS THE CORRECTED LOGOUT FUNCTION ---
  const logout = () => {
    // It now correctly sets the state back to its initial values
    setIsLoggedIn(false);
    setUser(null);
  };
  // ---------------------------------------------

  const value = {
    isLoggedIn,
    user,
    login,
    logout, // Now this is the corrected function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}