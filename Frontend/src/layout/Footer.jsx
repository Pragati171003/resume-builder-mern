import './Footer.css';
import { FaArrowUp, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logoImagec from '../assets/images/Screenshot 2025-09-09 172420.png'
import { FaXTwitter } from "react-icons/fa6";
function CallToAction() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <section className="cta-section">
      <h2>Start Your Resume Today!</h2>
      <p>Land your dream job with an optimized resume—fast & hassle-free!</p>
      <Link to="/build-resume" className="cta-button"  onClick={handleClick}>Create My Resume Now</Link>
    </section>
  );
}

export function Footer() {
   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
   };

  return (
    <>
      <CallToAction />
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            {/* Replace with your logo */}
            <img src={logoImagec} alt="CVCRAFT Logo" className="footer-logo" />
            <p>Talentsprint</p>
            <p>Hyderabad</p>
            <p>+91 1234567891</p>
            <p>contactus@gmail.com</p>
          </div>

          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/features">Features</a>
            <a href="/templates">Templates</a>
            <a href="/testimonials">Testimonials</a>
            <a href="/faq-page">FAQ</a>
          </div>

          <div className="footer-social-links">
            <h4>Follow Us</h4>
            <div className="social-icons-group">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon facebook-icon">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-icon twitter-icon">
              <FaXTwitter />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon linkedin-icon">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon instagram-icon">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-right">
             <button className="scroll-top" onClick={scrollToTop}>
              <FaArrowUp size={22} color="currentColor"/>
             </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 TEAM. All rights reserved.</p>
        </div>
      </footer>
    </>
  );}