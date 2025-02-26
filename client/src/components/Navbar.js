import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ setUser, user }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(user);
  const [isFading, setIsFading] = useState(false); // Controls fade-out effect

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  function handleLogoutClick() {
    setIsFading(true); // Start fade-out effect

    setTimeout(() => {
      fetch("/logout", { 
        method: "DELETE", 
        credentials: "include"
      }).then((response) => {
        if (response.ok) {
          localStorage.removeItem("jwtToken"); 
          setUser(null);
          setCurrentUser(null); 
          setIsFading(false); // Reset fade state after logout
          navigate("/login"); 
        }
      });
    }, 300); // Delay logout to allow transition
  }

  return (
    <header className={`header ${isFading ? "fade-out" : "fade-in"}`}>
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
        {/* Fix: Use <button> instead of <a> for internal page scrolling */}
        <button className="nav-link" onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}>
          Contact
        </button>

        {currentUser ? (
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
