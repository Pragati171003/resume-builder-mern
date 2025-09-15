import React, { useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios"; 
import { useAuth } from '../context/AuthContext'; // From File 2
import './Loginpage.css'; // We will use the modern CSS

export function Loginpage() {
  // --- Merging Hooks and State from Both Files ---
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // State for the form fields (using 'formData' for consistency)
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  // Error handling state from File 1
  const [error, setError] = useState("");
  
  // Password visibility state from both files
  const [showPassword, setShowPassword] = useState(false);

  // Intelligent redirection logic from File 2
  const from = location.state?.from?.pathname || "/dashboard";

  // --- Merging Handler Functions ---

  // A single, robust handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user starts typing
  };

  // The password toggle from File 2
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // The main handleSubmit, combining backend logic with frontend context
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Make the API call to the backend (from File 1)
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      // 2. Save the real token to localStorage (from File 1)
      localStorage.setItem("token", res.data.token);

      // 3. Update the frontend state using the AuthContext (from File 2)
      // In a real app, the backend might return user data. Here we'll pass what we have.
      const userData = res.data.user || { email: formData.email, name: "Valued User" };
      login(userData);

      // 4. Navigate to the correct page after login (from File 2)
      navigate(from, { replace: true });

    } catch (err) {
      // 5. Handle errors from the backend (from File 1)
      setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
    }
  };

  // --- Merging the JSX for the final, magnificent layout ---
  return (
    <div className="login-page-wrapper"> 
      <div className="login-container">
        <h2>Login</h2>
        <p className="subtitle">Welcome back! Please enter your details.</p>
        
        <form onSubmit={handleSubmit}> 
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Password:</label>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          
          {/* Displaying the error message from File 1 */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit">Login</button>
        </form>

        {/* Combining the links from both files */}
        <div className="bottom-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <p>
                Don’t have an account?{' '}
                <Link to="/signup">Register here</Link>
            </p>
        </div>
      </div>
    </div>
  );
}