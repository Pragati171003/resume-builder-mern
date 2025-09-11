import React from 'react';
import { useResume } from '../context/ResumeContext';
import { saveResume } from '../utils/resumeService';
import { downloadPdf } from '../utils/downloadPdf';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Toolbar.css';

const templates = [ { id: 'onyx', name: 'Onyx' }, { id: 'quartz', name: 'Quartz' }, ];
const colors = ['#0d6efd', '#dc3545', '#198754', '#6f42c1', '#212529'];
const fonts = ["'Inter', sans-serif", "'Georgia', serif", "'Garamond', serif"];
const fontSizes = [
  { name: 'S', value: 1 },
  { name: 'M', value: 1.15 },
  { name: 'L', value: 1.3 },
];

function Toolbar() {
  const { formData,resumeId,
    selectedTemplate, setSelectedTemplate,
    themeColor, setThemeColor,
    fontFamily, setFontFamily,
    fontSize, setFontSize,
    isPreviewVisible, setIsPreviewVisible,
    isToolbarVisible, setIsToolbarVisible,
  } = useResume();

  return (
    <div className="toolbar-container-vertical">
      <button 
        className={`toolbar-btn ${isPreviewVisible ? 'active' : ''}`}
        onClick={() => setIsPreviewVisible(!isPreviewVisible)}
      >
        Live Preview
      </button>
      <div className="toolbar-group">
        <h3>Template</h3>
        <div className="selector">
          {templates.map(t => (
            <button key={t.id} className={selectedTemplate === t.id ? 'active' : ''} onClick={() => setSelectedTemplate(t.id)}>
              {t.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="toolbar-group">
        <h3>Color</h3>
        <div className="selector color-picker">
          {colors.map(color => (
            <div 
              key={color} 
              className={`color-swatch ${themeColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setThemeColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="toolbar-group">
        <h3>Font</h3>
        <div className="selector">
          <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
            {fonts.map(font => (
              <option key={font} value={font}>{font.split(',')[0].replace(/'/g, '')}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="toolbar-group">
        <h3>Size</h3>
        <div className="selector font-size-selector">
          {fontSizes.map(size => (
            <button
              key={size.name}
              className={fontSize === size.value ? 'active' : ''}
              onClick={() => setFontSize(size.value)}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default Toolbar;