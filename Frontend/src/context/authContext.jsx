import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const config = { headers: { 'Authorization': token } };
          const { data } = await axios.get('http://localhost:5000/api/auth/me', config);
          
          setUser(data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Token is invalid, logging out:", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    validateToken();
  }, [token]);

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
