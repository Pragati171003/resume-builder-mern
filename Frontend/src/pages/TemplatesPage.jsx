import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './TemplatesPage.css'; // We'll create this CSS file next

// Import your template components
import ResumeTemplate2 from '../components/resumetemplates/ResumeTemplate2';
// You can import more templates here in the future
// import ResumeTemplate1 from '../components/ResumeTemplate1';

function TemplatesPage() {
  const location = useLocation();
  
  // 1. Get the resume data passed from the form page
  const resumeData = location.state?.resumeData;

  // 2. State to manage which template is currently being viewed
  const [selectedTemplate, setSelectedTemplate] = useState('template2');

  // 3. Handle the case where someone lands on this page without data
  if (!resumeData) {
    return (
      <div className="template-page-error">
        <h2>No resume data found!</h2>
        <p>Please fill out the form first to see a preview.</p>
        <Link to="/build-resume">Go to Form</Link>
      </div>
    );
  }

  // 4. Function to render the selected template
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'template2':
        return <ResumeTemplate2 data={resumeData} />;
      // case 'template1':
      //   return <ResumeTemplate1 data={resumeData} />;
      default:
        return <ResumeTemplate2 data={resumeData} />;
    }
  };

  return (
    <div className="template-page-container">
      <aside className="template-sidebar">
        <h2>Templates</h2>
        <p>Choose a template to preview your resume.</p>
        
        {/* Buttons to switch between different templates */}
        <div className="template-selector">
          <button 
            onClick={() => setSelectedTemplate('template2')}
            className={selectedTemplate === 'template2' ? 'active' : ''}
          >
            Modern Professional
          </button>
          {/* Add more buttons here for other templates */}
          {/* <button 
            onClick={() => setSelectedTemplate('template1')}
            className={selectedTemplate === 'template1' ? 'active' : ''}
          >
            Classic Minimal
          </button> */}
        </div>
        <div className="action-buttons">
            <button className="download-btn">Download PDF</button>
        </div>
      </aside>

      <main className="template-preview-area">
        {renderTemplate()}
      </main>
    </div>
  );
}

export default TemplatesPage;