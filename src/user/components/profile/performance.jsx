import { FiCalendar } from "react-icons/fi";
import { useState } from "react";
export default function AthletePerformance() {
   const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const totalItems = 100;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const pages = [1, 2, 3, 4, "...", 25];

  /* ✅ ADD NAVIGATION FUNCTIONS */
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const performanceData = [
    { event: "100m Bi-fins", time: "00:16.25", rank: "1st", comp: "National Championship", date: "May 2025" },
    { event: "400m Immersion", time: "00:16.25", rank: "1st", comp: "National Championship", date: "May 2025" },
    { event: "200m Surface", time: "00:16.25", rank: "1st", comp: "National Championship", date: "May 2025" },
    { event: "50m Surface", time: "00:16.25", rank: "1st", comp: "National Championship", date: "May 2025" },
    { event: "100m Bi-fins", time: "00:16.25", rank: "1st", comp: "National Championship", date: "May 2025" },
    { event: "400m Immersion", time: "00:16.25", rank: "1st", comp: "National Championship", date: "May 2025" }
  ];

  return (

    <section className="perfSection">

      <div className="perfContainer">

        {/* TITLE */}
        <h2 className="perfTitle">PERFORMANCE</h2>

        {/* FILTER ROW */}
        <div className="perfFilters">

          <select className="perfInput">
            <option>Event</option>
            <option>Bi-fins</option>
            <option>Surface</option>
            <option>Immersion</option>
          </select>

          <select className="perfInput">
            <option>Competition</option>
            <option>National Championship</option>
          </select>

          <div className="perfDateWrap">
            <input type="date" className="perfInput perfDateInput" />
            {/* <FiCalendar className="perfDateIcon" /> */}
          </div>


          <button className="perfFindBtn">Find</button>

        </div>

        {/* TABLE */}
        <div className="perfTable">

          <div className="perfHead">
            <span>Event</span>
            <span>Best time</span>
            <span>Rank</span>
            <span>Competition</span>
            <span>Date</span>
          </div>

          {performanceData.map((row, i) => (
            <div className="perfRow" key={i}>

              <span>{row.event}</span>
              <span className="perfRed">{row.time}</span>
              <span>{row.rank}</span>
              <span>{row.comp}</span>
              <span className="perfRed">{row.date}</span>

            </div>
          ))}

        </div>

      </div>

      <div className="entityPaginationWrap">

        {/* LEFT TEXT */}
        <p className="entityPaginationInfo">
          Showing {startIndex + 1} to {endIndex} of {totalItems} entries
        </p>

        {/* RIGHT PAGINATION */}
        <div className="entityPaginationControls">

          <button
            className="entityPageArrow"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            ‹
          </button>

          {pages.map((num) => (
            <button
              key={num}
              className={`entityPageBtn ${currentPage === num ? "active" : ""}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          <button
            className="entityPageArrow"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            ›
          </button>

        </div>

      </div>


    </section>
  );
}
