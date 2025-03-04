import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ id, name, date, time, image }) => {
  const formattedDate = new Date(date).toDateString(); 

  return (
    <Link to={`/events/${id}`}>
      <div className="bg-white p-3 shadow-md h-full flex flex-col justify-between w-[27rem] mx-auto">
        <img src={image} alt={name} className="w-full rounded-md" />
        <h3 className="text-lg font-semibold mt-2">{name}</h3>
        <p className="text-xs text-gray-500 mt-1">{formattedDate} - {time}</p>
      </div>
    </Link>
  );
};

export default EventCard;

