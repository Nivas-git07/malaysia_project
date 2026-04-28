import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { get_all_register_events } from "../../api/event_api";

export default function MyEvents() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allevents"],
    queryFn: get_all_register_events,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const events = data?.data || [];

  if (isLoading) {
    return <p style={{ padding: "20px" }}>Loading events...</p>;
  }

  if (isError) {
    return <p style={{ padding: "20px" }}>Failed to load events ❌</p>;
  }

  if (!events.length) {
    return (
      <div className="myEventsContainer">
        <h2>My Events</h2>
        <p>No events found</p>
      </div>
    );
  }

  const getStatus = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    return eventDate < today ? "completed" : "registered";
  };

  return (
    <div className="myEventsContainer">
      <div className="myEventsHeader">
        <h2>My Events</h2>
        <p>Track your registered competitions and application statuses</p>
      </div>

      <div className="myEventsGrid">
        {events.map((event) => {
          const status = getStatus(event.date);

          return (
            <div className="eventBox" key={event.id}>
              <div className={`statusBadge ${status}`}>
                <IoCheckmarkCircle />
                {status.toUpperCase()}
              </div>

              <h3>{event.event_name}</h3>

              <div className="meta">
                <FaCalendarAlt />
                <span>{event.date}</span>
              </div>

              <div className="meta">
                <FaMapMarkerAlt />
                <span>{event.venue}</span>
              </div>

              <hr />

              <div className="eventFooter">
                {status === "registered" && (
                  <span className="pendingText">
                    You are registered for this event
                  </span>
                )}

                {status === "completed" && (
                  <span className="successText">
                    Event completed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}