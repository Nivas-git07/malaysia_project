import EventCardX from "./eventcard";
import { FiArrowRight } from "react-icons/fi";
import img1 from "../../assets/image2.jpg";
import img2 from "../../assets/image3.jpg";
import img3 from "../../assets/background.png";
import logo from "../../assets/logo.jpg";
import { data } from "react-router-dom";

export default function UpcomingEvents({ event }) {
  console.log("home event data", event);

  const events = Array.isArray(event) ? event : [];

  return (
    <section className="mfsaEventX-section">
      <div className="mfsaEventX-container">
        {/* HEADER */}
        <div className="mfsaEventX-header">
          <h2>Upcoming Events</h2>
          <span className="mfsaEventX-view">
            View Calendar <FiArrowRight />
          </span>
        </div>

        {/* GRID */}
        <div className="mfsaEventX-grid">
          {events.length === 0 ? (
            <div className="mfsaEmptyState">
              <p>No upcoming events available.</p>
            </div>
          ) : (
            events.map((item) => (
              <EventCardX
                id={item.id}
                bg={item.image || img1}
                title={item.event_name}
                date={item.date}
                location={item.venue}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
