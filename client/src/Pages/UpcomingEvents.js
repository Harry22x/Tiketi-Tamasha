import React, { useState, useEffect } from "react";
import './UpcomingEvents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import "./LoadingAnimation.css"
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";


const UpcomingEvents = () => {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://tiketi-tamashafrunt.onrender.com/events')
      .then(r => r.json())
      .then(data => setEvents(data));
  }, []);

  if (events.length === 0) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-left w-full">Top Events</h2>
          <div className="flex space-x-6 ml-auto relative">
            {/* <div className="relative">
              <button className="filter-btn" onClick={() => setShowTypeDropdown(!showTypeDropdown)}>
                Type <FontAwesomeIcon icon={faChevronDown} className="arrow" />
              </button>
              {showTypeDropdown && (
                <div className="absolute bg-white shadow-md mt-2 rounded-lg">
                  <a href="/events?type=concerts" className="block px-4 py-2 hover:bg-gray-200">Concerts</a>
                  <a href="/events?type=activity" className="block px-4 py-2 hover:bg-gray-200">Activity</a>
                </div>
              )}
            </div> */}

            {/* <div className="relative">
              <button className="filter-btn" onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                Category <FontAwesomeIcon icon={faChevronDown} className="arrow" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute bg-white shadow-md mt-2 rounded-lg">
                  <a href="/events?category=music" className="block px-4 py-2 hover:bg-gray-200">Music</a>
                  <a href="/events?category=art" className="block px-4 py-2 hover:bg-gray-200">Art</a>
                  <a href="/events?category=sports" className="block px-4 py-2 hover:bg-gray-200">Sports</a>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.filter(event=>event.id<7).map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        <Link to={`/more-events`}> <div className="text-center mt-8">
        <a href="/events" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 border-none">  
        Load More
          </a>
        </div></Link>
       
      </div>
    </section>
  );
};

export default UpcomingEvents;

