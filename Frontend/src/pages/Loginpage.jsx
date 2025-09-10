import React, { useState } from "react";
import "../pages/Signuppage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Loginpage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      // ✅ Save token in localStorage
      localStorage.setItem("token", res.data.token);

      navigate("/resume-form"); // ✅ navigate after login
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

        <div className="form-group">
          <label>Email</label>
          <div className="input-icon">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <i className="fas fa-envelope"></i>
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-icon">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <i
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-register">Login</button>

        <p className="login-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p className="login-link">
          Don’t have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
}
