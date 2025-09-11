import React, { useState } from "react";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Loginpage.css';

export function Loginpage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // State for the form fields
  const [formData, setFormData] = useState({ email: '', password: '' });
  const from = location.state?.from?.pathname || "/dashboard";
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mockUserData = { email: 'user@example.com', name: 'Valued User' };
    login(mockUserData);
    navigate('/dashboard'); 
  };

  return (
    <div className="login-page-wrapper"> 
      <div className="login-container">
        <h2>Login</h2>
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

          <div className="input-group password-group">
            <label htmlFor="password">Password:</label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
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