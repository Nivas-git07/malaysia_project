import React from "react";
import { FiEye } from "react-icons/fi";

export default function AthleteRecords({ records }) {


  return (
    <div className="athleterecordlist">
      <div className="card tableCard athleteRecordCard">
        {/* TITLE */}
        <div className="athleteProfile__formTitle">Athlete Records</div>

        <div className="statetable">
          {/* HEADER */}
          <div className="athletetableHead">
            <span>EVENT NAME</span>
            <span>Discipline</span>
            <span>RECORD TIME</span>
            <span>DISTANCE</span>

            <span>PRIZE</span>

            <span>MEDAL</span>
            <span>Date</span>
          </div>

          {/* EMPTY */}
          {/* EMPTY */}
          {records.length === 0 ? (
            <div className="athleteEmptyState">
              <div className="athleteEmptyIcon">🏅</div>

              <h3>No Athlete Records Found</h3>

              <p>This athlete has not added any competition records yet.</p>
            </div>
          ) : (
            records.map((item) => (
              <div className="athletetableRow" key={item.id}>
                {/* EVENT */}
                <span className="stateName">{item.event_name}</span>

             
                <span>{item.discipline}</span>

                {/* TIME */}
                <span>{item.best_time}</span>

                <span>{item.distance}m</span>

             
                <span>{item.rank}</span>

                {/* MEDAL */}
                <span
                  className={`medalPill ${
                    item.medal === "GOLD"
                      ? "gold"
                      : item.medal === "SILVER"
                        ? "silver"
                        : "bronze"
                  }`}
                >
                  {item.medal}
                </span>

                {/* DATE */}
                <span>{item.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
