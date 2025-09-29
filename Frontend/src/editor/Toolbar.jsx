import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Toolbar.css';
import Template1 from '../assets/resume_pages-to-jpg-0001.jpg'
import Template2 from '../template-previews/img21.jpg'
import Template3 from '../template-previews/elegant_page-0001.jpg';
import Template4 from '../template-previews/onepage_pages-to-jpg-0001.jpg'
import Template5 from '../template-previews/caffeine_page-0001.jpg'
import Template6 from '../template-previews/kendall_page-0001.jpg'
import Template7 from '../template-previews/stackoverflow_page-0001.jpg'
import Template8 from '../template-previews/resume_class_pages-to-jpg-0001.jpg'
import Template9 from '../template-previews/resume_short_page-0001.jpg'
import Template10 from '../template-previews/spartan_page-0001.jpg'
import Template11 from '../template-previews/visual-js-jest-image-snapshot-usage-with-an-image-received-from-puppeteer-works-1-snap.png'
import Template12 from '../template-previews/paper.jpg'
import Template13 from '../template-previews/index_page-0001.jpg'
import Template14 from '../template-previews/modern (1)_page-0001.jpg'
import Template15 from '../template-previews/Untitled Resume (3)_pages-to-jpg-0001.jpg'
import Template16 from '../template-previews/Untitled Resume (37)_page-0001.jpg'
import Template17 from '../template-previews/Richard Hendriks — Programmer_page-0001.jpg'
import Template18 from '../template-previews/modern (3)_page-0001.jpg'
import Template19 from '../template-previews/phone_page-0001.jpg'
import Template20 from '../template-previews/tech_page-0001.jpg'
import Template21 from '../template-previews/boilerplate-preview_page-0001.jpg'
import Template22 from '../template-previews/Untitled Resume (5)_page-0001.jpg'
import Template23 from '../template-previews/John Doe_page-0001.jpg'
import Template24 from '../template-previews/standard-resume_page-0001.jpg'
import Template25 from '../template-previews/Untitled Resume (6)_page-0001.jpg'
import Template26 from '../template-previews/Untitled Resume (36)_page-0001.jpg'
import Template27 from '../assets/images/image.png'



const templates = [
  { id: 'tech', name: 'Tech',imageUrl:Template20 }, 
  { id: 'onepage', name: 'Onepage' ,imageUrl:Template4},
  { id: 'onepage-plus', name: 'Onepage Plus',imageUrl:Template1 },
  { id: 'flat', name: 'Flat' ,imageUrl:Template2},
  { id: 'elegant', name: 'Elegant',imageUrl: Template3},
  { id: 'stackoverflow', name: 'StackOverflow',imageUrl:Template7 },
  //{ id: 'classy-vforesee', name: 'Classy Vforesee',imageUrl:Template16 }, 
  { id: 'macchiato', name: 'Macchiato',imageUrl:Template11 },
    { id: 'kendall', name: 'Kendall',imageUrl:Template6 },
  { id: 'spartan', name: 'Spartan',imageUrl:Template10 },
  { id: 'paper', name: 'Paper',imageUrl:Template12 },
  //{id:'sceptile',name:'Sceptile'},
  { id: 'short', name: 'Short',imageUrl:Template9 },   
  { id: 'straightforward', name: 'Straightforward',imageUrl:Template13 },    
  { id: 'bufferbloat', name: 'Bufferbloat',imageUrl:Template14}, 
  { id: 'simplyelegant', name: 'Simplyelegant',imageUrl:Template15 }, 
  //not worked{ id: 'randytarampi', name: 'Randytarampi' }, 
  //{ id: 'umennel', name: 'Umennel' }, 
  { id: 'eloquent', name: 'Eloquent',imageUrl:Template17 }, 
  { id: 'paperalt', name: 'Paperalt',imageUrl:Template18 }, 
  { id: 'straightforward-with-telephone', name: 'Straightforward-with-telephone',imageUrl:Template19 }, 
  //{ id: 'bluetime', name: 'bluetime' }, 
  { id: 'caffeine', name: 'Caffeine',imageUrl:Template5 }, 
  //{ id: 'elegant-ryantrinkle', name: 'Elegant Ryantrinkle' }, 
  //{ id: 'moon', name: 'Moon' }, 
  { id: 'class', name: 'Class',imageUrl:Template8 }, 
  //{ id: 'relaxed', name: 'Relaxed' }, 
  { id: 'boilerplate', name: 'Boilerplate',imageUrl:Template21 }, 
  { id: 'nominaltech-nl', name: 'Nominaltech-nl', imageUrl:Template26}, 
  { id: 'eternal', name: 'Eternal',imageUrl:Template22 }, 
  { id: 'compact', name: 'compact',imageUrl:Template25 }, 
  {id:"papirus", name : 'Papirus', imageUrl : Template27},
  { id: 'standard-resume', name: 'Standard',imageUrl:Template24 },
];

