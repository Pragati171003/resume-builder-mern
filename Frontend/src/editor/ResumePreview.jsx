import React, { useState, useEffect ,useRef} from 'react';
import { useResume } from '../context/ResumeContext';
import LoadingSpinner from '../utils/LoadingSpinner';

import './ResumePreview.css'; 

const SectionContent = ({ section, data }) => {
  const { formData } = data;
  switch (section) {
    // case 'careerObjective':   // ✅ NEW
    //   return (
    //     <div className="section-content">
    //       <p>{formData.careerObjective}</p>
    //     </div>
    //   );
    case 'education':
      return (
        <div className="section-content">
          <p><strong>{formData.education.ug.college}</strong>, {formData.education.ug.marks}</p>
          {formData.education.twelth.college && <p><strong>{formData.education.twelth.college}</strong>, {formData.education.twelth.marks}</p>}
          {formData.education.tenth.school && <p><strong>{formData.education.tenth.school}</strong>, {formData.education.tenth.marks}</p>}
        </div>
      );
    case 'skills':
      return (
        <div className="section-content skills-list">
          {formData.skills.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}
        </div>
      );
    case 'experience':
      return (
        <div className="section-content experience-content">
          {formData.experience.split('\n').map((line, index) => <p key={index}>{line}</p>)}
        </div>
      );
    case 'projects':
      return (
        <div className="section-content">
          {formData.projects.map((proj, idx) => (
            proj.title && <div key={idx} className="project-item">
              <strong>{proj.title}</strong>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      );
    case 'achievements':
      return <div className="section-content"><p>{formData.achievements}</p></div>;
    case 'certifications':
      return <div className="section-content"><p>{formData.certifications}</p></div>;
    default: return null;
  }
};


function ResumePreview() {
  const { formData, themeColor, fontFamily, fontSize } = useResume();
  const [isLoading, setIsLoading] = useState(false);
  
  const previewContainerRef = useRef(null);
  const [baseFontSize, setBaseFontSize] = useState(16);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        const newWidth = entries[0].contentRect.width;
        const newSize = Math.max(10, (newWidth / 800) * 16);
        setBaseFontSize(newSize);
      }
    });

    if (previewContainerRef.current) {
      observer.observe(previewContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const isSectionVisible = (data) => {
    if (typeof data === 'string') return data.trim() !== '';
    if (Array.isArray(data)) return data.length > 0 && (data[0]?.title || typeof data[0] === 'string');
    return false;
  };

  return (
    <div className="resume-preview-container" ref={previewContainerRef}>
      <div 
        id="resume-preview-paper" 
        className="resume-preview-paper"
        style={{ fontFamily: fontFamily, fontSize: `${baseFontSize}px` }}
      >
        <header className="resume-header">
          <h1 style={{ color: themeColor }}>{formData.name}</h1>
          <p>
            <span>{formData.email}</span>
            {formData.mobile && <span> | {formData.mobile}</span>}
            {formData.linkedin && <span> | {formData.linkedin}</span>}
          </p>
        </header>
        <header className="resume-header">
          <h1 style={{ color: themeColor }}>{formData.name}</h1>
          <p><span>{formData.email}</span></p>
        </header>

        {/* All Sections */}
        <section className="resume-section"><h2 style={{ color: themeColor }}>EDUCATION</h2><SectionContent section="education" data={{ formData }} /></section>
        {isSectionVisible(formData.skills) && <section className="resume-section"><h2 style={{ color: themeColor }}>SKILLS</h2><SectionContent section="skills" data={{ formData }} /></section>}
        {isSectionVisible(formData.experience) && <section className="resume-section"><h2 style={{ color: themeColor }}>EXPERIENCE</h2><SectionContent section="experience" data={{ formData }} /></section>}
        {isSectionVisible(formData.projects) && <section className="resume-section"><h2 style={{ color: themeColor }}>PROJECTS</h2><SectionContent section="projects" data={{ formData }} /></section>}
        {isSectionVisible(formData.achievements) && <section className="resume-section"><h2 style={{ color: themeColor }}>ACHIEVEMENTS</h2><SectionContent section="achievements" data={{ formData }} /></section>}
        {isSectionVisible(formData.certifications) && <section className="resume-section"><h2 style={{ color: themeColor }}>CERTIFICATIONS</h2><SectionContent section="certifications" data={{ formData }} /></section>}
      </div>
    </div>
  );
}

export default ResumePreview;