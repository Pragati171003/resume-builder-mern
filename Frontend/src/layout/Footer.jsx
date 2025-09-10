import './Footer.css';
import { FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function CallToAction() {
  return (
    <section className="cta-section">
      <h2>Start Your Resume Today!</h2>
      <p>Land your dream job with an optimized resume—fast & hassle-free!</p>
      <Link to="/build-resume" className="cta-button">Create my Resume Now</Link>
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
            <img src="https://i.imgur.com/gC4G95K.png" alt="CVCRAFT Logo" className="footer-logo" />
            <p>Talentsprint</p>
            <p>Hyderabad</p>
            <p>+91 1234567891</p>
            <p>contactus@gmail.com</p>
          </div>

          <div className="footer-links">
            <a href="#">Home</a>
            <a href="#">Features</a>
            <a href="#">Templates</a>
            <a href="#">Testimonials</a>
            <a href="#">FAQ</a>
          </div>

          <div className="footer-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
          </div>

          <div className="footer-right">
             <button className="scroll-top" onClick={scrollToTop}>
              <FaArrowUp />
             </button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 TEAM. All rights reserved.</p>
        </div>
      </footer>
    </>
  );}