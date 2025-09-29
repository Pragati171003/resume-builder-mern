import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"; 
import { useAuth } from '../context/AuthContext'; // From File 2
import './Loginpage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function Loginpage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || "/dashboard";
  const redirectMessage = location.state?.message;
  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === 'email' ? value.toLowerCase() : value;
    setFormData({ ...formData, [name]: finalValue });
    setError(""); 
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      login(res.data.token, res.data.user);
      const queryParams = new URLSearchParams(location.search);
      const redirectTo = queryParams.get('redirectTo');
      if (redirectTo) {
        navigate(decodeURIComponent(redirectTo), { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="login-page-wrapper"> 
      <div className="login-container">
        <h2>Login</h2>
        {redirectMessage && <p className="redirect-message">{redirectMessage}</p>}
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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>

        <div className="bottom-links">
            <Link to="/forgot-password">Reset Password/Forgot Password?</Link>
            <p>
                Don’t have an account?{' '}
                <Link to="/signup">Register here</Link>
            </p>
        </div>
      </div>
    </div>
  );
}