import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "../../assets/image2.jpg";

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const events = [
    {
      id: 1,
      category: "Championship",
      title: "Finswimming State Cup",
      date: "09.10.2025",
      location: "Johor Bahru",
      image: img1,
    },
    {
      id: 2,
      category: "Trials",
      title: "Junior National Selection",
      date: "15.11.2025",
      location: "Kuala Lumpur",
      image: img1,
    },
    {
      id: 3,
      category: "Open Water",
      title: "Desaru Ocean Sprint",
      date: "03.12.2025",
      location: "Desaru Coast",
      image: img1,
    },
    {
      id: 4,
      category: "Community",
      title: "Annual Member Dinner",
      date: "20.12.2025",
      location: "JB Convention Center",
      image: img1,
    },
    {
      id: 5,
      category: "Workshop",
      title: "Finswimming Coaching Clinic",
      date: "10.01.2026",
      location: "Larkin Aquatic Centre",
      image: img1,
    },
    {
      id: 6,
      category: "Qualifiers",
      title: "SEA Games 2026 Qualifiers",
      date: "22.02.2026",
      location: "Johor State Stadium",
      image: img1,
    },
  ];

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
            <button className="filterBtn">Category</button>
            <button className="calendarBtn">View Calendar</button>
          </div>
        </div>

        {/* GRID */}
        <div className="eventsGrid">
          {events.map((event) => (
            <div className="mfsaEventCardX" key={event.id}>
              {/* IMAGE */}
              <div className="mfsaEventImgX">
                <img src={event.image} alt={event.title} />
              </div>

              {/* OVERLAY CONTENT */}
              <div className="mfsaEventOverlayX">
                {/* TAG */}
                <span className="mfsaEventTagX">{event.category}</span>

                {/* TITLE */}
                <h3 className="mfsaEventTitleX">{event.title}</h3>

                {/* META */}
                <div className="mfsaEventMetaX">
                  <span>📅 {event.date}</span>
                  <span>📍 {event.location}</span>
                </div>

                {/* BUTTON */}
                <button className="mfsaEventBtnX">Read More →</button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
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
      </div>
    </section>
  );
}
