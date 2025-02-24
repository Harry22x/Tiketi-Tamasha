import React, { useState, useEffect } from "react";
import "./MoreEvents.css";
import event1 from '../images/event1.jpg'
import event from '../images/event.jpeg'
import event3 from '../images/event3.jpeg'
import event4 from '../images/event4.jpg'
import event7 from '../images/event7.jpg'
import event8 from '../images/event8.jpg'

const EventTicket = ({ id, name, date, time, image, description }) => (
  <div className="ticket-card">
    <img src={image} alt={name} className="ticket-image" />
    <div className="ticket-info">
      <h3>{name}</h3>
      <p>{date} - {time}</p>
      <p>{description}</p>
    </div>
  </div>
);

const EventPage = () => {
  const tickets = [
    { id: 1, name: "Gala & Eco-market Festival", date: "2025-03-7", time: "6:00 PM", image: event1, },
    { id: 2, name: "Harambee Starlets", date: "2025-02-21", time: "3:00 PM", image: event, },
    { id: 3, name: "Taste & Toast Brunch", date: "2025-03-08", time: "9:00 AM", image: event3, },
    { id: 4, name: "Fashion Forward", date: "2025-03-08", time: "6:00 PM", image: event4, },
    { id: 5, name: "The meat-Up Fest", date: "2025-03-01", time: "11:00 AM", image: event7, },
    { id: 6, name: "Meet & Great", date: "2025-03-01", time: "6:00 AM", image: event8, },
  ];
  

  return (
    <section className="events-container">
      <h2 className="events-title">Event Tickets</h2>
      <div className="tickets-grid">
        {tickets.map((ticket) => (
          <EventTicket key={ticket.id} {...ticket} />
        ))}
      </div>
    </section>
  );
};

export default EventPage;
