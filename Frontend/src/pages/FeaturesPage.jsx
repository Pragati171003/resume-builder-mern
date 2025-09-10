import React from 'react';
import './FeaturesPage.css'; 
import { Link } from 'react-router-dom'; // To link the CTA button

import { FaBrain, FaRegFileAlt, FaPaintBrush, FaShareAlt, FaShieldAlt, FaCogs } from 'react-icons/fa';

const features = [
  
  {
    icon: <FaRegFileAlt size={32} className="feature-icon" />,
    title: 'ATS-Friendly Templates',
    description: 'Choose from a library of professionally designed templates optimized to pass through Applicant Tracking Systems (ATS) used by top companies.',
  },
  {
    icon: <FaPaintBrush size={32} className="feature-icon" />,
    title: 'Real-Time Design Customization',
    description: 'Instantly change fonts, colors, and layouts. Preview your changes live and create a resume that perfectly matches your personal brand.',
  },
  {
    icon: <FaShareAlt size={32} className="feature-icon" />,
    title: 'Easy Download & Share',
    description: 'Export your resume in multiple formats including PDF and DOCX. Share a unique link to your online resume with recruiters with a single click.',
  },
  {
    icon: <FaShieldAlt size={32} className="feature-icon" />,
    title: 'Data Privacy & Security',
    description: 'Your personal information is encrypted and secure. We prioritize your privacy and will never share your data with third parties.',
  },
  {
    icon: <FaCogs size={32} className="feature-icon" />,
    title: 'Intuitive Resume Management',
    description: 'Create and manage multiple versions of your resume tailored for different job applications, all from one simple and clean dashboard.',
  },
];

function FeaturesPage() {
  return (
    <div className="features-page">
      {/* Section 1: Hero */}
      <section className="features-hero">
        <div className="hero-content">
          <h1>Powerful Features to Land Your Dream Job</h1>
          <p className="hero-subtitle">Build a polished resume that gets noticed. Our smart tools make it simple to showcase your skills.</p>
        </div>
      </section>

      {/* Section 2: Features Grid */}
      <section className="features-grid-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {feature.icon}
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default FeaturesPage;