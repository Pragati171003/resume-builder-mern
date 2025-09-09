import React from 'react';
import './FeaturesPage.css'; // We will create this CSS file next
import { Link } from 'react-router-dom'; // To link the CTA button

// Importing icons for a professional look
import { FaBrain, FaRegFileAlt, FaPaintBrush, FaShareAlt, FaShieldAlt, FaCogs } from 'react-icons/fa';

// Array of features to make the code cleaner and easier to manage
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
          <p className="hero-subtitle">Discover the smart tools that make our AI Resume Builder the best choice for serious job seekers.</p>
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

      {/* Section 3: Call to Action */}
      <section className="features-cta-section">
        <h2>Ready to Build Your Winning Resume?</h2>
        <p>Take the next step in your career. Get started for free and experience the power of AI.</p>
        <Link to="/build-resume" className="cta-button"> {/* This link can go to your resume builder page */}
          Create My Resume Now
        </Link>
      </section>
    </div>
  );
}

export default FeaturesPage;