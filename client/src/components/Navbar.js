import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
function Navbar({setUser,user}) {


  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  return (
    <>
    <header className="header">
      <Link to = {`/`}>
        <a  className="logo-link">
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
          <Link to={`/more-events`}> <div className="nav-link">
                  <a>  
                  Tickets
                  </a>
                  </div>
          </Link>
          <a href="#footer" className="nav-link">
            Contact
          </a>
          {user? (
             <Link to={`/profile`}> <div className="nav-link">
             <a  >  
             Account
             </a>
             </div>
     </Link>
          ):(
                      <Link to = {`/signup`}>
                      <a  className="sign-btn">
                        Sign Up
                      </a></Link>
          )}
          {user? (<button className="login-btn" onClick={handleLogoutClick}>Log out</button>):(         <Link to={`/login`}>
          
          <a  className="login-btn">
            Login
          </a></Link>)}
 

        </nav>
      </header>
    </>
  )
}

export default Navbar;
