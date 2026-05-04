import React, { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function FooterContent() {
  const [form, setForm] = useState({
    footer_insta: "",
    footer_fb: "",
    footer_wp: "",
    footer_email: "",
    footer_phone: "",
    footer_address: "",
    footer_recognized_by: "",
    copy_rights: "",
  });

  const [changed, setChanged] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setChanged(true);
  };

  const saveChanges = () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    console.log("Footer Data:", formData);

    // 👉 API CALL
    // axios.post("/api/footer", formData)

    setChanged(false);
  };

  return (
    <div className="card">

      {/* SOCIAL LINKS */}
      <div className="section">
        <h2>Social Links</h2>

        <label><FaInstagram /> Instagram</label>
        <input
          placeholder="Instagram URL"
          value={form.footer_insta}
          onChange={(e) =>
            handleChange("footer_insta", e.target.value)
          }
        />

        <label><FaFacebookF /> Facebook</label>
        <input
          placeholder="Facebook URL"
          value={form.footer_fb}
          onChange={(e) =>
            handleChange("footer_fb", e.target.value)
          }
        />

        <label><FaWhatsapp /> WhatsApp</label>
        <input
          placeholder="WhatsApp Number / Link"
          value={form.footer_wp}
          onChange={(e) =>
            handleChange("footer_wp", e.target.value)
          }
        />
      </div>

      {/* CONTACT INFO */}
      <div className="section">
        <h2>Contact Information</h2>

        <label><FaEnvelope /> Email</label>
        <input
          value={form.footer_email}
          onChange={(e) =>
            handleChange("footer_email", e.target.value)
          }
        />

        <label><FaPhone /> Phone</label>
        <input
          value={form.footer_phone}
          onChange={(e) =>
            handleChange("footer_phone", e.target.value)
          }
        />

        <label><FaMapMarkerAlt /> Address</label>
        <textarea
          value={form.footer_address}
          onChange={(e) =>
            handleChange("footer_address", e.target.value)
          }
        />
      </div>

      {/* EXTRA */}
      <div className="section">
        <h2>Footer Details</h2>

        <label>Recognized By</label>
        <textarea
          value={form.footer_recognized_by}
          onChange={(e) =>
            handleChange("footer_recognized_by", e.target.value)
          }
        />

        <label>Copyright Text</label>
        <input
          value={form.copy_rights}
          onChange={(e) =>
            handleChange("copy_rights", e.target.value)
          }
        />
      </div>

      {/* STICKY BAR */}
      <div className="sticky-bar">
        <span className="status">
          {changed ? "● Unsaved changes" : "All changes saved"}
        </span>

        <div className="actions">
          <button className="cancel-btn">Cancel</button>
          <button
            className="save-btn"
            onClick={saveChanges}
            disabled={!changed}
          >
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
}