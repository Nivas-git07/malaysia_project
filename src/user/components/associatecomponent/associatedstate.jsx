import logo from "../../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

export default function StateAssociationX() {
  const navigate = useNavigate();

  const states = [
    { name: "Johor Bahru", clubs: 10, athletes: 120 },
    { name: "Kuala Lumpur", clubs: 8, athletes: 95 },
    { name: "Penang", clubs: 6, athletes: 70 },
    { name: "Selangor", clubs: 12, athletes: 150 },
    { name: "Melaka", clubs: 4, athletes: 45 },
    { name: "Perak", clubs: 5, athletes: 60 },
    { name: "Kedah", clubs: 3, athletes: 35 },
    { name: "Pahang", clubs: 4, athletes: 50 },
  ];

  return (
    <section className="mfsaStateCardX-section">
      <div className="mfsaStateCardX-container">
        <div className="mfsaStateCardX-header">
          <h2>Regional Partners</h2>
          <p>Browse our verified state associations and their local clubs.</p>
        </div>

        <div className="mfsaStateCardX-grid">
          {states.map((item, i) => (
            <div className="mfsaStateCardX-card" key={i}>
              <div className="mfsaStateCardX-logoOuter">
                <div className="mfsaStateCardX-logoInner">
                  <img src={logo} alt="state" />
                </div>
              </div>

              <h3 className="mfsaStateCardX-name">{item.name}</h3>

              <p className="mfsaStateCardX-meta">
                {item.clubs} clubs • {item.athletes} Athletes
              </p>

              <button
                className="mfsaStateCardX-btn"
                onClick={() => {
                  navigate(`/user/${item.name}`);
                }}
              >
                VIEW State
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
