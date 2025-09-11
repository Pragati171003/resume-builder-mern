// --- src/pages/PreviewPage.jsx ---
import React from 'react';
import { useLocation } from 'react-router-dom';
import ResumeProvider from '../context/ResumeContext';
import Toolbar from '../editor/Toolbar';
import ResumePreview from '../editor/ResumePreview';
import './PreviewPage.css';

// The main page component
function PreviewPage() {
  const location = useLocation();
  // Get the data passed from the form page
  const initialData = location.state?.resumeData;

  if (!initialData) {
    return <div>Error: No data provided. Please <a href="/build-resume">fill out the form</a> first.</div>;
  }

  return (
    // The provider is initialized WITH the data from the form
    <ResumeProvider initialData={initialData}>
      <div className="preview-page-container">
        {/* Column 1: The Toolbar */}
        <div className="preview-toolbar-panel">
          <Toolbar />
        </div>
        {/* Column 2: The Resume Preview */}
        <div className="preview-display-panel">
          <ResumePreview />
        </div>
      </div>
    </ResumeProvider>
  );
}

export default PreviewPage;