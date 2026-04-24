import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/event.css";
import EventModal from "./EventModel";   
import { getEvents } from "../../api/event_api";
import { useQuery } from "@tanstack/react-query";
import DateOnly from "../../hook/time/time";
import { fetct_one_event } from "../../api/event_api";
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data, isLoading, error);
  console.log(data?.data.all_events);
  const eventData = data?.data.all_events || [];

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (id) => {
    fetct_one_event(id).then((response) => {
      setEditData(response.data);
      setOpen(true);
    });
  };

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
      
      <div className="EventReport">EVENTS</div>


      <div >

        <div className="eventTop">
          <h2>Events & Announcements</h2>
          <button className="addEventBtn" onClick={handleAdd}>
            + Add Event
          </button>
        </div>

       
        <div className="eventHead">
          <div>Event Title</div>
          <div>Event Date</div>
          <div>Status</div>
          {/* <div>Visibility</div> */}
          <div>Action</div>
        </div>

      
        {eventData.map((item) => (
          <div className="eventRow" key={item.id}>
            <div>{item.event_name}</div>
            <div><DateOnly value={item.date} /></div>
            <div>{item.status}</div>
            {/* <div>{item.visibility}</div> */}
            <div
              className="editBtn"
              onClick={() => handleEdit(item.id)}
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
      </div>

      
    </>
  );
}

export default Calender;