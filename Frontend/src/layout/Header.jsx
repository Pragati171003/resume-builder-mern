import './Header.css';
import { Link, NavLink,useLocation } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import logoImagec from '../assets/images/Screenshot 2025-09-09 172554.png'
import { FaBars, FaTimes } from 'react-icons/fa';
import {useState,useEffect} from 'react';

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
    <header className="header">
      <Link to="/" className="header-left" onClick={closeMobileMenu}> 
        <img src={logoImagec} alt="CVCRAFT Logo" className="logo" />
        <span className="logo-text">cvcraft</span>
      </Link>
      <nav className={`header-nav ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
        <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
        <NavLink to="/features" onClick={closeMobileMenu}>Features</NavLink>
        <NavLink to="/templates" onClick={closeMobileMenu}>Templates</NavLink>
        <NavLink to="/testimonials" onClick={closeMobileMenu}>Testimonials</NavLink>
        <NavLink to="/all-faqs" onClick={closeMobileMenu}>FAQ</NavLink> 
        <NavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</NavLink>
      </nav>
      
      <div className="header-right">
        {isLoggedIn ? (
          <Link to="/" onClick={() => { logout(); closeMobileMenu(); }} className="btn-login">Logout</Link>
        ) : (
          <Link to="/login" className="btn-login">Login</Link>
        )}
        <Link to="/signup" className="btn-get-started">Get Started</Link>
      </div>
      <button className="hamburger-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
    </header>
  );
}

export { Header };