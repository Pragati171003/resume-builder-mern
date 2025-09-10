import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Loginpage from "./pages/Loginpage.jsx";
import SignUppage from "./pages/SignUppage.jsx";
import ResumeForm from "./pages/ResumeForm.jsx";
import ResumeTemplate2 from "./components/resumetemplates/ResumeTemplate2.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import { AuthProvider } from "./context/authContext.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignUppage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<SignUppage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="/resume-form"
          element={
            <PrivateRoute>
              <ResumeForm onSubmit={(data) => setSubmittedData(data)} />
            </PrivateRoute>
          }
        />
        <Route
          path="/resume-template"
          element={
            <PrivateRoute>
              <ResumeTemplate2 data={submittedData} />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
