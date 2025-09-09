import React, { useState } from "react";
import "./Loginpage.css";

export function Loginpage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" name="username" required /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br /><br />

        <label htmlFor="password">Password:</label><br />
        <div className="password-container">
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
        <br /><br />

        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
}
