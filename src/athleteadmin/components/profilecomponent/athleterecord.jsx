import React from "react";
import { FiEye } from "react-icons/fi";

export default function AthleteRecords() {
  // DEMO DATA
  const records = [
    {
      id: 1,
      event_name: "National Championship",
      record_time: "00:42:11",
      prize: "₹25,000",
      distance: "200m",
      medal: "Gold",
    },

    {
      id: 2,
      event_name: "State League",
      record_time: "00:39:05",
      prize: "₹10,000",
      distance: "100m",
      medal: "Silver",
    },

    {
      id: 3,
      event_name: "University Meet",
      record_time: "00:45:20",
      prize: "₹5,000",
      distance: "400m",
      medal: "Bronze",
    },
  ];

  return (
    <div className="athleterecordlist">
      <div className="card tableCard athleteRecordCard">
        {/* TITLE */}
        <div className="athleteProfile__formTitle">Athlete Records</div>

        <div className="statetable">
          {/* HEADER */}
          <div className="athletetableHead">
            <span>EVENT NAME</span>
            <span>RECORD TIME</span>
            <span>PRIZE</span>
            <span>DISTANCE</span>
            <span>MEDAL</span>
         
          </div>

          {/* EMPTY */}
          {records.length === 0 ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
              }}
            >
              No records found
            </div>
          ) : (
            records.map((item) => (
              <div className="athletetableRow" key={item.id}>
                {/* EVENT */}
                <span className="stateName">{item.event_name}</span>

                {/* TIME */}
                <span>{item.record_time}</span>

                {/* PRIZE */}
                <span>{item.prize}</span>

                {/* DISTANCE */}
                <span>{item.distance}</span>

                {/* MEDAL */}
                <span
                  className={`medalPill ${
                    item.medal === "Gold"
                      ? "gold"
                      : item.medal === "Silver"
                        ? "silver"
                        : "bronze"
                  }`}
                >
                  {item.medal}
                </span>

                {/* VIEW */}
                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
