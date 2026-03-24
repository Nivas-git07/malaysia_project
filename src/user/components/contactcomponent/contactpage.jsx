import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactX() {
  return (
    <section className="mfsaContactX-section">

      <div className="mfsaContactX-container">

        {/* LEFT SIDE */}
        <div className="mfsaContactX-left">

          <div className="mfsaContactX-card">
            <div className="mfsaContactX-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Our Headquarters</h3>
            <p>
              National Aquatics Centre,<br />
              KL Sports City, Bukit Jalil,<br />
              57000 Kuala Lumpur, Malaysia
            </p>
          </div>

          <div className="mfsaContactX-card">
            <div className="mfsaContactX-icon">
              <FaPhoneAlt />
            </div>
            <h3>Phone</h3>
            <p>
              +60 3-8994 4660<br />
              <span>Mon - Fri, 9am - 5pm</span>
            </p>
          </div>

          <div className="mfsaContactX-card">
            <div className="mfsaContactX-icon">
              <FaEnvelope />
            </div>
            <h3>Email</h3>
            <p>
              hello@mfsa.org.my<br />
              <span>We typically reply within 24h</span>
            </p>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="mfsaContactX-right">

          <h2 className="mfsaContactX-title">Send us a Message</h2>

          <form className="mfsaContactX-form">

            <div className="mfsaContactX-row">
              <div className="mfsaContactX-field">
                <label>FULL NAME</label>
                <input type="text" placeholder="John Doe" />
              </div>

              <div className="mfsaContactX-field">
                <label>EMAIL ADDRESS</label>
                <input type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="mfsaContactX-field">
              <label>SUBJECT</label>
              <input type="text" placeholder="How can we help you?" />
            </div>

            <div className="mfsaContactX-field">
              <label>MESSAGE</label>
              <textarea placeholder="Your message here..."></textarea>
            </div>

            <button className="mfsaContactX-btn">Send Message</button>

          </form>

        </div>

      </div>

    </section>
  );
}