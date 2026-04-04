import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { raise_tiket } from "../../api/home_api";
import { useState } from "react";
export default function ContactX() {
  const [formData, setFormData] = useState({
    full_name: "",
    email_id: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email_id || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

    raise_tiket(formData)
      .then((res) => {
        alert("Message sent successfully!");
        setFormData({
          full_name: "",
          email_id: "",
          subject: "",
          message: "",
        });
      })
      .catch((err) => {
        alert("Failed to send message. Please try again.");
      });
  };

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
              National Aquatics Centre,
              <br />
              KL Sports City, Bukit Jalil,
              <br />
              57000 Kuala Lumpur, Malaysia
            </p>
          </div>

          <div className="mfsaContactX-card">
            <div className="mfsaContactX-icon">
              <FaPhoneAlt />
            </div>
            <h3>Phone</h3>
            <p>
              +60 3-8994 4660
              <br />
              <span>Mon - Fri, 9am - 5pm</span>
            </p>
          </div>

          <div className="mfsaContactX-card">
            <div className="mfsaContactX-icon">
              <FaEnvelope />
            </div>
            <h3>Email</h3>
            <p>
              hello@mfsa.org.my
              <br />
              <span>We typically reply within 24h</span>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="mfsaContactX-right">
          <h2 className="mfsaContactX-title">Send us a Message</h2>

          <form className="mfsaContactX-form" onSubmit={handleSubmit}>
            <div className="mfsaContactX-row">
              <div className="mfsaContactX-field">
                <label>FULL NAME</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>

              <div className="mfsaContactX-field">
                <label>EMAIL ADDRESS</label>
                <input
                  name="email_id"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email_id}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mfsaContactX-field">
              <label>SUBJECT</label>
              <input
                name="subject"
                type="text"
                placeholder="How can we help you?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="mfsaContactX-field">
              <label>MESSAGE</label>
              <textarea
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="mfsaContactX-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}
