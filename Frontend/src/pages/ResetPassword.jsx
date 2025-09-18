import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../pages/ResetPassword.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setError("Password must contain at least one special character (!@#$%^&*).");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validatePassword()) {
      return; 
    }
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.msg || "Password has been reset successfully! Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
      setMessage("");
    }
  };

  return (
     <div className="reset-password-page">
      <div className="reset-form-container">
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="reset-form">
          <div className="input-field-group">
            <input
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" " 
              required
            />
            <label htmlFor="new-password">New Password</label>
            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="input-field-group">
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="confirm-password">Confirm New Password</label>
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="submit-btn">Update Password</button>
        </form>
      </div>
    </div>
  );
}