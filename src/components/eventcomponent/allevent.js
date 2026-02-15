import { useState } from "react";
import EventCard from "../homecomponent/eventcard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import img1 from "../../assets/image2.jpg"
import logo from "../../assets/logo.jpg"
export default function EventsPage() {

    /* 🔥 Dummy Data (100 items example) */
    const events = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        bg: img1,
        title: "Finswimming Association",
        date: "09.10.2025",
        country: "Malaysia"
    }));

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(events.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentEvents = events.slice(startIndex, startIndex + itemsPerPage);

    /* 🔥 Pagination handlers */
    const nextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(p => p - 1);

    return (

        <section className="eventsPageSection">

            <h2 className="eventsPageHeading">UPCOMING EVENTS</h2>

            <div className="eventsGrid" style={{
                rowGap: "40px",
                columnGap: "50px"
            }}>

                {currentEvents.map(event => (
                    <EventCard
                        key={event.id}
                        bg={event.bg}
                        logo={logo}
                        title={event.title}
                        date={event.date}
                        country={event.country}
                    />
                ))}

            </div>


            <div className="eventsPaginationBar">

                <p className="eventsInfo">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, events.length)} of {events.length} entries
                </p>

                <div className="eventsPagination">

                    <button onClick={prevPage}>
                        <FiChevronLeft />
                    </button>

                    {[1, 2, 3, 4, 25].map(num => (
                        <button
                            key={num}
                            className={currentPage === num ? "active" : ""}
                            onClick={() => setCurrentPage(num)}
                        >
                            {num}
                        </button>
                    ))}

                    <button onClick={nextPage}>
                        <FiChevronRight />
                    </button>

                </div>

            </div>

        </section>

    )
}
