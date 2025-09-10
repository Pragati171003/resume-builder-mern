import React, { useState } from "react";
import "../pages/Signuppage.css";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.msg || "Password reset link sent to your email.");
      setError("");
      setResetUrl(res.data.resetUrl); // ✅ display reset link for dev
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Forgot Password</h2>

        <div className="form-group">
          <label>Enter your email</label>
          <div className="input-icon">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="fas fa-envelope"></i>
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        {resetUrl && (
          <p>
            🔗 Reset Link (Dev Mode): <a href={resetUrl} target="_blank">{resetUrl}</a>
          </p>
        )}

        <button type="submit" className="btn-register">Send Reset Link</button>
      </form>
    </div>
  );
}
