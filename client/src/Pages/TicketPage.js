import React from 'react';
import { useParams } from 'react-router-dom';
import './TicketPage.css';

const events = [
  { id: '1', title: "SIP & VIBE", date: "Feb 20, 2025", time: "10:00 AM", image: '../images/image1.jpeg', description: "Sip on your favorite drink and vibe to smooth tunes...", price: "Ksh 1,500" },
  { id: '2', title: "HIP-HOP STREET", date: "Mar 15, 2025", time: "2:00 PM", image: '../images/image2.jpeg', description: "Get ready to feel the beat at HIP-HOP STREET!...", price: "Ksh 2,000" },
  // Add the rest of the events here with ids
];

const TicketPage = () => {
  const { id } = useParams();
  const event = events.find(event => event.id === id);

  if (!event) return <h2>Event not found</h2>;

  return (
    <div className="ticket-page-container">
      <img src={event.image} alt={event.title} className="ticket-image" />
      <h2 className="ticket-title">{event.title}</h2>
      <p className="ticket-date-time">{event.date} at {event.time}</p>
      <p className="ticket-description">{event.description}</p>
      <p className="ticket-price">Price: {event.price}</p>
      <button className="buy-ticket-btn">Buy Ticket</button>
    </div>
  );
};

export default TicketPage;
