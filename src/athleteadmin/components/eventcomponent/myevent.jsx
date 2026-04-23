import React from "react";


import { FaCalendarAlt, FaMapMarkerAlt, FaDownload } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const events = [
  {
    status: "approved",
    title: "National Finswimming Championship 2024",
    date: "October 15-17, 2024",
    location: "Olympic Aquatic Center, Athens",
  },
  {
    status: "pending",
    title: "Mediterranean Open Invitational",
    date: "November 05, 2024",
    location: "Port Vell Aquatic Park, Barcelona",
  },
  {
    status: "rejected",
    title: "Elite Speed Finals - Series IV",
    date: "September 12, 2024",
    location: "National Stadium Pool, Valletta",
  },
  {
    status: "approved",
    title: "World Aquatics Qualifying Rounds",
    date: "August 30, 2024",
    location: "Sports Complex, Marseille",
  },
];

export default function MyEvents() {
  return (
    <div className="myEventsContainer">

      <div className="myEventsHeader">
        <h2>My Events</h2>
        <p>Track your registered competitions and application statuses</p>
      </div>

      <div className="myEventsGrid">
        {events.map((event, index) => (
          <div className="eventBox" key={index}>

            {/* STATUS */}
            <div className={`statusBadge ${event.status}`}>
              {event.status === "approved" && <IoCheckmarkCircle />}
              {event.status === "pending" && <MdPending />}
              {event.status === "rejected" && <IoCloseCircle />}
              {event.status.toUpperCase()}
            </div>

            {/* TITLE */}
            <h3>{event.title}</h3>

            {/* META */}
            <div className="meta">
              <FaCalendarAlt />
              <span>{event.date}</span>
            </div>

            <div className="meta">
              <FaMapMarkerAlt />
              <span>{event.location}</span>
            </div>

            <hr />

            {/* FOOTER */}
            <div className="eventFooter">

              {event.status === "approved" && (
                <>
                  <span className="successText">
                    Approved for participation
                  </span>
                  <button className="downloadBtn">
                    <FaDownload /> Download Pass
                  </button>
                </>
              )}

              {event.status === "pending" && (
                <span className="pendingText">Awaiting approval</span>
              )}

              {event.status === "rejected" && (
                <>
                  <span className="errorText">Application rejected</span>
                  <button className="reasonBtn">View Reason</button>
                </>
              )}

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}