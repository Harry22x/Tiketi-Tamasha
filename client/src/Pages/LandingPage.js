import React from "react";
import './LandingPage.css'
import UpcomingEvents from "./UpcomingEvents";
import AddTicket from "./AddTicket";
import image1 from '../images/image1.jpeg';
export default function LandingPage() {
  return (
    <div className="landing-container">
      
      <main className="main-content">
      <img
        src={image1} // Use the imported image
        alt="K-pop Group"
        loading="lazy"
        className="hero-image"
      />
        <div className="content-wrapper">
          <h1 className="title">Unwind, Sip, and Vibe! </h1>
          <p className="description">
          Immerse yourself in a chill atmosphere where smooth tunes meet your favorite drinks. Whether you're here for laid-back conversations or just soaking in the good vibes, this event is your perfect escape. Relax, connect, and make unforgettable memories!"
          </p>
          <div className="button-group">
            
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
