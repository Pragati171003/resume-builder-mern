import React, { useState } from "react";
import "./Register.css";
import bgimage from "../assets/Resumetemplate.png";

export default function Register() {
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

        <label>
          First Name
          <input type="text" name="firstName" placeholder="Enter First Name" value={form.firstName} onChange={handleChange} />
        </label>

        <label>
          Last Name
          <input type="text" name="lastName" placeholder="Enter Last Name" value={form.lastName} onChange={handleChange} />
        </label>

        <label>
          Email Address
          <input type="email" name="email" placeholder="Enter Email" value={form.email} onChange={handleChange} />
        </label>

        <label>
          Password
          <input type="password" name="password" placeholder="Enter Password" value={form.password} onChange={handleChange} />
        </label>

        <label>
          Mobile Number
          <input type="text" name="mobile" placeholder="Enter Mobile Number" value={form.mobile} onChange={handleChange} />
        </label>

        <label>
          D.O.B
          <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="btn-register">Register</button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
