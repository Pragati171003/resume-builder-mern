import './Header.css';
import { Link, NavLink } from 'react-router-dom'; // <-- 1. IMPORT LINK/NAVLINK
import { useAuth } from '../context/AuthContext';

function Header() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <header className="header">
      <Link to="/" className="header-left"> {/* <-- 2. USE LINK FOR THE LOGO */}
        <img src="https://i.imgur.com/gC4G95K.png" alt="CVCRAFT Logo" className="logo" />
        <span className="logo-text">CVCRAFT</span>
      </Link>
      <nav className="header-nav">
        {/* 3. REPLACE <a> WITH <NavLink> OR <Link> */}
        {/* NavLink is special: it can be styled when it's the active page */}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/templates">Templates</NavLink>
        <NavLink to="/testimonials">Testimonials</NavLink>
        <NavLink to="/faq-page">FAQ</NavLink> {/* Renamed to avoid confusion with the component */}
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