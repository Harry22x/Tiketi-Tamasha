import React from "react";
import './AddTicket.css'
function AddTicket() {
  return (
    <div className="create-events-container">
      <div className="create-events-content">
        <div className="create-events-layout">
          <div className="image-column">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2c792f3bdbe1e6fca6ff29c6d92b0a2bc16c53240a960656083e5772cdb246f3?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c792f3bdbe1e6fca6ff29c6d92b0a2bc16c53240a960656083e5772cdb246f3?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c792f3bdbe1e6fca6ff29c6d92b0a2bc16c53240a960656083e5772cdb246f3?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c792f3bdbe1e6fca6ff29c6d92b0a2bc16c53240a960656083e5772cdb246f3?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c792f3bdbe1e6fca6ff29c6d92b0a2bc16c53240a960656083e5772cdb246f3?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c792f3bdbe1e6fca6ff29c6d92b0a2bc16c53240a960656083e5772cdb246f3?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c792f3bdbe1e6fca6ff29c6d92b0a2bc16c53240a960656083e5772cdb246f3?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2c792f3bdbe1e6fca6ff29c6d92b0a2bc16c53240a960656083e5772cdb246f3?placeholderIfAbsent=true"
              className="event-image"
              alt="Create event illustration"
            />
          </div>
          <div className="content-column">
            <div className="content-wrapper">
              <h1 className="main-heading">Make your own Event</h1>
              <p className="description">
                Have an idea for an amazing event? Whether it's a music concert, a workshop, or a social gathering, you can create and manage your own event effortlessly. Set the details, share with your audience, and make it an experience to remember. Start planning today!
              </p>
              <button className="create-button">Create Events</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTicket;
