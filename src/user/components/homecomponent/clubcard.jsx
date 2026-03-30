import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function HomeClubX() {
  const navigate = useNavigate();
  const { location } = useParams();
  

  const clubs = [
    { name: "Johor Bahru", clubs: 10, athletes: 120 },
    { name: "Kuala Lumpur", clubs: 8, athletes: 95 },
    { name: "Selangor", clubs: 12, athletes: 150 },
    { name: "Penang", clubs: 6, athletes: 70 },
  ];

  return (
    <section className="mfsaClubX-section">
      <div className="mfsaClubX-container">
        <div className="mfsaClubX-header">
          <h2 className="mfsaEventX-header">Associate Club</h2>

          <div className="mfsaClubX-actions">
            <button className="mfsaClubX-navBtn">←</button>
            <button className="mfsaClubX-navBtn">→</button>
            <span className="mfsaClubX-viewAll">View All →</span>
          </div>
        </div>

        {/* GRID */}
        <div className="mfsaClubX-grid">
          {clubs.map((item, i) => (
            <div className="mfsaClubX-card" key={i}>
              {/* LOGO */}
              <div className="mfsaClubX-logoOuter">
                <div className="mfsaClubX-logoInner">
                  <img src={logo} alt="club" />
                </div>
              </div>

              {/* CONTENT */}
              <h3 className="mfsaClubX-name">{item.name}</h3>

              <p className="mfsaClubX-meta">
                {item.clubs} clubs • {item.athletes} Athletes
              </p>

              <button className="mfsaClubX-btn" onClick={() => navigate(`/user/${location}/${item.name}`)}>
                VIEW
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
