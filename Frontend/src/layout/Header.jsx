import './Header.css';
import { Link, NavLink } from 'react-router-dom'; // <-- 1. IMPORT LINK/NAVLINK

function Header() {
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
        <Link to="/login" className="btn-login">Login</Link>
        <Link to="/signup" className="btn-get-started">Get Started</Link>
      </div>
    </header>
  );
}

export { Header };