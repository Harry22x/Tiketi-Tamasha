import React from "react";
import './Reviews.css'
const Reviews = () => {
  return (
    <section className="reviews-container">
      <div className="reviews-content">
        <div className="reviews-layout">
          <div className="reviews-header">
            <div className="reviews-title-wrapper">
              <h2 className="reviews-title">
                <span>What our clients are</span>
                <br />
                <span>saying about us?</span>
              </h2>
              <p className="reviews-subtitle">
                <span>
                  Discover how you can offset your adventure's carbon emissions
                </span>
                <br />
                <span>
                  and support the sustainable initiatives practiced by our
                </span>
                <br />
                <span>operators worldwide.</span>
              </p>
            </div>
          </div>

          <div className="reviews-cards">
            <article className="review-card review-card-primary">
              <div className="review-header">
                <div className="reviewer-info">
                  <img
                    src="https://placehold.co/64x64/f4a261/f4a261"
                    alt="Sara Mohamed profile"
                    className="reviewer-image"
                  />
                  <div className="reviewer-details">
                    <h3 className="reviewer-name">Sara Mohamed</h3>
                    <p className="reviewer-location">Jakatar</p>
                  </div>
                </div>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img
                      key={star}
                      src="https://placehold.co/12x12/ffd700/ffd700"
                      alt=""
                      className="star-icon"
                    />
                  ))}
                </div>
              </div>
              <p className="review-text">
                I've been using the hotel booking system for several years now,
                and it's become my go-to platform for planning my trips. The
                interface is user-friendly, and I appreciate the detailed
                information and real-time availability of hotels.
              </p>
            </article>

            <article className="review-card review-card-secondary">
              <div className="review-header">
                <div className="reviewer-info">
                  <img
                    src="https://placehold.co/64x64/2a9d8f/2a9d8f"
                    alt="Atend John profile"
                    className="reviewer-image"
                  />
                  <div className="reviewer-details">
                    <h3 className="reviewer-name">Atend John</h3>
                    <p className="reviewer-location">Califonia</p>
                  </div>
                </div>
              </div>
              <p className="review-text">
                I had a last-minute business trip, and the hotel booking system
                came to the rescue. I was able to find a high-quality hotel in
                no time and even got a great deal on the room. The confirmation
                process was straightforward, and I received all the necessary
                information promptly.
              </p>
            </article>
            <article className="review-card review-card-secondary">
              <div className="review-header">
                <div className="reviewer-info">
                  <img
                    src="https://placehold.co/64x64/2a9d8f/2a9d8f"
                    alt="Atend John profile"
                    className="reviewer-image"
                  />
                  <div className="reviewer-details">
                    <h3 className="reviewer-name">Atend John</h3>
                    <p className="reviewer-location">Califonia</p>
                  </div>
                </div>
              </div>
              <p className="review-text">
                I had a last-minute business trip, and the hotel booking system
                came to the rescue. I was able to find a high-quality hotel in
                no time and even got a great deal on the room. The confirmation
                process was straightforward, and I received all the necessary
                information promptly.
              </p>
            </article>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Reviews;
