import { useState } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getallevents, getevents } from "../../api/event";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import SkeletonLoader from "../common/SkeletonLoader";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

export default function EventsPage() {
  const { stateId, clubId } = useParams();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const params = clubId ? { clubId } : stateId ? { stateId } : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["events", params],
    queryFn: () => (params ? getevents(params) : getallevents()),
  });

  const events = data?.data || [];
  const today = new Date();

  const filteredEvents = events.filter((event) => {
    if (!event.date) return true;

    const eventDate = new Date(event.date);

    if (filter === "UPCOMING") return eventDate >= today;
    if (filter === "PAST") return eventDate < today;

    return true;
  });

  const calendarEvents = filteredEvents.map((event) => ({
    id: event.id,
    title: event.event_name,
    date: event.date,
    extendedProps: {
      venue: event.venue,
      image: event.image,
    },
  }));

  return (
    <section className="eventsSection">
      <div className="eventsInner">
        <div className="mfsaEventsHeaderV2">
          <div className="mfsaEventsHeaderLeftV2">
            <h2 className="mfsaEventsTitleV2">EVENTS</h2>
            <p className="mfsaEventsSubtitleV2">
              Discover the latest competitions and community gatherings.
            </p>
          </div>

          <div className="mfsaEventsHeaderRightV2">
            <span className="mfsaEventsFilterLabelV2">Filter :</span>

            <button
              className={`mfsaEventsFilterBtnV2 ${filter === "UPCOMING" ? "active" : ""}`}
              onClick={() => setFilter("UPCOMING")}
            >
              Upcoming
            </button>

            <button
              className={`mfsaEventsFilterBtnV2 ${filter === "PAST" ? "active" : ""}`}
              onClick={() => setFilter("PAST")}
            >
              Past Events
            </button>

            <button
              className={`mfsaEventsCalendarBtnV2 ${viewMode === "calendar" ? "active" : ""}`}
              onClick={() =>
                setViewMode(viewMode === "calendar" ? "grid" : "calendar")
              }
            >
              {viewMode === "calendar" ? "Card View" : "Calendar View"}
            </button>
          </div>
        </div>

        {/* LOADING / ERROR */}
        {isLoading && <SkeletonLoader variant="card" count={6} />}
        {isError && (
          <ErrorState
            title="Unable to load events"
            message="Please check your network and retry."
            onRetry={() => window.location.reload()}
          />
        )}

        {/* GRID VIEW */}
        {viewMode === "grid" &&
          !isLoading &&
          (filteredEvents.length === 0 ? (
            // ✅ OUTSIDE GRID — Perfect Centering
            <div className="w-full flex justify-center items-center min-h-[400px]">
              <EmptyState
                title="No Events Available"
                message="No events found for selected filter."
                actionLabel="Back to Home"
                onAction={() => navigate("/")}
              />
            </div>
          ) : (
            // ✅ ONLY GRID HERE
            <div className="eventsGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredEvents.map((event) => (
                <div className="mfsaEventCardX" key={event.id}>
                  <div className="mfsaEventImgX">
                    <img
                      src={event.image}
                      alt={event.event_name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mfsaEventOverlayX">
                    <span className="mfsaEventTagX">Event</span>

                    <h3 className="mfsaEventTitleX">{event.event_name}</h3>

                    <div className="mfsaEventMetaX">
                      <span className="flex items-center gap-1">
                        <FiCalendar /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin /> {event.venue}
                      </span>
                    </div>

                    <button
                      className="mfsaEventBtnX"
                      onClick={() => navigate(`/eventview/${event.id}`)}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {/* CALENDAR VIEW */}
        {viewMode === "calendar" && !isLoading && (
          <div className="calendarWrapper">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              height="auto"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "",
              }}
              buttonText={{
                today: "Today",
              }}
              buttonIcons={{
                prev: "chevron-left",
                next: "chevron-right",
              }}
              eventContent={(arg) => (
                <div className="customEvent">
                  <span className="dot"></span>
                  {arg.event.title}
                </div>
              )}
              eventClick={(info) => {
                navigate(`/eventview/${info.event.id}`);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
