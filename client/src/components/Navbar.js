import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar({ setUser, user }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        localStorage.removeItem("jwt"); // ✅ Properly removes token
      }
    });
  }

  return (
    <>
      <header className="header">
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

        <nav className="nav">
          <Link to="/more-events" className="nav-link">Tickets</Link>
          <Link to="/contact" className="nav-link">Contact</Link>

          {user && <Link to="/calender" className="nav-link">Calender</Link>}

          {user?.role === "Organizer" && (
            <Link to="/organizer-dashboard" className="nav-link">Dashboard</Link>
          )}

          {user?.role === "Attendee" && (
            <Link to="/attendee-dashboard" className="nav-link">Dashboard</Link>
          )}

          {!user && <Link to="/signup" className="sign-btn">Sign Up</Link>}

          {user ? (
            <button className="login-btn" onClick={handleLogoutClick}>Log out</button>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
