// import { Header } from './layout/Header';
// import { Footer } from './layout/Footer';
import { useState } from 'react';
import './App.css';
// import SignUppage from "./pages/SignUppage";
import ResumeForm from './pages/ResumeForm.jsx';
//import ResumeTemplate2 from './components/ResumeTemplate2.jsx'; 
import ResumeTemplate2 from './components/resumetemplates/ResumeTemplate2.jsx';
import AppRoutes from './AppRoutes.jsx';

function App() {

  return (
    <div>
      <AppRoutes/>
    </div>
  );
}

export default App;