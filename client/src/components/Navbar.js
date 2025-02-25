import React from 'react'
import './Navbar.css'
import { Link } from "react-router-dom";
function Navbar({setUser,user}) {
  function handleLogoutClick() {
    fetch("https://tiketi-tamashafrunt.onrender.com/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  return (
    <>
    <header className="header">
      <Link to = {`/`}>
        <a href="#" className="logo-link">
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
        </a></Link>
        <nav className="nav">
          <a href="#" className="nav-link">
            Schedule
          </a>
          <a href="#footer" className="nav-link">
            Contact
          </a>
          {user? (<button className="login-btn" onClick={handleLogoutClick}>Log out</button>):(         <Link to={`/login`}>
          
          <a href="#" className="login-btn">
            Login
          </a></Link>)}
 
          {user? (null):(
                      <Link to = {`/signup`}>
                      <a href="#" className="sign-btn">
                        Sign Up
                      </a></Link>
          )}

        </nav>
      </header>
    </>
  )
}

export default Navbar
