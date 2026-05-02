import { useState } from "react";
import SwimmerHero from "../../layout/hero";
import Footer from "../../layout/footer";
import { get_bestrecords } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useParams, NavLink } from "react-router-dom";

const categories = ["Surface", "Bi-fins", "Apnea", "Immersion"];

export default function BestRecords() {
  const [active, setActive] = useState("Surface");
  const { stateId, clubId } = useParams();

  const isClub = !!clubId;
  const isState = !!stateId && !clubId;

  // 🔥 API CALL (dynamic)
  const { data, isLoading, error } = useQuery({
    queryKey: ["best-records", stateId, clubId],
    queryFn: () => get_bestrecords({ stateId, clubId }),
    retry: false,
  });

  const records = data?.data || [];

  // 🔥 FILTER by discipline (match API format)
  const filteredRecords = records.filter(
    (rec) =>
      rec.discipline?.toLowerCase() === active.toLowerCase()
  );

  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  return (
    <>
      <SwimmerHero>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Best Records</h1>
          <p className="homeHeroSub">
            Explore the fastest times and top performances in finswimming.
            <br />
            Discover athletes who have set outstanding records across all
            disciplines.
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

              {isState && (
                <li>
                  <NavLink to={`${basePath}/association`}>
                    CLUBS
                  </NavLink>
                </li>
              )}

              {isClub && (
                <li>
                  <NavLink to={`${basePath}/athlete`}>
                    ATHLETES
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
      </SwimmerHero>

      <section className="br-container">
        {/* HEADER */}
        <div className="br-header">
          <h1>Best Records</h1>
          <p>Top performances across all finswimming categories</p>
        </div>

        {/* FILTER BAR */}
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

        {/* 🔥 LOADING */}
        {isLoading && (
          <div className="emptyState">
            <p>Loading records...</p>
          </div>
        )}

        {/* 🔥 ERROR */}
        {error && (
          <div className="emptyState">
            <p>Failed to load records. Try again.</p>
          </div>
        )}

        {/* 🔥 EMPTY */}
        {!isLoading && !error && filteredRecords.length === 0 && (
          <div className="emptyState">
            <h3>No Records Found</h3>
            <p>
              {isClub
                ? "No athletes found in this club."
                : isState
                ? "No athletes found in this state."
                : "No national records available."}
            </p>
          </div>
        )}

        {/* GRID */}
        <div className="br-grid">
          {filteredRecords.map((rec, i) => (
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

        {/* PAGINATION (kept as UI) */}
        <div className="br-pagination">
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <span>›</span>
        </div>
      </section>

      <Footer />
    </>
  );
}