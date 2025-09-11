import React from 'react';
import { Link } from 'react-router-dom';
import './TemplatesPage.css'; // We will create this CSS file next

// Import your thumbnail images
import onyxThumbnail from '../assets/images/Screenshot 2025-09-08 235043.png';
import quartzThumbnail from '../assets/images/Screenshot 2025-09-08 235043.png';

// An array to manage your templates. This makes it easy to add more later.
const templates = [
  {
    id: 'onyx',
    name: 'Onyx',
    thumbnail: onyxThumbnail,
    description: 'A clean, modern, single-column design perfect for tech and corporate roles.',
  },
  {
    id: 'quartz',
    name: 'Quartz',
    thumbnail: quartzThumbnail,
    description: 'A professional two-column layout that highlights skills and experience.',
  },
  // Add more template objects here as you create them
];

function TemplatesPage() {
  return (
    <div className="templates-page">
      <header className="templates-hero">
        <h1>Choose Your Template</h1>
        <p>Select a professionally designed, ATS-friendly template to start building your resume.</p>
      </header>

      <main className="templates-grid">
        {templates.map((template) => (
          // Each card is a Link to the editor
          <Link 
            key={template.id} 
            to={`/editor/new?template=${template.id}`} // Pass template ID as a query parameter
            className="template-card"
          >
            <div className="thumbnail-container">
              <img src={template.thumbnail} alt={`${template.name} resume template`} />
              <div className="overlay">
                <span>Use This Template</span>
              </div>
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}

export default TemplatesPage;