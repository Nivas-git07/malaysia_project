import logo from "../../assets/logo.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function HomeClubX({ clubs }) {
  const navigate = useNavigate();
  // const { stateName, stateId, clubName, clubId } = useParams();
  const { stateId } = useParams();

  const clubList = clubs || [];

  // ✅ CONDITION
  const enableAnimation = clubList.length > 4;

  // ✅ ONLY DUPLICATE IF ANIMATION ENABLED
  const displayClubs = enableAnimation ? [...clubList, ...clubList] : clubList;

  return (
    <section className="mfsaClubX-section">
      <div className="mfsaClubX-container">
        {/* HEADER */}
        <div className="mfsaClubX-header">
          <h2 className="mfsaEventX-header">Associate Club</h2>
          <span className="mfsaClubX-viewAll">View All →</span>
        </div>

        {/* EMPTY STATE */}
        {clubList.length === 0 ? (
          <div className="mfsaEmptyState">No clubs available in this state</div>
        ) : enableAnimation ? (
          /* 🔥 MARQUEE (5+ clubs) */
          <div className="mfsaClubX-marquee">
            <div className="mfsaClubX-track">
              {displayClubs.map((item, i) => (
                <div className="mfsaClubX-slide" key={item.user || i}>
                  <div className="mfsaClubX-card">
                    <div className="mfsaClubX-logoOuter">
                      <div className="mfsaClubX-logoInner">
                        <img src={item.image || logo} alt="club" />
                      </div>
                    </div>

                    <h3 className="mfsaClubX-name">{item.club_name}</h3>

                    <p className="mfsaClubX-meta">
                      {item.athletes_count} Athletes
                    </p>

                    <button
                      className="mfsaClubX-btn"
                      onClick={() =>
                        navigate(`/state/${stateId}/club/${item.user}`)
                      }
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ✅ STATIC GRID (≤4 clubs) */
          <div className="mfsaClubX-grid">
            {clubList.map((item) => (
              <div className="mfsaClubX-card" key={item.user}>
                <div className="mfsaClubX-logoOuter">
                  <div className="mfsaClubX-logoInner">
                    <img src={item.image || logo} alt="club" />
                  </div>
                </div>

                <h3 className="mfsaClubX-name">{item.club_name}</h3>

                <p className="mfsaClubX-meta">{item.athletes_count} Athletes</p>

                <button
                  className="mfsaClubX-btn"
                  onClick={() =>
                    navigate(`/state/${stateId}/club/${item.user}`)
                  }
                >
                  VIEW
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
