import React from 'react';
import { useParams } from 'react-router-dom';
import ResumeProvider from '../context/ResumeContext'; 
import { useResume } from '../context/ResumeContext'; 
import ResumeForm from '../pages/ResumeForm';
import ResumePreview from '../editor/ResumePreview';
import Toolbar from '../editor/Toolbar';
import EditorHeader from '../editor/EditorHeader'
import './EditorPage.css';

function EditorPageContent() {
  const { isToolbarVisible, isPreviewVisible } = useResume();

  return (
    <div className="editor-page-container">
      <EditorHeader />
      <div className="editor-main-content">
        <div className={`toolbar-panel ${isToolbarVisible ? 'visible' : 'hidden'}`}>
          <Toolbar />
        </div>
        <div className="form-panel">
          <ResumeForm />
        </div>
        <div className={`preview-panel ${isPreviewVisible ? 'visible' : 'hidden'}`}>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}

function EditorPage() {
  const { resumeId } = useParams();
  return (
    <ResumeProvider resumeId={resumeId}>
      <EditorPageContent />
    </ResumeProvider>
  );
}
export default EditorPage;