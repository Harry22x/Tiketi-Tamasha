import React, { useState, useEffect } from "react";
import "./MoreEvents.css";
import EventCard from "../components/EventCard";

import event1 from '../images/event1.jpg'
import event from '../images/event.jpeg'
import event3 from '../images/event3.jpeg'
import event4 from '../images/event4.jpg'
import event7 from '../images/event7.jpg'
import event8 from '../images/event8.jpg'

// const EventTicket = ({ id, name, date, time, image, description }) => (
//   <div className="ticket-card">
//     <img src={image} alt={name} className="ticket-image" />
//     <div className="ticket-info">
//       <h3>{name}</h3>
//       <p>{date} - {time}</p>
//       <p>{description}</p>
//     </div>
//   </div>
// );

const MoreEvents = () => {
  
const [events, setEvents] = useState([]);
  
 useEffect(() => {
    fetch('/events')
      .then(r => r.json())
      .then(data => setEvents(data));
  }, []);
  
  return (
    <section className="events-container">
      <h2 className="events-title">Event Tickets</h2>
      <div className="tickets-grid">
        {events.map((ticket) => (
          <EventCard key={ticket.id} {...ticket} />
        ))}
      </div>
    </section>
  );
};

export default MoreEvents;
