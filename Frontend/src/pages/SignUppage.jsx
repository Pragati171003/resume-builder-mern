import React, { useState } from "react";
import "../pages/Signuppage.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function SignUppage() {
  const navigate = useNavigate();
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
      setForm({ firstName: "", lastName: "", email: "", password: "", dob: "", mobile: "" });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>

        <div className="form-group">
          <label>First Name</label>
          <div className="input-icon">
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
            <i className="fas fa-user"></i>
          </div>
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <div className="input-icon">
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
            <i className="fas fa-user"></i>
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <div className="input-icon">
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
            <i className="fas fa-envelope"></i>
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-icon">
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
            <i className="fas fa-lock"></i>
          </div>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} required className="date-input" />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <div className="input-icon">
            <input type="text" name="mobile" value={form.mobile} onChange={handleChange} required />
            <i className="fas fa-phone"></i>
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" className="btn-register">Register</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
