import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ResumeTemplateGrid from "./pages/ResumeTemplateGrid";
import Loginpage from "./pages/Loginpage.jsx";
import SignUppage from "./pages/SignUppage.jsx";
import ResumeForm from "./pages/ResumeForm.jsx";
import ResumeTemplate2 from "./components/resumetemplates/ResumeTemplate2.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import { AuthProvider } from "./context/authContext.jsx";



function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
   <ResumeForm/>
  );
}



// function App() {
//   const [submittedData, setSubmittedData] = useState(null);

//   return (
//     <div>
      
     
//       {!submittedData ? (
//         <ResumeForm onSubmit={(data) => setSubmittedData(data)} />
//       ) : (
//         <ResumeTemplate2 data={submittedData} />
//       )}
//     </div>
//   );
// }


// function App() {
//   const [page, setPage] = useState("form"); // first show form
//   const [resumeData, setResumeData] = useState(null); // store form data

//   return (
//     <div>
//       {page === "form" && (
//         <ResumeForm
//           onSubmit={(data) => {
//             setResumeData(data);   // save submitted form data
//             setPage("grid");       // switch to grid page
//           }}
//         />
//       )}
//       {page === "grid" && <ResumeTemplateGrid data={resumeData} />}
//     </div>
//   );
// }





export default App;