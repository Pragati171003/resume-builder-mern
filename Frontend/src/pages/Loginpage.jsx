import React from "react";
import { Link } from 'react-router-dom';
import './Loginpage.css'
export function Loginpage() {
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" name="username" required /><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" required /><br /><br />

        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" required /><br /><br />

        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{' '}
        {/* 2. REPLACE <a> with <Link> and point to /signup */}
        <Link to="/signup">Register here</Link>
      </p>
    </div>
  );
}

