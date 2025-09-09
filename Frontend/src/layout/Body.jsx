import './Body.css';
import myScreenshot1 from '../assets/images/Screenshot 2025-09-08 235014.png';
import myScreenshot2 from '../assets/images/Screenshot 2025-09-08 235043.png';
import myScreenshot3 from '../assets/images/Screenshot 2025-09-08 235055.png';
import { Link } from 'react-router-dom';


function Body() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <img src="https://i.imgur.com/2JtF2gP.png" alt="AI Icon" className="hero-icon" />
        <h1>Build a Job-Winning <br /> Resume in Minutes</h1>
        <p className="hero-subtitle">Our website helps you craft professional, ATS-friendly resumes effortlessly.</p>
        <Link to="/signup" className="hero-button">
          Get Started for Free
        </Link>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our AI Resume Builder?</h2>
        <p className="section-subtitle">Smart Features to Elevate Your Job Application</p>
        <div className="features-showcase">
          {/* Replace with your laptop image */}
          <img 
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=800" 
            alt="Resume builder on laptop" 
            className="laptop-img" 
          />
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
        <h2>Explore Professional Resume Templates</h2>
        <p className="section-subtitle">Browse a variety of expertly designed resume templates tailored for different industries and career levels.</p>
        {/* Replace with template gallery image */}
        <img src="https://i.imgur.com/2fVw1J7.png" alt="Resume templates" className="templates-gallery" />
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="testimonial-content">
          <p className="quote">
            “This AI-powered resume builder made the job application process so much easier! The suggestions were spot-on, and my resume looks more professional than ever. I landed an interview within a week!”
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