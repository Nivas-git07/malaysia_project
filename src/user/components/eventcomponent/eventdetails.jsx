import UserMap from "./usemap";

const eventLocation = {
  lat: 1.4927,
  lng: 103.7414,
};

export default function EventDetailX() {
  return (
    <section className="mfsaEventDetailX-section">
      <div className="mfsaEventDetailX-container">
        {/* ===== TOP BANNER ===== */}
        <div className="mfsaEventDetailX-banner">
          <span className="badge">FEATURED EVENT</span>

          <h1>TYR SUMMER CHAMPIONSHIPS</h1>

          <div className="mfsaEventDetailX-meta">
            <span>📅 August 5 - 8, 2025</span>
            <span>📍 Johor Aquatic Centre</span>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="mfsaEventDetailX-main">
          {/* LEFT */}
          <div className="mfsaEventDetailX-left">
            <h3>Event Details</h3>

            <div className="detailItem">
              <span>Organized by</span>
              <p>Johor Finswimming Association</p>
            </div>

            <div className="detailItem">
              <span>Date Range</span>
              <p>Aug 5 – Aug 8, 2025</p>
            </div>

            <div className="detailItem">
              <span>Venue</span>
              <p>Johor Aquatic Centre</p>
            </div>

            <div className="detailItem">
              <span>Operating Hours</span>
              <p>08:00 AM – 06:00 PM</p>
            </div>

            <button className="registerBtn">Register Now →</button>
          </div>

          {/* RIGHT */}
          <div className="mfsaEventDetailX-right">
            <h2>About the Championships</h2>

            <p>
              The TYR Summer Championships represent the pinnacle of regional
              finswimming competition. Hosted by the Johor Finswimming
              Association, this four-day event brings together elite athletes.
            </p>

            <p>
              This year's competition features state-of-the-art timing systems
              and world-class officiating, ensuring a fair and exciting
              experience.
            </p>

            <p>
              The TYR Summer Championships represent the pinnacle of regional
              finswimming competition. Hosted by the Johor Finswimming
              Association, this four-day event brings together elite athletes.
            </p>

            <p>
              This year's competition features state-of-the-art timing systems
              and world-class officiating, ensuring a fair and exciting
              experience.
            </p>
            <p>
              This year's competition features state-of-the-art timing systems
              and world-class officiating, ensuring a fair and exhilarating
              experience for all participants. Whether you are a seasoned
              competitor looking to break records or a newcomer to the sport,
              the Summer Championships offer a platform to showcase your speed
              and technique.
            </p>
            {/* QUOTE */}
            <div className="mfsaEventDetailX-quote">
              "Join us for an unforgettable celebration of aquatic speed and
              endurance."
            </div>

            {/* HIGHLIGHTS */}
            <h4>Event Highlights</h4>

            <div className="mfsaEventDetailX-highlights">
              <div>✔ National qualifying times recognition</div>
              <div>✔ Master’s category events</div>
              <div>✔ Junior development programs</div>
              <div>✔ Closing awards ceremony</div>
            </div>
          </div>
        </div>

        {/* ===== MAP ===== */}
        <div className="mfsaEventDetailX__map">
          <div className="mfsaEventDetailX__map-container">
            {/* Google Map */}
            <UserMap lat={eventLocation.lat} lng={eventLocation.lng} />

            {/* Overlay Location Name */}
            <div className="mfsaEventDetailX__map-overlay">
              📍 Johor Aquatic Centre
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
