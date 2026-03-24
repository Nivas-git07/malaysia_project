import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "../../assets/image2.jpg";

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const events = [
    { id: 1, title: "Championship", image: img1 },
    { id: 2, title: "Trials", image: img1 },
    { id: 3, title: "Open Water", image: img1 },
    { id: 4, title: "Community", image: img1 },
    { id: 5, title: "Workshop", image: img1 },
    { id: 6, title: "Qualifiers", image: img1 },
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
            <div className="eventCard" key={event.id}>
              
              <div className="cardImage">
                <img src={event.image} alt={event.title} />
               
              </div>

            
              <div className="cardBody">
                <span className="tagBody">
                  {event.title.toUpperCase()}
                </span>
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