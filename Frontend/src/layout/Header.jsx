import './Header.css';
import { Link, NavLink } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import logoImagec from '../assets/images/Screenshot 2025-09-09 172554.png'

function Header() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <header className="header">
      <Link to="/" className="header-left"> 
        <img src={logoImagec} alt="CVCRAFT Logo" className="logo" />
        <span className="logo-text">CVCRAFT</span>
      </Link>
      <nav className="header-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/templates">Templates</NavLink>
        <NavLink to="/testimonials">Testimonials</NavLink>
        <NavLink to="/faq-page">FAQ</NavLink> 
      </nav>
      <div className="header-right">
        {isLoggedIn ? (<Link to="/" onClick={(e) => {e.preventDefault();logout();}}
        className="btn-login">Logout</Link>) : (
        <Link to="/login" className="btn-login">Login</Link> )}
        <Link to="/signup" className="btn-get-started">Get Started</Link>
      </div>
    </header>
  );
}

export { Header };