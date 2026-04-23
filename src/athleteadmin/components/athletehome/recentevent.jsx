import React from "react";
// import "./recent-events.css";
import photo from "../../assets/swim.png";
import { FaCalendarAlt } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";

export default function RecentEvents() {
  return (
    <div className="eventsContainer">

      {/* HEADER */}
      <div className="eventsHeader">
        <h2>Recent Events</h2>
        <span className="viewAll">View All Schedule</span>
      </div>

      {/* EVENT CARD */}
      <div className="eventCard">
        <img src={photo} alt="" className="eventImg" />

        <div className="eventContent">
          <p className="eventType red">ELITE SERIES</p>
          <h3>National Finswimming Cup 2024</h3>

          <div className="eventMeta">
            <FaCalendarAlt />
            <span>October 12-14, 2024 • Olympic Aquatic Center</span>
          </div>
        </div>

        <div className="eventRight">
          <span className="status green">REGISTERED</span>
          <HiDotsVertical className="menuIcon" />
        </div>
      </div>

      {/* EVENT CARD */}
      <div className="eventCard">
        <img src={photo} alt="" className="eventImg" />

        <div className="eventContent">
          <p className="eventType gray">REGIONAL QUALIFIERS</p>
          <h3>Coastal District Invitationals</h3>

          <div className="eventMeta">
            <FaCalendarAlt />
            <span>September 05, 2024 • Marine Park Pool</span>
          </div>
        </div>

        <div className="eventRight">
          <span className="status gray">COMPLETED</span>
        </div>
      </div>

      {/* EVENT CARD */}
      <div className="eventCard">
        <img src={photo} alt="" className="eventImg" />

        <div className="eventContent">
          <p className="eventType gray">TRAINING CAMP</p>
          <h3>Summer High-Intensity Camp</h3>

          <div className="eventMeta">
            <FaCalendarAlt />
            <span>August 10, 2024 • Elite Training Hub</span>
          </div>
        </div>

        <div className="eventRight">
          <span className="status gray">COMPLETED</span>
        </div>
      </div>

    </div>
  );
}