import React, { useState } from "react";
import "../pages/Signuppage.css";
import bgimage from "../assets/Resumetemplate.png";

export default function SignUppage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    mobile: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.dob || !form.mobile) {
      setError("All fields are required.");
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    alert("Form submitted (frontend only, no backend).");
    setForm({ firstName: "", lastName: "", email: "", password: "", dob: "", mobile: "" });
  };

  return (
    <div className="register-container" style={{ backgroundImage: `url(${bgimage})` }}>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>

        <div className="form-group">
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
          <label>First Name</label>
        </div>

        <div className="form-group">
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
          <label>Last Name</label>
        </div>

        <div className="form-group">
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
          <label>Email Address</label>
        </div>

        <div className="form-group">
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <label>Password</label>
        </div>

        <div className="form-group">
          <input type="text" name="mobile" value={form.mobile} onChange={handleChange} required />
          <label>Mobile Number</label>
        </div>

        <div className="form-group">
          <input type="date" name="dob" value={form.dob} onChange={handleChange} required />
          <label>D.O.B</label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-register">Register</button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
