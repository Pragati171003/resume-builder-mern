import React from 'react';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { FaBars, FaEye,FaEyeSlash } from 'react-icons/fa';
import './EditorHeader.css';
import { useNavigate, useLocation  } from 'react-router-dom';
import { saveResume } from '../utils/resumeService';
import { downloadPdf } from '../utils/downloadPdf';

function EditorHeader() {
  const { 
    isToolbarVisible, setIsToolbarVisible, 
    isPreviewVisible, setIsPreviewVisible,
    formData, resumeId,previewRef 
  } = useResume();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSave = () => {
    if (isLoggedIn) {
      const newId = saveResume(resumeId, formData);
      alert(`Resume ${resumeId === 'new' ? 'saved' : 'updated'} successfully!`);
      if (resumeId === 'new') {
        navigate(`/editor/${newId}`, { replace: true });
      }
    } else {
       navigate(`/login?redirectTo=${encodeURIComponent(location.pathname)}`, { 
        state: { message: "Please log in to save your resume." } 
      });
    }
  };

  const handleDownload = () => {
    if (!isLoggedIn) {
      navigate(`/login?redirectTo=${encodeURIComponent(location.pathname)}`, {
        state: { message: "Please log in to download your resume." }
      });
      return; 
    }
    if (!isPreviewVisible) {
      setIsPreviewVisible(true);
      setTimeout(() => {
        downloadPdf(previewRef.current, formData.resumeTitle || 'resume');
      }, 500); 
    } else {
      downloadPdf(previewRef.current, formData.resumeTitle || 'resume');
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