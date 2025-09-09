import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Loginpage.css';

export function Loginpage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <p className="subtitle">Welcome back! Please enter your details.</p>
        <form>
          {/* Email field */}
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
         
          {/* Password field */}
          <div className="input-group password-group">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
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