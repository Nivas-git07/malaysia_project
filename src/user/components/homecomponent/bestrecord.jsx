import { useState } from "react";
import RecordCardX from "./recordcard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function BestRecordsX({ records = [] }) {
  const navigate = useNavigate();
  const [active, setActive] = useState("Surface");
  const { stateId, clubId } = useParams();
  console.log(records);

  const categories = ["Surface", "Bi_fins", "Apnea", "Immersion"];

  // 🔥 FILTER BASED ON CATEGORY
  const filteredRecords = records.filter((rec) =>
    rec?.discipline?.toLowerCase().includes(active.toLowerCase()),
  );

  const handleNavigateBestRecords = () => {
    if (clubId && stateId)
      navigate(`/state/${stateId}/club/${clubId}/bestrecords`);
    else if (stateId) navigate(`/state/${stateId}/bestrecords`);
    else navigate("/bestrecords");
  };

  return (
    <section className="mfsaRecordX-section">
      <div className="mfsaRecordX-container">
        <div className="mfsaRecordX-header">
          <div className="header-left" />

          <h2 className="mfsaRecordX-title">Best Records</h2>

          <div className="header-right">
            <button
              className="mfsaRecordX-viewAllBtn"
              onClick={handleNavigateBestRecords}
            >
              View All →
            </button>
          </div>
        </div>

        {/* TABS */}
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

        {filteredRecords.length === 0 ? (
          <div className="mfsaEmptyState">
            {/* <div className="empty-icon">🏊‍♂️</div> */}
            <h3>No Best Records Found</h3>
            <p>There are currently no records available for this discipline.</p>
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
