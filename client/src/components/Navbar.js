import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'
function Navbar({setUser,user}) {


  function handleLogoutClick() {
    fetch("https://tiketi-tamashafrunt.onrender.com/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        localStorage.setItem("jwt", null)
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

          <Link to="/contact" className="nav-link">Contact</Link>
          {user? (     <Link to={`/calender`}>
          <a className="nav-link">Calender</a>
          </Link>):(null)}
     
         

            {user && user.role=="Organizer" ? (
              <Link to={`/organizer-dashboard`}> <div className="nav-link">
              <a  >  
               Dashboard
              </a>
              </div>
              </Link>):(null)}
             {user && user.role=="Attendee"? (
              <Link to={`/attendee-dashboard`}> <div className="nav-link">
              <a  >  
               Dashboard
              </a>
              </div></Link>):(null)}

          {user ? (null):(
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