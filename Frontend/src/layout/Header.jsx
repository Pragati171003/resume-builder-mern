import './Header.css';
function Header(){
    return (
        <>
            {/* Insert icon */}
            <div className="header">
                <a href="https://app.resumebuilder.com/build-resume">Resume Builder App</a>
                <a href="">Resume Examples</a>
                <a href="">Resume Templates</a>
                <a href="">My account</a>
                <button>Build your resume</button>
            </div>
        </>
    );
}
export { Header };
