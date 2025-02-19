import React from 'react'
import './Navbar.css'
function Navbar() {
  return (
    <>
    <header className="header">
        <a href="#" className="logo-link">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0d53468f8408c53aa2c9f2d0a86e6331b6609ac6744dc41946929048f6b8408?placeholderIfAbsent=true"
            alt="Eventick Logo"
            loading="lazy"
            className="logo-icon"
          />
          <div className="logo-text">
            <span className="logo-text-bold">Event</span>
            <span className="logo-text-regular">ick</span>
          </div>
        </a>
        <nav className="nav">
          <a href="#" className="nav-link">
            Schedule
          </a>
          <a href="#" className="nav-link">
            Ticket
          </a>
          <a href="#" className="nav-link">
            Contact
          </a>
          <a href="#" className="login-btn">
            Login
          </a>
          <a href="#" className="sign-btn">
            Sign Up
          </a>
        </nav>
      </header>

    </>
  )
}

export default Navbar
