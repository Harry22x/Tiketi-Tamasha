import React, { useState, useEffect } from "react";
import './UpcomingEvents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import "./LoadingAnimation.css"
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";


const UpcomingEvents = ({ events }) => {
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  

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
     
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.slice(0, 6).map((event, index) => (
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

