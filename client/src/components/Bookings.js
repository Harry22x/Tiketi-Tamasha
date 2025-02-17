import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the DatePicker
import "./Bookings.css";

function Bookings() {
  // State to hold user inputs
  const [eventName, setEventName] = useState("");
  const [place, setPlace] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEventChange = (e) => {
    setEventName(e.target.value); // Update the event name state
  };

  const handlePlaceChange = (e) => {
    setPlace(e.target.value); // Update the place state
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
  };

  const handleSearch = () => {
    // Handle the search functionality (for now, log the search data)
    console.log("Searching for:", eventName, place, selectedDate);
  };

  const formatDate = (date) => {
    if (date) {
      return date.toLocaleDateString(); // Format the date to a user-friendly string
    }
    return "Any date"; // Default text if no date is selected
  };

  return (
    <div className="search-box">
      <div className="search-container">
        <div className="search-columns">
          <div className="search-column">
            <div className="column-content">
              <span className="column-label">Search Event</span>
              <input
                type="text"
                value={eventName}
                onChange={handleEventChange}
                placeholder="Enter event name"
                className="input-field"
              />
              <div className="column-separator" />
            </div>
          </div>

          <div className="search-column">
            <div className="column-content">
              <span className="column-label">Place</span>
              <input
                type="text"
                value={place}
                onChange={handlePlaceChange}
                placeholder="Enter place"
                className="input-field"
              />
              <div className="column-separator" />
            </div>
          </div>

          <div className="search-column">
            <div className="column-content">
              <div className="date-selector">
                <div className="date-content">
                  <span className="column-label">Time</span>
                  <h2 className="column-value">{formatDate(selectedDate)}</h2>
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  placeholderText="Select a date"
                  className="date-picker"
                  dateFormat="MMMM dd, yyyy"
                />
                <i className="ti ti-chevron-down chevron-icon" />
              </div>
              <div className="column-separator" />
            </div>
          </div>
        </div>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Bookings;