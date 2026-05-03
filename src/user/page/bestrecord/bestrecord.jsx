import { useState, useEffect } from "react";
import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import { get_bestrecords } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useParams, NavLink } from "react-router-dom";

const categories = ["Surface", "Bi-fins", "Apnea", "Immersion"];

export default function BestRecords() {
  const [active, setActive] = useState("Surface");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const { stateId, clubId } = useParams();

  const isClub = !!clubId;
  const isState = !!stateId && !clubId;

  const { data, isLoading, error } = useQuery({
    queryKey: ["best-records", stateId, clubId],
    queryFn: () => get_bestrecords({ stateId, clubId }),
    retry: false,
  });

  const records = data?.data || [];

  // 🔥 FILTER
  const filteredRecords = records.filter(
    (rec) =>
      rec.discipline?.toLowerCase() === active.toLowerCase()
  );

  // 🔥 PAGINATION LOGIC
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const paginatedRecords = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // 🔥 RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  return (
    <>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Best Records</h1>
          <p className="homeHeroSub">
            Explore the fastest times and top performances in finswimming.
          </p>
        </div>

        {basePath && (
          <nav className="heroNav">
            <ul>
              {isState && (
                <li>
                  <NavLink to={`/state/${stateId}`}>Home</NavLink>
                </li>
              )}
              {isClub && (
                <li>
                  <NavLink to={`/state/${stateId}/club/${clubId}`}>
                    Home
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink to={basePath ? `${basePath}/event` : "/event"}>
                  EVENTS
                </NavLink>
              </li>

              <li>
                <NavLink to={basePath ? `${basePath}/news` : "/news"}>
                  NEWS
                </NavLink>
              </li>

              <li>
                <NavLink to={basePath ? `${basePath}/about` : "/about"}>
                  ABOUT
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </Swimmer>

      <section className="br-container">
        {/* HEADER */}
        <div className="br-header">
          <h1>Best Records</h1>
          <p>Top performances across all finswimming categories</p>
        </div>

        {/* TOOLBAR */}
        <div className="br-toolbar">
          <div className="br-tabs">
            {categories.map((c) => (
              <button
                key={c}
                className={`br-tab ${active === c ? "active" : ""}`}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="br-actions">
            <input placeholder="Search athlete..." />
            <select>
              <option>Sort by Date</option>
              <option>Best Time</option>
            </select>
          </div>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="emptyState">
            <p>Loading records...</p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="emptyState">
            <p>Failed to load records.</p>
          </div>
        )}

        {/* EMPTY */}
        {!isLoading && !error && filteredRecords.length === 0 && (
          <div className="emptyState">
            <h3>No Records Found</h3>
            <p>No athletes available.</p>
          </div>
        )}

        {/* GRID */}
        {!isLoading && !error && filteredRecords.length > 0 && (
          <div className="br-grid">
            {paginatedRecords.map((rec, i) => (
              <div key={i} className="br-card">
                <img
                  src={rec.profile_picture}
                  alt={rec.full_name}
                />

                <h3>{rec.full_name}</h3>

                <p className="category">
                  {rec.discipline} / {rec.distance}m
                </p>

                <div className="divider" />

                <h2 className="time">{rec.best_time}</h2>
                <span className="date">Top Performance</span>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="br-pagination">
            {/* PREV */}
            <span
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
            >
              ‹
            </span>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </span>
            ))}

            {/* NEXT */}
            <span
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
            >
              ›
            </span>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}