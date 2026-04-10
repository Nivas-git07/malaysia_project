import { useState } from "react";
import RecordCardX from "./recordcard";
import img1 from "../../assets/feature1.png";
import img2 from "../../assets/athlete3.jpg";
import img3 from "../../assets/news1.jpg";
import img4 from "../../assets/swimmer.png";
export default function BestRecordsX() {
  const [active, setActive] = useState("Surface");

  const categories = ["Surface", "Bi-fins", "Apnea", "Immersion"];

  const records = [
    { name: "Adam Wong", discipline: "50m Surface", time: "15.42s", img: img1 },
    {
      name: "Sarah Lim",
      discipline: "120m Surface",
      time: "16.42s",
      img: img2,
    },
    {
      name: "Irfan Hakim",
      discipline: "50m Surface",
      time: "19.42s",
      img: img3,
    },
    { name: "Mei Ling", discipline: "300m Surface", time: "35.42s", img: img4 },
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
