import { Link, useLocation } from "react-router-dom";
import postcodeLogo from "../assets/postcodeLogo.svg";
import "./Navbar.css"; // Import the CSS file

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="left">
        {/* Make the logo clickable and navigate to the explore (home) page */}
        <Link to="/explore" className="logo-link">
          <img src={postcodeLogo} alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="right">
        <Link
          to="/explore" // Placeholder link for Explore page
          className={`navbar-link ${location.pathname === "/explore" ? "active" : ""}`}
        >
          Explore
        </Link>
        <Link
          to="/profile"
          className={`navbar-link ${location.pathname === "/profile" ? "active" : ""}`}
        >
          My Profile
        </Link>
        <Link
          to="/settings" // Placeholder link for Settings page
          className={`navbar-link ${location.pathname === "/settings" ? "active" : ""}`}
        >
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
