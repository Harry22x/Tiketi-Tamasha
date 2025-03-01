import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';
import UpcomingEvents from "./UpcomingEvents";
import AddTicket from "./AddTicket";
import image1 from '../images/image1.jpeg';
import Reviews from "../components/Reviews";
import { useOutletContext } from "react-router-dom";

export default function LandingPage() {
  let [onLogin, user] = useOutletContext();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://tiketi-tamashafrunt.onrender.com/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const firstEventId = events.length > 0 ? events[0].id : null;

  return (
    <div className="landing-container">
      <main className="main-content">
        <img src={image1} alt="K-pop Group" loading="lazy" className="hero-image" />
        <div className="content-wrapper">
          <h1 className="title">Unwind, Sip, and Vibe! </h1>
          <p className="description">
            Immerse yourself in a chill atmosphere where smooth tunes meet your favorite drinks...
          </p>
          <div className="button-group">
            {firstEventId ? (
              <Link to={`/events/${firstEventId}`} className="secondary-btn">
                Learn More
              </Link>
            ) : (
              <button className="secondary-btn" disabled>Loading...</button>
            )}
          </div>
        </div>
      </main>

    
      <UpcomingEvents events={events} />

      {user && user.role === "Organizer" ? <AddTicket key="add-ticket" /> : null}
      <Reviews />
    </div>
  );
}
