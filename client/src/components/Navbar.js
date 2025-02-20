import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="header">
      {/* ✅ Removed <a> inside <Link> */}
      <Link to="/" className="logo-link">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0d53468f8408c53aa2c9f2d0a86e6331b6609ac6744dc41946929048f6b8408?placeholderIfAbsent=true"
          alt="Eventick Logo"
          loading="lazy"
          className="logo-icon"
        />
        <div className="logo-text">
          <span className="logo-text-bold">Tiketi</span>
          <span className="logo-text-regular">Tamasha</span>
        </div>
      </Link>

      {/* ✅ Fixed navigation links */}
      <nav className="nav">
        <Link to="/schedule" className="nav-link">Schedule</Link>
        <Link to="/ticket" className="nav-link">Ticket</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/signup" className="sign-btn">Sign Up</Link>
      </nav>
    </header>
  );
}

export default Navbar;
