import React, { useState } from "react";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

export default function EventContent() {
  const [form, setForm] = useState({
    event_headline: "",
    event_page_description: "",
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

    console.log("Event Data:", formData);

    // 👉 API CALL
    // axios.post("/api/event", formData)

    setChanged(false);
  };

  return (
    <div className="card">

      {/* HEADER */}
      <div className="section">
        <h2><FaCalendarAlt /> Event Page Settings</h2>

        <label>Event Headline</label>
        <input
          placeholder="Enter event headline"
          value={form.event_headline}
          onChange={(e) =>
            handleChange("event_headline", e.target.value)
          }
        />
      </div>

      {/* DESCRIPTION */}
      <div className="section">
        <h2><FaInfoCircle /> Event Description</h2>

        <textarea
          placeholder="Enter event page description"
          rows={5}
          value={form.event_page_description}
          onChange={(e) =>
            handleChange("event_page_description", e.target.value)
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