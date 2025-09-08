import './Header.css';
function Header(){
    return (
        <div className="header">
            <div className="header3"></div>
            {/* Insert icon */}
            <div className="header2">
                <a>Home</a>
                <a>Features</a>
                <a>Templates</a>
                <a>Testimonials</a>
                <a>FAQ</a>
            </div>
            <div className="header3">
                <button>Login</button>
                <button>Get Started</button>
            </div>
        </div>
    );
}
export { Header };