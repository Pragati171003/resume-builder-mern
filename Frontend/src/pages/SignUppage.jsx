import React, { useState, useRef } from "react";
import "../pages/Signuppage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUppage() {
  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    mobile: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      setSuccess("Registered successfully! Please login.");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: "",
        mobile: ""
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>

        {/* First Name */}
        <div className="form-group input-icon">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <i className="fas fa-user"></i>
        </div>

        {/* Last Name */}
        <div className="form-group input-icon">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <i className="fas fa-user"></i>
        </div>

        {/* Email */}
        <div className="form-group input-icon">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <i className="fas fa-envelope"></i>
        </div>

        {/* Password */}
        <div className="form-group input-icon">
          <label>Create Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <i className="fas fa-lock"></i>
        </div>

        {/* Date of Birth */}
        <div className="form-group input-icon">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            ref={dateInputRef}
            value={form.dob}
            onChange={handleChange}
            required
          />
          <i
            className="fas fa-calendar-alt clickable-icon"
            onClick={() => dateInputRef.current.showPicker()}
          ></i>
        </div>

        {/* Mobile */}
        <div className="form-group input-icon">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
          />
          <i className="fas fa-phone"></i>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" className="btn-register">
          Register
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
