import UserMap from "./usemap";

const eventLocation = {
  lat: 1.4927,
  lng: 103.7414,
};
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { geteventdetails } from "../../api/event";


export default function EventDetailX() {
  const { eventId } = useParams();

  const {
    data: eventData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["eventDetails", eventId],
    queryFn: () => geteventdetails(eventId),
    enabled: !!eventId,
  });

  const event = eventData?.data || {};
  console.log("Event Detail Data:", event);
  if (!event) {
    return (
      <div className="mfsaEmptyState">
        <h3>No Event Found</h3>
      </div>
    );
  }
  return (
    <section className="mfsaEventDetailX-section">
      <div className="mfsaEventDetailX-container">
        {/* ===== TOP BANNER ===== */}
        <div className="mfsaEventDetailX-banner" style={{
          backgroundImage: `url(${event.image})`
        }}>
          {/* <span className="badges">FEATURED EVENT</span> */}

          <h1>{event.event_name || "Event Name"}</h1>

          <div className="mfsaEventDetailX-meta">
            <span>📅 {event.date || "-"}</span>
            <span>📍 {event.venue || "Johor Aquatic Centre"}</span>
          </div>
        </div>

        <div className="mfsaEventDetailX-main">
          {/* LEFT */}
          <div className="mfsaEventDetailX-left">
            <h3>Event Details</h3>

            <div className="detailItem">
              <span>Organized by</span>
              <p>{event.organized_by || "-"}</p>
            </div>

            <div className="detailItem">
              <span>Date</span>
              <p>{event.date || "-"}</p>
            </div>

            <div className="detailItem">
              <span>Venue</span>
              <p>{event.venue || "-"}</p>
            </div>

            <div className="detailItem">
              <span>Time</span>
              <p>{event.time || "-"}</p>
            </div>

            <button className="registerBtn">Register Now →</button>
          </div>

          {/* RIGHT */}
          <div className="mfsaEventDetailX-right">
            <h2>{event.event_name}</h2>

            {event.description ? (
              event.description
                .split("\n\n")
                .map((para, i) => <p key={i}>{para}</p>)
            ) : (
              <div className="mfsaEmptyBox">
                <p>No description available.</p>
              </div>
            )}

            <div className="mfsaEventDetailX-quote">
              "Join us for an unforgettable experience."
            </div>

            <h4>Event Highlights</h4>

            <div className="mfsaEventDetailX-highlights">
              <div>✔ Professional timing systems</div>
              <div>✔ Certified officials</div>
              <div>✔ National ranking points</div>
              <div>✔ Awards ceremony</div>
            </div>
          </div>
        </div>

        {/* ===== MAP ===== */}
        <div className="mfsaEventDetailX__map">
          <div className="mfsaEventDetailX__map-container">
            {/* Google Map */}
            <UserMap lat={eventLocation.lat} lng={eventLocation.lng} />

            <div className="mfsaEventDetailX__map-overlay">
              📍 Johor Aquatic Centre
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
