import { useState } from "react";
import RecordCardX from "./recordcard";

export default function BestRecordsX() {
  const [active, setActive] = useState("Surface");

  const categories = ["Surface", "Bi-fins", "Apnea", "Immersion"];

  const records = [
    { name: "Adam Wong", discipline: "50m Surface", time: "15.42s" },
    { name: "Sarah Lim", discipline: "120m Surface", time: "16.42s" },
    { name: "Irfan Hakim", discipline: "50m Surface", time: "19.42s" },
    { name: "Mei Ling", discipline: "300m Surface", time: "35.42s" },
  ];

  return (
    <>
      <section className="mfsaRecordX-section">
        <div className="mfsaRecordX-container">
          <h2 className="mfsaRecordX-title">Best Records</h2>

          
          <div className="mfsaRecordX-tabs">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setActive(item)}
                className={`mfsaRecordX-tab ${active === item ? "active" : ""}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CARDS */}
          <div className="mfsaRecordX-grid">
            {records.map((rec, i) => (
              <RecordCardX key={i} {...rec} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
