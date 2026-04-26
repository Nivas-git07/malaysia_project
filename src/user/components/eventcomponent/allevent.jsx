import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "../../assets/event1.png";
import img2 from "../../assets/event2.png";
import img3 from "../../assets/event3.png";
import img4 from "../../assets/event4.png";
import img5 from "../../assets/event5.png";
import img6 from "../../assets/event6.png";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { getallevents } from "../../api/event";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getevents } from "../../api/event";
export default function EventsPage() {
  const { stateId, clubId } = useParams();

  const [filter, setFilter] = useState("");

  const params = clubId ? { clubId } : stateId ? { stateId } : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", params],
    queryFn: () => (params ? getevents(params) : getallevents()),
  });

  const events = data?.data || [];
  const today = new Date();

  const filteredEvents = events.filter((event) => {
    if (!event.date) return true;

    const eventDate = new Date(event.date);

    if (filter === "UPCOMING") {
      return eventDate >= today;
    } else if (filter === "PAST") {
      return eventDate < today;
    }

    return true;
  });

  // const events = eventData?.data || [];
  console.log("Events Data:", events);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  return (
    <section className="eventsSection">
      <div className="eventsInner">
        {/* HEADER */}
        <div className="eventsHeader">
          <div className="left">
            <h2 className="up">EVENTS</h2>
            <p>Discover the latest competitions and community gatherings.</p>
          </div>

          <div className="right">
            <span className="filterText">Filter :</span>
            

            <button
              className={`filterBtns ${filter === "UPCOMING" ? "active" : ""}`}
              onClick={() => setFilter("UPCOMING")}
            >
              Upcoming
            </button>

            <button
              className={`filterBtns ${filter === "PAST" ? "active" : ""}`}
              onClick={() => setFilter("PAST")}
            >
              Past Events
            </button>

            {/* <button className="calendarBtn">View Calendar</button> */}
          </div>
        </div>

        <div className="eventsGrid">
          {filteredEvents.length === 0 ? (
            <div className="mfsaEmptyState">
              <div className="mfsaEmptyIcon">📅</div>

              <h3>No Events Available</h3>

              <p>
                There are currently no upcoming events scheduled. Please check
                back later or explore other sections.
              </p>

              <button className="mfsaEmptyBtn" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div className="mfsaEventCardX" key={event.id}>
                <div className="mfsaEventImgX">
                  <img
                    src={event.image}
                    alt={event.event_name}
                    loading="lazy"
                  />
                </div>

                <div className="mfsaEventOverlayX">
                  <span className="mfsaEventTagX">Event</span>

                  <h3 className="mfsaEventTitleX">{event.event_name}</h3>

                  <div className="mfsaEventMetaX">
                    <span>
                      <FiCalendar className="icon" /> {event.date}
                    </span>
                    <span>
                      <FiMapPin className="icon" /> {event.venue}
                    </span>
                  </div>

                  <button
                    className="mfsaEventBtnX"
                    onClick={() => navigate(`/eventview/${event.id}`)}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* {events.length > 0 && (
          <div className="pagination">
            <button>
              <FiChevronLeft />
            </button>

            <span className="active">1</span>
            <span>2</span>
            <span>3</span>
            <span>...</span>
            <span>12</span>

            <button>
              <FiChevronRight />
            </button>
          </div>
        )} */}
      </div>
    </section>
  );
}
