import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { raise_tiket } from "../../api/home_api";
import { useState } from "react";
import SpinnerLoader from "../common/SpinnerLoader";
export default function ContactX({ content }) {
  console.log(content);
  const [formData, setFormData] = useState({
    full_name: "",
    email_id: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.full_name.trim())
      nextErrors.full_name = "Full name is required";
    if (!formData.email_id.trim()) nextErrors.email_id = "Email is required";
    if (!formData.message.trim()) nextErrors.message = "Message is required";
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage("");

    raise_tiket(formData)
      .then((res) => {
        setSubmitMessage("Message sent successfully.");
        setFormData({
          full_name: "",
          email_id: "",
          subject: "",
          message: "",
        });
      })
      .catch((err) => {
        setSubmitMessage("Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
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
              {(
                content?.footer_address ||
                "National Aquatics Centre,\nKL Sports City, Bukit Jalil,\n57000 Kuala Lumpur, Malaysia"
              )
                .split(/\r?\n/) // handles both \n and \r\n
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          </div>

          <div className="mfsaContactX-card">
            <div className="mfsaContactX-icon">
              <FaPhoneAlt />
            </div>
            <h3>Phone</h3>
            <p>
              +{content?.footer_phone || "6937927392"}
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
              {content?.footer_email || "hello@mfsa.org.my"}
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
                  className={errors.full_name ? "mfsaInputError" : ""}
                />
                {errors.full_name && (
                  <small className="errorText">{errors.full_name}</small>
                )}
              </div>

              <div className="mfsaContactX-field">
                <label>EMAIL ADDRESS</label>
                <input
                  name="email_id"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email_id}
                  onChange={handleChange}
                  className={errors.email_id ? "mfsaInputError" : ""}
                />
                {errors.email_id && (
                  <small className="errorText">{errors.email_id}</small>
                )}
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
                className={errors.message ? "mfsaInputError" : ""}
              ></textarea>
              {errors.message && (
                <small className="errorText">{errors.message}</small>
              )}
            </div>

            <button className="mfsaContactX-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <SpinnerLoader label="Sending..." />
              ) : (
                "Send Message"
              )}
            </button>
            {submitMessage && <div className="noDataBox">{submitMessage}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
