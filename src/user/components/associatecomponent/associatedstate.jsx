import logo from "../../assets/logo.jpg";

export default function StateAssociationX() {

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

        {/* HEADER */}
        <div className="mfsaStateCardX-header">
          <h2>Regional Partners</h2>
          <p>Browse our verified state associations and their local clubs.</p>
        </div>

        {/* GRID */}
        <div className="mfsaStateCardX-grid">

          {states.map((item, i) => (
            <div className="mfsaStateCardX-card" key={i}>

              {/* LOGO */}
              <div className="mfsaStateCardX-logoOuter">
                <div className="mfsaStateCardX-logoInner">
                  <img src={logo} alt="state" />
                </div>
              </div>

              {/* TEXT */}
              <h3 className="mfsaStateCardX-name">{item.name}</h3>

              <p className="mfsaStateCardX-meta">
                {item.clubs} clubs • {item.athletes} Athletes
              </p>

              {/* BUTTON */}
              <button className="mfsaStateCardX-btn">
                VIEW ALL
              </button>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}