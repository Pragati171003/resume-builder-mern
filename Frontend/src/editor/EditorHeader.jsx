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
    formData, resumeId,previewRef 
  } = useResume();
  const navigate = useNavigate();

  const handleSave = () => {
    const savedId = saveResume(resumeId, formData);
    alert(`Resume ${resumeId === 'new' ? 'saved' : 'updated'} successfully!`);
    if (resumeId === 'new') {
      navigate(`/editor/${savedId}`, { replace: true });
    }
  };

  const handleDownload = () => {
  if (!isPreviewVisible) {
    setIsPreviewVisible(true);
    setTimeout(() => {
      downloadPdf('resume-preview-iframe', formData.resumeTitle || 'resume');
    }, 500);
  } else {
    downloadPdf('resume-preview-iframe', formData.resumeTitle || 'resume');
  }
};

  return (
    <header className="editor-header">
      <div className="editor-header-left">
        <button className="header-btn styles-toggle" onClick={() => setIsToolbarVisible(!isToolbarVisible)}>
          <FaBars />
          <span className="btn-text">Themes</span>
        </button>
      </div>
      <div className="editor-header-right">
        <button className="header-btn" onClick={handleSave}>Save Resume</button>
        <button className="header-btn" onClick={handleDownload}>Download PDF</button>
        <button className="header-btn preview-toggle" onClick={() => setIsPreviewVisible(!isPreviewVisible)}>
          {isPreviewVisible ? <FaEyeSlash /> : <FaEye />}
          <span className="btn-text">{isPreviewVisible ? 'Hide Preview' : 'Live Preview'}</span>
        </button>
      </div>
    </header>
  );
}
export default EditorHeader;