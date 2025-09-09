import React, { useState } from "react";
import "../pages/Signuppage.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);

      // ✅ optional: save token on signup
      localStorage.setItem("token", res.data.token);

      setSuccess(res.data.msg);
      setForm({ firstName: "", lastName: "", email: "", password: "", dob: "", mobile: "" });

      window.location.href = "/resume-form"; // ✅ redirect to protected page
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>
        {/* your inputs unchanged */}
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
