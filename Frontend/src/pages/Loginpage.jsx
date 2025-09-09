import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './Loginpage.css'; 
import axios from "axios";

export function Loginpage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      // ✅ Save token to localStorage
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      window.location.href = "/resume-form"; // ✅ redirect to protected page
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-page-wrapper"> 
      <div className="login-container">
        <h2>Login</h2>
        <p className="subtitle">Welcome back! Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="input-group password-group">
            <label htmlFor="password">Password:</label>
            <input type={showPassword ? "text" : "password"} id="password" name="password" value={form.password} onChange={handleChange} required />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p className="bottom-text">
          Don’t have an account? <Link to="/signup">Register here</Link>
        </p>
      </div>
    </div>
  );
}
