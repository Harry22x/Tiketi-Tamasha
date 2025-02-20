import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EventPage.css";

function EventPage() {
  const { id } = useParams();
  const [{ data: event, error, status }, setEvent] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const [selectedTickets, setSelectedTickets] = useState({});

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch event data");
        return r.json();
      })
      .then((event) => setEvent({ data: event, error: null, status: "resolved" }))
      .catch((err) => setEvent({ data: null, error: err.message, status: "rejected" }));
  }, [id]);

  const handleTicketChange = (ticketType, price, change) => {
    setSelectedTickets((prev) => {
      const updatedTickets = { ...prev };
      if (updatedTickets[ticketType]) {
        updatedTickets[ticketType].quantity += change;
        if (updatedTickets[ticketType].quantity <= 0) delete updatedTickets[ticketType];
      } else if (change > 0) {
        updatedTickets[ticketType] = { quantity: 1, price };
      }
      return updatedTickets;
    });
  };

  const totalAmount = Object.values(selectedTickets).reduce(
    (total, ticket) => total + ticket.quantity * parseFloat(ticket.price),
    0
  );

  if (status === "pending") return <p className="loading">Loading event details...</p>;
  if (status === "rejected") return <p className="error">⚠️ Error: {error}</p>;

  return (
    <div className="event-container">
      <div className="event-header">
        <h1 className="event-title">{event?.name || "Event Name"}</h1>
        <p className="event-date">
          {event?.time || "Time"} {event?.date || "Date"} • {event?.location || "Location"}
        </p>
      </div>

      <div className="event-content">
        <div className="tickets-section">
          <h2 className="section-title">Tickets</h2>
          <div className="ticket-list">
            {(event?.event_tickets || [])
              .filter(ticket => new Date(ticket.sale_end_date) > new Date())
              .map((ticket) => (
                <div className="ticket-card" key={ticket.id}>
                  <div className="ticket-info">
                    <p className="ticket-type">{ticket.ticket_type}</p>
                    <p className="ticket-price">{parseFloat(ticket.price).toLocaleString()} KES</p>
                  </div>
                  <div className="ticket-actions">
                    <button className="quantity-btn" onClick={() => handleTicketChange(ticket.ticket_type, ticket.price, -1)}>-</button>
                    <span className="ticket-quantity">{selectedTickets[ticket.ticket_type]?.quantity || 0}</span>
                    <button className="quantity-btn" onClick={() => handleTicketChange(ticket.ticket_type, ticket.price, 1)}>+</button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="total-section">
          <h2 className="section-title">Total</h2>
          <p className="total-tickets">
            Tickets: {Object.values(selectedTickets).reduce((sum, ticket) => sum + ticket.quantity, 0)}
          </p>
          <p className="total-price">Total: {totalAmount.toLocaleString()} KES</p>
          <button className="purchase-button">Purchase tickets</button>

          {/* ✅ Fixed `alt` attribute for accessibility & prevented crash if `event.image` is missing */}
          {event?.image && <img className="event-image" src={event.image} alt="Event banner" />}
        </div>
      </div>
    </div>
  );
}

export default EventPage;
