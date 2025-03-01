import React, { useState, useEffect } from "react";
import "./MoreEvents.css";
import EventCard from "../components/EventCard";
import { FaSearch } from "react-icons/fa";

const MoreEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://tiketi-tamashafrunt.onrender.com/events")
      .then((r) => r.json())
      .then((data) => setEvents(data));
  }, []);

  // Function to filter events based on multiple attributes
  const filteredEvents = events.filter((event) => {
    const query = searchQuery.toLowerCase();
    return (
      event.name.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.date.toLowerCase().includes(query) ||
      event.time.toLowerCase().includes(query)
    );
  });

  const handleSearch = () => {
    // This function ensures the search happens when the button is clicked.
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="events-container">
      <h2 className="events-title">Event Tickets</h2>
      
      <div className="search-container">
        <input
          type="text"
          placeholder=""
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="tickets-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ticket) => <EventCard key={ticket.id} {...ticket} />)
        ) : (
          <p className="no-results">No matching events found.</p>
        )}
      </div>
    </section>
  );
};

export default MoreEvents;
