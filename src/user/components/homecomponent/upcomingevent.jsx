import EventCardX from "./eventcard";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function UpcomingEvents({ event }) {
  const events = Array.isArray(event) ? event : [];

  return (
    <section className="mfsaEventX-section">
      <div className="mfsaEventX-container">

        {/* HEADER */}
        <motion.div
          className="mfsaEventX-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Upcoming Events</h2>
          <span className="mfsaEventX-view">
            View Calendar <FiArrowRight />
          </span>
        </motion.div>

        {/* GRID */}
        <motion.div
          className="mfsaEventX-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {events.length === 0 ? (
            <div className="mfsaEmptyState">
                 <p>No upcoming events available.</p>
            </div>
         
          ) : (
            events.map((item) => (
              <EventCardX
                key={item.id}
                id={item.id}
                bg={item.image}
                title={item.event_name}
                date={item.date}
                location={item.venue}
              />
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}