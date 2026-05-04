import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function StateAssociationX({ data, type }) {
  const { stateName, stateId } = useParams();
  const navigate = useNavigate();


  const [visibleCount, setVisibleCount] = useState(8);


  const visibleData = data.slice(0, visibleCount);

  return (
    <section className="mfsaStateCardX-section">
      <div className="mfsaStateCardX-container">
        <div className="mfsaStateCardX-header">
          <h2>Regional Partners</h2>
          <p>Browse our verified state associations and their local clubs.</p>
        </div>

        <div className="mfsaStateCardX-grid">
          {visibleData.map((item, i) => {
            const assocdata = {
              name: item.state_name || item.club_name || "Unknown",
              clubs: item.clubs_count || 0,
              athletes: item.athletes_count || 0,
              user: item.user,
            };

            return (
              <div className="mfsaStateCardX-card" key={item.user || i}>
                <div className="mfsaStateCardX-logoOuter">
                  <div className="mfsaStateCardX-logoInner">
                    <img src={logo} alt="state" />
                  </div>
                </div>

                <h3 className="mfsaStateCardX-name">{assocdata.name}</h3>

                <p className="mfsaStateCardX-meta">
                  {assocdata.clubs} clubs • {assocdata.athletes} Athletes
                </p>

                {type === "state" ? (
                  <button
                    className="mfsaStateCardX-btn"
                    onClick={() => {
                      navigate(`/state/${assocdata.user}`);
                    }}
                  >
                    VIEW State →
                  </button>
                ) : (
                  <button
                    className="mfsaStateCardX-btn"
                    onClick={() => {
                      navigate(`/state/${stateId}/club/${assocdata.user}`);
                    }}
                  >
                    VIEW Club →
                  </button>
                )}
              </div>
            );
          })}
        </div>

      
        {visibleCount < data.length && (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <button
              className="mfsaStateCardX-btn"
              onClick={() => setVisibleCount((prev) => prev + 8)}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
