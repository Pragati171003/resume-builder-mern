// --- src/pages/PreviewPage.jsx ---
import React from 'react';
import { useLocation } from 'react-router-dom';
import ResumeProvider from '../context/ResumeContext';
import Toolbar from '../editor/Toolbar';
import ResumePreview from '../editor/ResumePreview';
import './PreviewPage.css';

function PreviewPage() {
  const location = useLocation();
  const initialData = location.state?.resumeData;

  if (!initialData) {
    return <div>Error: No data provided. Please <a href="/build-resume">fill out the form</a> first.</div>;
  }

  return (
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