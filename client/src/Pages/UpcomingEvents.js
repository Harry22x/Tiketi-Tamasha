import React from "react";
import './UpcomingEvents.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import image1 from '../images/image1.jpeg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image3.jpeg';
import image4 from '../images/image4.jpeg';
import image5 from '../images/image5.jpeg';
import image6 from '../images/image6.jpeg';

const EventCard = ({ title, date, time, image, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg mb-4" />
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-sm text-gray-500 mb-4">{description}</p> {/* Added description */}
    <p className="text-sm text-gray-500">{date} - {time}</p> {/* Added time */}
  </div>
);

const UpcomingEvents = () => {
  const events = [
    { title: "SIP & VIBE", date: "Feb 20, 2025", time: "10:00 AM", image: image1, description: "Sip on your favorite drink and vibe to smooth tunes in a laid-back atmosphere. Whether you're into casual conversations or just relaxing with friends, this event is the perfect escape to unwind and enjoy great company." },
    { title: "HIP-HOP STREET", date: "Mar 15, 2025", time: "2:00 PM", image: image2, description: "Get ready to feel the beat at HIP-HOP STREET! A high-energy event full of electrifying performances, breakdancing battles, and the freshest tracks in the game. Whether you're a seasoned dancer or just love the vibe, this is the place to be for a night of fun, music, and urban culture!" },
    { title: "POETRY & CLAY", date: "Apr 10, 2025", time: "9:00 AM", image: image3, description: "Let your creativity flow at Poetry & Clay! A unique event where words and art come together. Experience powerful spoken word performances while you get your hands dirty in a clay art session, creating your very own masterpieces!" },
    { title: "CHESS WORKSHOP", date: "May 5, 2025", time: "11:30 AM", image: image4, description: "Sharpen your mind at the Chess Workshop! Whether you're a beginner or a seasoned player, join us for an insightful session of strategy, puzzles, and learning from chess experts. Perfect for anyone looking to improve their game and take their skills to the next level!" },
    { title: "BACK TO ROCK", date: "Jun 30, 2025", time: "1:00 PM", image: image5, description: "Step back in time with Back to Rock! This event celebrates the golden era of rock music with live bands playing your favorite classic hits. If you love the raw energy of guitars, drums, and vocals, this nostalgic experience will take you on a wild ride through the heart of rock!" },
    { title: "TARMAC RACING", date: "Jul 25, 2025", time: "4:00 PM", image: image6, description: "Get your engines revving at Tarmac Racing! A thrilling day of high-speed action where you'll witness adrenaline-fueled races and see some of the fastest cars tear through the track. Feel the rush as skilled drivers go head-to-head in a heart-pounding race to the finish line!" },
  ];
  

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-left w-full">Upcoming Events</h2>
          <div className="flex space-x-6 ml-auto">
            <button className="filter-btn">
              Weekdays <FontAwesomeIcon icon={faChevronDown} className="arrow" />
            </button>
            <button className="filter-btn">
               Type <FontAwesomeIcon icon={faChevronDown} className="arrow" />
            </button>
            <button className="filter-btn">
              Category <FontAwesomeIcon icon={faChevronDown} className="arrow" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/events" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Load More
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
