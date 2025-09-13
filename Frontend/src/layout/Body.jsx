import './Body.css';
import myScreenshot1 from '../assets/images/Screenshot 2025-09-08 235014.png';
import myScreenshot2 from '../assets/images/Screenshot 2025-09-08 235043.png';
import myScreenshot3 from '../assets/images/Screenshot 2025-09-08 235055.png';
import { Link } from 'react-router-dom';
import fullLogo from '../assets/images/Screenshot 2025-09-09 172420.png'
import './AnimatedHero.css';
import { FaRobot, FaFileAlt, FaPalette, FaDownload } from 'react-icons/fa';
import './Marquee.css';
import Template1 from '../assets/resume_pages-to-jpg-0001.jpg'

const placeholderResumes = [
  Template1,
  Template1,
  Template1,
  Template1,
  Template1,
  Template1,
  Template1,
  Template1,
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