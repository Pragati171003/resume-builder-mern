import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Pages
import { Loginpage } from './pages/Loginpage.jsx';
import SignUppage from "./pages/SignUppage.jsx";
import ResumeForm from './pages/ResumeForm.jsx';
import ResumeTemplate2 from './components/resumetemplates/ResumeTemplate2.jsx';

// ✅ PrivateRoute wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Loginpage />} />
    //     <Route path="/login" element={<Loginpage />} />
    //     <Route path="/signup" element={<SignUppage />} />

    //     {/* Protected routes */}
    //     <Route path="/resume-form" element={<PrivateRoute><ResumeForm /></PrivateRoute>} />
    //     <Route path="/resume-template" element={<PrivateRoute><ResumeTemplate2 /></PrivateRoute>} />
    //   </Routes>
    // </Router>
     <ResumeForm/>
  );
}

export default App;
