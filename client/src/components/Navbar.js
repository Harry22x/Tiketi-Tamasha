import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar({ setUser, user }) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("/logout", { 
      method: "DELETE", 
      credentials: "include"
    }).then((response) => {
      if (response.ok) {
        localStorage.removeItem("jwtToken"); // Clear JWT from storage
        setUser(null);
        navigate("/login"); // Redirect to login page
      }
    });
  }

  return (
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
        <a href="#footer" className="nav-link">Contact</a>

        {user ? (
          <>
            <button className="login-btn" onClick={handleLogoutClick}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="sign-btn">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