const colors = [
  '#2563eb', 
  '#111827', 
  '#4f46e5', 
  '#059669', 
  '#db2777', 
  '#84cc16', 
];
const fonts = [
  "'Inter', sans-serif", 
  "'Roboto', sans-serif",
  "'Lato', sans-serif",
  "'Montserrat', sans-serif",
  "'Georgia', serif", 
  "'Garamond', serif",
  "'Calibri', sans-serif",
  "'Verdana', sans-serif",
];

const fontSizes = [ 
  { name: 'Small', value: 0.9 }, 
  { name: 'Normal', value: 1 }, 
  { name: 'Large', value: 1.1 },
  { name: 'Extra Large', value: 1.2 },
];
function Toolbar() {
  const { 
    activeToolbarTab, setActiveToolbarTab,
    selectedTemplate, setSelectedTemplate,
    themeColor, setThemeColor,
    fontFamily, setFontFamily,
    fontSize, setFontSize,resetStyles,
  } = useResume();

  return (
    <div className="toolbar-container">
      <div className="toolbar-tabs">
        <button 
          className={`tab-btn ${activeToolbarTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveToolbarTab('templates')}
        >
          Templates
        </button>
        <button 
          className={`tab-btn ${activeToolbarTab === 'styles' ? 'active' : ''}`}
          onClick={() => setActiveToolbarTab('styles')}
        >
          Styles
        </button>
      </div>
      <div className="toolbar-content">
        {activeToolbarTab === 'templates' && (
          <div className="template-grid-visual">
            {templates.map(t => (
              <div key={t.id} className={`template-card ${selectedTemplate === t.id ? 'active' : ''}`} onClick={() => setSelectedTemplate(t.id)}>
                <img src={t.imageUrl} alt={`${t.name} Template`} className="template-image-preview" />
                <h4 className="template-card-title">{t.name}</h4>
              </div>
            ))}
          </div>
        )}
        {activeToolbarTab === 'styles' && (
          <div className="styles-controls">
            <div className="toolbar-group">
              <h3>Color</h3>
              <div className="color-picker">{colors.map(color => ( <div key={color} className={`color-swatch ${themeColor === color ? 'active' : ''}`} style={{ backgroundColor: color }} onClick={() => setThemeColor(color)} /> ))}</div>
            </div>
            <div className="toolbar-group">
              <h3>Font</h3>
              <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>{fonts.map(font => ( <option key={font} value={font}>{font.split(',')[0].replace(/'/g, '')}</option> ))}</select>
            </div>
            <div className="toolbar-group">
              <h3>Size</h3>
              <div className="font-size-selector">{fontSizes.map(size => ( <button key={size.name} className={fontSize === size.value ? 'active' : ''} onClick={() => setFontSize(size.value)}>{size.name}</button>))}</div>
            </div>
            <div className="toolbar-group reset-section">
              <button className="reset-styles-btn" onClick={resetStyles}>
                Reset to Theme Defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Toolbar;