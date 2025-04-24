import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav sticky top-0 left-0 w-full z-50">
      <div className="nav-container">
        {/* Left: Logo + Title */}
        <div className="logo-title">
          <img src="/gold_logo_nobg.png" alt="Logo" className="logo-img" />
          <span className="logo-text">Job Tracker</span>
        </div>

        {/* Right: Menu Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/resumes" className="nav-link">
            Resumes
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
}
