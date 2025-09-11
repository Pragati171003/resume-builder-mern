import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaBars, FaEye,FaEyeSlash } from 'react-icons/fa';
import './EditorHeader.css';
import { useNavigate } from 'react-router-dom';
import { saveResume } from '../utils/resumeService';
import { downloadPdf } from '../utils/downloadPdf';

function EditorHeader() {
  const { 
    isToolbarVisible, setIsToolbarVisible, 
    isPreviewVisible, setIsPreviewVisible,
    formData, resumeId 
  } = useResume();
  const navigate = useNavigate();

  const handleSave = () => {
    const newId = saveResume(resumeId, formData);
    alert(`Resume ${resumeId === 'new' ? 'saved' : 'updated'}!`);
    if (resumeId === 'new') {
      navigate(`/editor/${newId}`, { replace: true });
    }
  };

  const handleDownload = () => {
    if (!isPreviewVisible) setIsPreviewVisible(true);
    setTimeout(() => downloadPdf('resume-preview-paper', formData.resumeTitle || 'resume'), 200);
  };

  return (
    <header className="editor-header">
      <div className="header-left">
        <button className="header-btn styles-toggle" onClick={() => setIsToolbarVisible(!isToolbarVisible)}>
          <FaBars />
          <span>Styles</span>
        </button>
      </div>
      <div className="header-right">
        <button className="header-btn" onClick={handleSave}>Save Resume</button>
        <button className="header-btn" onClick={handleDownload}>Download PDF</button>
        <button className="header-btn preview-toggle" onClick={() => setIsPreviewVisible(!isPreviewVisible)}>
          {isPreviewVisible ? <FaEyeSlash /> : <FaEye />}
          <span>{isPreviewVisible ? 'Hide Preview' : 'Live Preview'}</span>
        </button>
      </div>
    </header>
  );
}
export default EditorHeader;