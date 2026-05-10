import { useMemo, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

export default function AthletePerformance({
  performanceData = [],
}) {
  // FILTER STATES
  const [filters, setFilters] = useState({
    discipline: "",
    competition: "",
    date: "",
  });

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // FILTER CHANGE
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });

    setCurrentPage(1);
  };

  // FILTERED DATA
  const filteredData = useMemo(() => {
    return performanceData.filter((item) => {
      const matchDiscipline =
        !filters.discipline ||
        item?.discipline
          ?.toLowerCase()
          .includes(
            filters.discipline.toLowerCase(),
          );

      const matchCompetition =
        !filters.competition ||
        item?.event_name
          ?.toLowerCase()
          .includes(
            filters.competition.toLowerCase(),
          );

      const matchDate =
        !filters.date ||
        item?.date === filters.date;

      return (
        matchDiscipline &&
        matchCompetition &&
        matchDate
      );
    });
  }, [performanceData, filters]);

  // PAGINATION DATA
  const totalItems = filteredData.length;

  const totalPages = Math.ceil(
    totalItems / itemsPerPage,
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const paginatedData = filteredData.slice(
    startIndex,
    endIndex,
  );

  // PAGE NUMBERS
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  // PREV
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // NEXT
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className="perfSection">

      <div className="perfContainer">

        {/* TITLE */}
        <div className="perfHeader">
          <h2 className="perfTitle">
            PERFORMANCE RECORDS
          </h2>

          <p className="perfSubtitle">
            Athlete competition history and
            best performances
          </p>
        </div>

        {/* FILTERS */}
        <div className="perfFilters">

          {/* DISCIPLINE */}
          <select
            className="perfInput"
            name="discipline"
            value={filters.discipline}
            onChange={handleFilterChange}
          >
            <option value="">
              All Disciplines
            </option>

            <option value="surface">
              Surface
            </option>

            <option value="bi_fins">
              Bi-Fins
            </option>

            <option value="immersion">
              Immersion
            </option>

            <option value="apnea">
              Apnea
            </option>
          </select>

          {/* EVENT */}
          <input
            type="text"
            placeholder="Search Competition"
            className="perfInput"
            name="competition"
            value={filters.competition}
            onChange={handleFilterChange}
          />

          {/* DATE */}
          <div className="perfDateWrap">

            <input
              type="date"
              className="perfInput perfDateInput"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />

            {/* <FiCalendar className="perfDateIcon" /> */}

          </div>

        
        </div>

        {/* TABLE */}
        <div className="perfTable">

          {/* TABLE HEAD */}
          <div className="perfHead">
            <span>Event</span>
            <span>Best Time</span>
            <span>Rank</span>
            <span>Distance</span>
            <span>Medal</span>
            <span>Date</span>
          </div>

          {/* EMPTY STATE */}
          {paginatedData.length === 0 ? (
            <div className="perfEmptyState">

              <div className="perfEmptyIcon">
                🏊
              </div>

              <h3>
                No Performance Records Found
              </h3>

              <p>
                This athlete has not participated
                in any competitions yet or no
                records match your filters.
              </p>

            </div>
          ) : (
            paginatedData.map((row, i) => (
              <div
                className="perfRow"
                key={row.id || i}
              >

                {/* EVENT */}
                <span className="perfEvent">
                  {row?.event_name || "-"}
                </span>

                {/* TIME */}
                <span className="perfRed">
                  {row?.best_time || "-"}
                </span>

                {/* RANK */}
                <span>
                  {row?.rank || "-"}
                </span>

                {/* DISTANCE */}
                <span>
                  {row?.distance
                    ? `${row.distance}m`
                    : "-"}
                </span>

                {/* MEDAL */}
                <span
                  className={`perfMedal ${
                    row?.medal === "GOLD"
                      ? "gold"
                      : row?.medal === "SILVER"
                        ? "silver"
                        : row?.medal === "BRONZE"
                          ? "bronze"
                          : ""
                  }`}
                >
                  {row?.medal || "-"}
                </span>

                {/* DATE */}
                <span className="perfRed">
                  {row?.date || "-"}
                </span>

              </div>
            ))
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {totalItems > 0 && (
        <div className="entityPaginationWrap">

          {/* LEFT */}
          <p className="entityPaginationInfo">
            Showing{" "}
            <strong>
              {startIndex + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                endIndex,
                totalItems,
              )}
            </strong>{" "}
            of{" "}
            <strong>{totalItems}</strong>{" "}
            entries
          </p>

          {/* RIGHT */}
          <div className="entityPaginationControls">

            {/* PREV */}
            <button
              className="entityPageArrow"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              ‹
            </button>

            {/* PAGES */}
            {pages.map((num) => (
              <button
                key={num}
                className={`entityPageBtn ${
                  currentPage === num
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPage(num)
                }
              >
                {num}
              </button>
            ))}

            {/* NEXT */}
            <button
              className="entityPageArrow"
              onClick={nextPage}
              disabled={
                currentPage === totalPages
              }
            >
              ›
            </button>

          </div>
        </div>
      )}
    </section>
  );
}