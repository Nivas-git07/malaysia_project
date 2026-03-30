import logo from "../../assets/logo.jpg";
import { useNavigate, useParams } from "react-router-dom";

export default function HomeClubX() {
  const navigate = useNavigate();
  const { location } = useParams();

  const clubs = [
    { name: "Johor Bahru", clubs: 10, athletes: 120 },
    { name: "Kuala Lumpur", clubs: 8, athletes: 95 },
    { name: "Selangor", clubs: 12, athletes: 150 },
    { name: "Penang", clubs: 6, athletes: 70 },
    { name: "Melaka", clubs: 4, athletes: 45 },
    { name: "Perak", clubs: 5, athletes: 60 },
    { name: "Kedah", clubs: 3, athletes: 35 },
    { name: "Pahang", clubs: 4, athletes: 50 },
  ];

  return (
    <section className="mfsaClubX-section">
      <div className="mfsaClubX-container">
        <div className="mfsaClubX-header">
          <h2 className="mfsaEventX-header">Associate Club</h2>
          <span className="mfsaClubX-viewAll">View All →</span>
        </div>

        {/* SMOOTH SCROLLER */}
        <div className="mfsaClubX-marquee">
          <div className="mfsaClubX-track">
            {[...clubs, ...clubs].map((item, i) => (
              <div className="mfsaClubX-slide" key={i}>
                <div className="mfsaClubX-card">
                  <div className="mfsaClubX-logoOuter">
                    <div className="mfsaClubX-logoInner">
                      <img src={logo} alt="club" />
                    </div>
                  </div>

                  <h3 className="mfsaClubX-name">{item.name}</h3>

                  <p className="mfsaClubX-meta">
                    {item.clubs} clubs • {item.athletes} Athletes
                  </p>

                  <button
                    className="mfsaClubX-btn"
                    onClick={() =>
                      navigate(`/user/${location}/${item.name}`)
                    }
                  >
                    VIEW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}