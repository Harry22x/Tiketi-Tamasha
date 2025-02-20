import React from "react";
import { Link } from "react-router-dom"; // ✅ Use Link for valid navigation
import './LandingPage.css';
import UpcomingEvents from "./UpcomingEvents";
import AddTicket from "./AddTicket";
import EventsImage from "../images/Events1.jpg"; // ✅ Import the image properly

export default function LandingPage() {
  return (
    <div className="landing-container">
      <main className="main-content">
        {/* ✅ Improved accessibility with lazy loading & alt text */}
        <img
          src={EventsImage}
          alt="K-pop Group performing live"
          loading="lazy"
          className="hero-image"
        />
        
        <div className="content-wrapper">
          <h1 className="title">SBS MTV The Kpop Show Ticket Package</h1>
          <p className="description">
            Look no further! Our SBS The Show tickets are the simplest way for
            you to experience a live Kpop recording.
          </p>

          <div className="button-group">
            {/* ✅ Use Link instead of <a href="#"> */}
            <Link to="/tickets" className="primary-btn">
              Get Ticket
            </Link>
            <Link to="/learn-more" className="secondary-btn">
              Learn More
            </Link>
          </div>
        </div>
      </main>
      
      {/* ✅ Render child components correctly */}
      <UpcomingEvents key="upcoming-events" />
      <AddTicket key="add-ticket" />
    </div>
  );
}
