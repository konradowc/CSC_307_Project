import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import postcodeLogo from "../assets/postcodeLogo.svg";
import "./Navbar.css"; // Import the CSS file
import hamburger from "../assets/menu.svg";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="left">
        <Link to="/explore" className="logo-link">
          <img src={postcodeLogo} alt="Logo" className="logo" />
        </Link>
      </div>

      <div className={`right ${menuOpen ? "open" : ""}`}>
        <Link
          to="/explore" // Placeholder link for Explore page
          className={`navbar-link ${location.pathname === "/explore" ? "active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Explore
        </Link>
        <Link
          to="/profile"
          className={`navbar-link ${location.pathname === "/profile" ? "active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          My Profile
        </Link>
        <Link
          to="/settings" // Placeholder link for Settings page
          className={`navbar-link ${location.pathname === "/settings" ? "active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          Settings
        </Link>
      </div>

      <div
        className="hamburger"
        onClick={() => setMenuOpen(true)}
      >
        <img src={hamburger} alt="Menu" />
      </div>
    </nav>
  );
};

export default Navbar;
