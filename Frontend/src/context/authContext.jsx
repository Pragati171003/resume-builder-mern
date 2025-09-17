import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
    const loadUser = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          // --- THIS IS THE MAGNIFICENT FIX ---
          // We now send the token directly, without "Bearer ", to match your backend.
          const config = { headers: { 'Authorization': savedToken } };
          
          const { data } = await axios.get('http://localhost:5000/api/auth/me', config);
          
          setUser(data);
          setToken(savedToken);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Token validation failed:", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };
  const value = {
    token, 
    user, 
    isLoggedIn, 
    isLoading,
    login, 
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
