import EventCardX from "./eventcard";
import { FiArrowRight } from "react-icons/fi";
import img1 from "../../assets/image2.jpg"
import img2 from "../../assets/image3.jpg"
import img3 from "../../assets/background.png"
import logo from "../../assets/logo.jpg"
export default function UpcomingEvents() {
  return (
    <section className="mfsaEventX-section">

      <div className="mfsaEventX-container">

        {/* HEADER */}
        <div className="mfsaEventX-header">
          <h2>Upcoming Events</h2>
          <span className="mfsaEventX-view">
            View Calendar <FiArrowRight />
          </span>
        </div>

        {/* GRID */}
        <div className="mfsaEventX-grid">

          <EventCardX
            bg={img1}
            title="National Championship 2024"
            date="OCT 15"
            location="Bukit Jalil, Kuala Lumpur"
          />

          <EventCardX
            bg={img2}
            title="Junior Finswimming Meet"
            date="NOV 02"
            location="SPICE Aquatic, Penang"
          />

          <EventCardX
            bg={img3}
            title="Selangor Open 2024"
            date="DEC 12"
            location="Shah Alam, Selangor"
          />

        </div>

      </div>

    </section>
  );
}