import React from "react";
import './LandingPage.css'
import UpcomingEvents from "./UpcomingEvents";
import AddTicket from "./AddTicket";
import EventsImage from "../images/Events1.jpg"; // Import the image
export default function LandingPage() {
  return (
    <div className="landing-container">
      
      <main className="main-content">
      <img
        src={EventsImage} // Use the imported image
        alt="K-pop Group"
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
            <a href="#" className="primary-btn">
              Get Ticket
            </a>
            <a href="#" className="secondary-btn">
              Learn More
            </a>
          </div>
        </div>
      </main>
      <UpcomingEvents />
      <AddTicket />
    </div>
  );
}
