import { useState } from "react";
import SwimmerHero from "../../layout/hero";
import Footer from "../../layout/footer";
import photo from "../../assets/feature1.png";
const categories = ["Surface", "Bi-fins", "Apnea", "Immersion"];

const recordsData = [
  {
    name: "Zheng Wei Han",
    category: "Surface / 50m",
    time: "15.02s",
    date: "June 2024",
    img: photo,
    top: true,
  },
  {
    name: "Siti Aminah",
    category: "Bi-fins / 100m",
    time: "46.85s",
    date: "March 2024",
    img: photo,
  },
  {
    name: "Marcus Tan",
    category: "Apnea / 50m",
    time: "13.89s",
    date: "May 2024",
    img: photo,
  },
  {
    name: "Lina Rodrigues",
    category: "Immersion / 100m",
    time: "39.12s",
    date: "April 2024",
    img: photo,
  },
  {
    name: "S. Ravindran",
    category: "Surface / 200m",
    time: "1:21.44",
    date: "Jan 2024",
    img: photo,
  },
  {
    name: "Ismail Daud",
    category: "Bi-fins / 50m",
    time: "19.55s",
    date: "Aug 2024",
    img: photo,
  },
];

export default function BestRecords() {
  const [active, setActive] = useState("Surface");

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

        {/* GRID */}
        <div className="br-grid">
          {recordsData.map((rec, i) => (
            <div key={i} className={`br-card ${rec.top ? "top-card" : ""}`}>
              {rec.top && <div className="top-badge">⭐ TOP RECORD</div>}

              <img src={rec.img} alt={rec.name} />

              <h3>{rec.name}</h3>
              <p className="category">{rec.category}</p>

              <div className="divider" />

              <h2 className="time">{rec.time}</h2>
              <span className="date">Record Set: {rec.date}</span>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
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
