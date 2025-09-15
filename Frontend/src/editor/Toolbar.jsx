import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Toolbar.css';

const templates = [//even classy waterfall modern even crushin utils modern extended darkclassy responsive rocket 
// light classy  cora projects error
  { id: 'onepage-plus', name: 'Onepage Plus' },
  { id: 'flat', name: 'Flat' },
  { id: 'elegant', name: 'Elegant' },
  { id: 'onepage', name: 'Onepage' },
  { id: 'stackoverflow', name: 'StackOverflow' },
  { id: 'macchiato', name: 'Macchiato' },
  { id: 'kendall', name: 'Kendall' },
  { id: 'spartan', name: 'Spartan' },
  { id: 'paper', name: 'Paper' },
  {id:'sceptile',name:'Sceptile'},
  { id: 'standard-resume', name: 'Standard' },
  { id: 'short', name: 'Short' },   
  { id: 'straightforward', name: 'Straightforward' },    
  { id: 'bufferbloat', name: 'Bufferbloat' }, 
  { id: 'simplyelegant', name: 'Simplyelegant' }, 
  //not worked{ id: 'randytarampi', name: 'Randytarampi' }, 
  { id: 'classy-vforesee', name: 'Classy Vforesee' }, 
  //{ id: 'umennel', name: 'Umennel' }, 
  { id: 'eloquent', name: 'Eloquent' }, 
  { id: 'paperalt', name: 'Paperalt' }, 
  { id: 'straightforward-with-telephone', name: 'Straightforward-with-telephone' }, 
  //{ id: 'bluetime', name: 'bluetime' }, 
  { id: 'tech', name: 'Tech' }, 
  { id: 'caffeine', name: 'Caffeine' }, 
  //{ id: 'elegant-ryantrinkle', name: 'Elegant Ryantrinkle' }, 
  { id: 'moon', name: 'Moon' }, 
  { id: 'spartan', name: 'Spartan' }, 
  { id: 'light-classy-concise', name: 'light-classy-concise' }, 
  { id: 'class', name: 'Class' }, 
  //{ id: 'relaxed', name: 'Relaxed' }, 
  { id: 'boilerplate', name: 'Boilerplate' }, 
  { id: 'nominaltech-nl', name: 'Nominaltech-nl' }, 
  { id: 'eternal', name: 'Eternal' }, 
  { id: 'compact', name: 'compact' }, 
  { id: 'Rnord', name: 'Rnord' }, 
];

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
    isToolbarVisible, setIsToolbarVisible,
  } = useResume();

  return (
    <div className="toolbar-container-vertical">
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