import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/event.css";
import EventModal from "./EventModel";   

const eventData = [
  {
    id: 1,
    title: "National Athletics Championship",
    date: "2025-08-01",
    status: "Upcoming",
    visibility: "All Users",
  },
  {
    id: 2,
    title: "State Level Swimming Meet",
    date: "2025-08-15",
    status: "Registration Open",
    visibility: "Registered Users",
  },
  {
    id: 3,
    title: "Inter College Football Tournament",
    date: "2025-09-05",
    status: "Completed",
    visibility: "All Users",
  }
];

function Calender() {

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

  return (
    <>
      <Navbar />

      {/* TITLE BAR */}
      <div className="EventReport">EVENTS</div>

      {/* MAIN CARD */}
      <div className="eventCard">

        <div className="eventTop">
          <h2>Events & Announcements</h2>
          <button className="addEventBtn" onClick={handleAdd}>
            + Add Event
          </button>
        </div>

        {/* TABLE HEADER */}
        <div className="eventHead">
          <div>Event Title</div>
          <div>Event Date</div>
          <div>Status</div>
          <div>Visibility</div>
          <div>Action</div>
        </div>

        {/* TABLE ROWS */}
        {eventData.map((item) => (
          <div className="eventRow" key={item.id}>
            <div>{item.title}</div>
            <div>{item.date}</div>
            <div>{item.status}</div>
            <div>{item.visibility}</div>
            <div
              className="editBtn"
              onClick={() => handleEdit(item)}
            >
              ✎ Edit
            </div>
          </div>
        ))}

      </div>

  
      {open && (
        <EventModal
          close={() => setOpen(false)}
          data={editData}
        />
      )}
    </>
  );
}

export default Calender;