import './Footer.css';
import { FaArrowUp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logoImagec from '../assets/images/Screenshot 2025-09-09 172554.png'

function CallToAction() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <section className="cta-section">
      <h2>Start Your Resume Today!</h2>
      <p>Land your dream job with an optimized resume—fast & hassle-free!</p>
      <Link to="/build-resume" className="cta-button"  onClick={handleClick}>Create my Resume Now</Link>
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

          <div className="footer-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
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