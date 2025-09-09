import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Loginpage.css';

export function Loginpage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for the form fields
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // --- THIS STATE IS NOW RESTORED ---
  // State to manage showing/hiding the password
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // --- THIS FUNCTION IS NOW RESTORED ---
  // Function to toggle the password visibility
  const togglePassword = () => {
    setShowPassword(!showPassword); // Toggles the state between true and false
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: formData.email, name: "Logged In User" });
    navigate('/'); 
  };

  return (
    <div className="login-page-wrapper"> 
      <div className="login-container">
        <h2>Login</h2>
        
        {/* --- THE SUBTITLE IS NOW RESTORED --- */}
        <p className="subtitle">Welcome back! Please enter your details.</p>
        
        <form onSubmit={handleSubmit}> 
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          {/* --- THE PASSWORD TOGGLE FUNCTIONALITY IS NOW RESTORED --- */}
          <div className="input-group password-group">
            <label htmlFor="password">Password:</label>
            <input 
              // The input type changes based on the `showPassword` state
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
            {/* The span for the eye/monkey icon is back */}
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          
          <button type="submit">Login</button>
        </form>
        <p className="bottom-text">
          Don’t have an account?{' '}
          <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
}