import { useState } from "react";
import RecordCardX from "./recordcard";

export default function BestRecordsX({ records = [] }) {
  const [active, setActive] = useState("Surface");

  const categories = ["Surface", "Bi-fins", "Apnea", "Immersion"];

  // 🔥 FILTER BASED ON CATEGORY
  const filteredRecords = records.filter(
    (rec) =>
      rec?.discipline?.toLowerCase().includes(active.toLowerCase())
  );

  return (
    <section className="mfsaRecordX-section">
      <div className="mfsaRecordX-container">
        <h2 className="mfsaRecordX-title">Best Records</h2>

        {/* TABS */}
        <div className="mfsaRecordX-tabs">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`mfsaRecordX-tab ${
                active === item ? "active" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>

    
        {filteredRecords.length === 0 ? (
          <div className="mfsaEmptyState">
            {/* <div className="empty-icon">🏊‍♂️</div> */}
            <h3>No Best Records Found</h3>
            <p>
              There are currently no records available for this discipline.
            </p>
          </div>
        ) : (
          <div className="mfsaRecordX-grid">
            {filteredRecords.map((rec, i) => (
              <RecordCardX key={rec.id || i} {...rec} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}