import './Body.css';
import myScreenshot1 from '../assets/images/Screenshot 2025-09-08 235014.png';
import myScreenshot2 from '../assets/images/Screenshot 2025-09-08 235043.png';
import myScreenshot3 from '../assets/images/Screenshot 2025-09-08 235055.png';
import { Link } from 'react-router-dom';
import fullLogo from '../assets/images/Screenshot 2025-09-09 172420.png'
import './AnimatedHero.css';
import { FaRobot, FaFileAlt, FaPalette, FaDownload } from 'react-icons/fa';
import './Marquee.css';

const placeholderResumes = [
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'data:image/jpeg;base64,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',
  'https://ih1.redbubble.net/image.5287552061.6571/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg',
];


const AnimatedBackground = () => (
  <ul className="hero-background">
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
    <li className="floating-icon"></li>
  </ul>
);

function Body() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <AnimatedBackground />
        <div className="hero-content-wrapper">
          <img src={fullLogo} alt="CVCRAFT Icon" className="hero-icon" />
          <h1>Build a Job-Winning <br /> Resume in Minutes</h1>
          <p className="hero-subtitle">Our website helps you craft professional, ATS-friendly resumes effortlessly.</p>
          <Link to="/signup" className="hero-button">
            Get Started For Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-intro">
          <h2>Why Choose Our Resume Builder?</h2>
          <p className="section-subtitle">
            Smart, intuitive tools designed to elevate your job application.
          </p>
        </div>

        <div className="features-grid">

          {/* Feature Card 2 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FaFileAlt className="feature-icon" />
            </div>
            <h3 className="feature-title">ATS-Friendly Templates</h3>
            <p className="feature-description">
              Choose from a library of professional templates optimized to pass through modern Applicant Tracking Systems.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FaPalette className="feature-icon" />
            </div>
            <h3 className="feature-title">Effortless Customization</h3>
            <p className="feature-description">
              Easily change colors, fonts, and layouts to create a resume that perfectly matches your personal brand.
            </p>
          </div>
          
          {/* Feature Card 4 */}
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FaDownload className="feature-icon" />
            </div>
            <h3 className="feature-title">Instant PDF Downloads</h3>
            <p className="feature-description">
              Generate a high-quality, pixel-perfect PDF of your resume in seconds, ready to send to recruiters.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>Build Your Resume in Minutes</h2>
        <p className="section-subtitle">Create a standout resume in just a few simple steps—quick, easy.</p>
        <div className="steps-container">
          <div className="step">
            <img src={myScreenshot1} alt="Enter details illustration" />
            <div className="step-text">
              <span className="step-number">1</span>
              <h3>Enter Your Details</h3>
              <p>Start by providing key information such as your job title, experience, and skills. Our system tailors suggestions based on your input to match industry standards.</p>
            </div>
          </div>
          <div className="step reverse">
            <img src={myScreenshot2} alt="Customize and preview illustration" />
            <div className="step-text">
              <span className="step-number">2</span>
              <h3>Customize & Preview in Real-Time</h3>
              <p>Personalize your resume by selecting different templates, adjusting sections, and refining content. See instant changes as you fine-tune your resume to perfection.</p>
            </div>
          </div>
          
          <div className="step">
            <img src={myScreenshot3} alt="Download or share illustration" />
            <div className="step-text">
              <span className="step-number">3</span>
              <h3>Download or Share Instantly</h3>
              <p>Once you're satisfied with your resume, download it in your preferred format or share it directly with potential employers—all in just a few clicks!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="templates-section">
        <div className="templates-intro">
          <h2>Explore Professional Resume Templates</h2>
          <p className="section-subtitle">
            Browse a variety of expertly designed templates tailored for every industry and career level.
          </p>
        </div>

        {/* This is the marquee container */}
        <div className="marquee-container">
          <div className="marquee-track">
            {placeholderResumes.map((src, index) => (
              <img key={`first-${index}`} src={src} alt={`Resume template ${index + 1}`} className="resume-image-item" />
            ))}
            {placeholderResumes.map((src, index) => (
              <img key={`second-${index}`} src={src} alt={`Resume template ${index + 1}`} className="resume-image-item" />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="testimonial-content">
          <p className="quote">
            “This resume builder made the job application process so much easier! The suggestions were spot-on, and my resume looks more professional than ever. I landed an interview within a week!”
          </p>
          <div className="author">
            {/* Replace with author's image */}
            <img src="https://i.imgur.com/TUh2d9G.png" alt="Joshphlen Alexander" />
            <div className="author-info">
              <p className="author-name">Joshphlen Alexander</p>
              <p className="author-title">Marketing Specialist</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export { Body };