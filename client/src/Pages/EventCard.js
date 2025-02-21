import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EventTickets.css";

const EventCard = ({ id, name, date, time, image }) => (
  <div className="bg-white p-4 shadow-lg rounded-lg flex flex-col w-[27rem] mx-auto">
    <img src={image} alt={name} className="w-full rounded-md" />
    <h3 className="text-lg font-semibold mt-3">{name}</h3>
    <p className="text-sm text-gray-500">{date} - {time}</p>
    <Link to={`/events/${id}`} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 text-center">
      View Details
    </Link>
  </div>
);

const EventTicketsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events?limit=10")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => <EventCard key={event.id} {...event} />)
          ) : (
            <p className="text-center text-gray-500">No events available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventTicketsPage;
