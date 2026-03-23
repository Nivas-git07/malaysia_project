import { useState } from "react";
import mapImg from "../../assets/malaysia-map.png";

export default function StateNetworkX() {
  const [active, setActive] = useState("Kuala Lumpur Finswimming");

  const states = [
    "Kuala Lumpur Finswimming",
    "Selangor Aquatics Club",
    "Penang Finswimmers",
    "Johor Finswimming Association"
  ];

  return (
    <section className="mfsaStateX-section">

      <div className="mfsaStateX-container">

        {/* LEFT */}
        <div className="mfsaStateX-left">

          <span className="mfsaStateX-sub">NETWORK</span>

          <h2 className="mfsaStateX-title">Our States</h2>

          <p className="mfsaStateX-text">
            We have registered clubs in all major states across Malaysia.
            Find a center near you to start your finswimming journey.
          </p>

          {/* RADIO LIST */}
          <div className="mfsaStateX-list">
            {states.map((item) => (
              <div
                key={item}
                className={`mfsaStateX-item ${active === item ? "active" : ""}`}
                onClick={() => setActive(item)}
              >
                <span className="mfsaStateX-radio"></span>
                <p>{item}</p>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="mfsaStateX-right">
          <img src={mapImg} alt="Malaysia map" />
        </div>

      </div>

    </section>
  );
}