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

  const params = clubId ? { clubId } : stateId ? { stateId } : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", params],
    queryFn: () => (params ? getevents(params) : getallevents()),
  });

  const events = data?.data || [];

  // const events = eventData?.data || [];
  console.log("Events Data:", events);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // const events = [
  //   {
  //     id: 1,
  //     category: "Championship",
  //     title: "Finswimming State Cup",
  //     date: "09.10.2025",
  //     location: "Johor Bahru",
  //     image: img1,
  //   },
  //   {
  //     id: 2,
  //     category: "Trials",
  //     title: "Junior National Selection",
  //     date: "15.11.2025",
  //     location: "Kuala Lumpur",
  //     image: img2,
  //   },
  //   {
  //     id: 3,
  //     category: "Open Water",
  //     title: "Desaru Ocean Sprint",
  //     date: "03.12.2025",
  //     location: "Desaru Coast",
  //     image: img3,
  //   },
  //   {
  //     id: 4,
  //     category: "Community",
  //     title: "Annual Member Dinner",
  //     date: "20.12.2025",
  //     location: "JB Convention Center",
  //     image: img4,
  //   },
  //   {
  //     id: 5,
  //     category: "Workshop",
  //     title: "Finswimming Coaching Clinic",
  //     date: "10.01.2026",
  //     location: "Larkin Aquatic Centre",
  //     image: img5,
  //   },
  //   {
  //     id: 6,
  //     category: "Qualifiers",
  //     title: "SEA Games 2026 Qualifiers",
  //     date: "22.02.2026",
  //     location: "Johor State Stadium",
  //     image: img6,
  //   },
  // ];

  return (
    <section className="eventsSection">
      <div className="eventsInner">
        {/* HEADER */}
        <div className="eventsHeader">
          <div className="left">
            <h2 className="up">UPCOMING EVENTS</h2>
            <p>Discover the latest competitions and community gatherings.</p>
          </div>

          <div className="right">
            <span className="filterText">Filter by:</span>
            <button className="filterBtns">Category</button>
            <button className="calendarBtn">View Calendar</button>
          </div>
        </div>

        <div className="eventsGrid">
          {events.length === 0 ? (
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
            events.map((event) => (
              <div className="mfsaEventCardX" key={event.id}>
                <div className="mfsaEventImgX">
                  <img src={event.image} alt={event.event_name} loading="lazy"/>
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
                    onClick={() => navigate(`/user/eventview/${event.id}`)}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {events.length > 0 && (
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
        )}
      </div>
    </section>
  );
}
