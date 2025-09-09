import {Loginpage}from './pages/Loginpage'
import {Header} from './layout/Header'
// import {Footer} from './layout/Footer'
import './App.css'
import { Body } from './layout/Body'
import React, { useState } from "react";
import ResumeForm from './pages/ResumeForm'
import ResumeTemplate2 from './components/resumetemplates/ResumeTemplate2'

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div>
      {!submittedData ? (
        <ResumeForm onSubmit={(data) => setSubmittedData(data)} />
      ) : (
        <ResumeTemplate2 data={submittedData} />
      )}
    </div>
  );
}
export default App


