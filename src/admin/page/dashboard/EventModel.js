import React, { useState, useEffect } from "react";
import "../../style/dashboard/EventModel.css";
import { postevent } from "../../api/event_api";

export default function EventModal({ close, data }) {

  const [form, setForm] = useState({
    event_name: "",
    description: "",
    location: "",
    date: "",
    time: "",
    image: null,
    visibility: "PUBLIC",
    status: "DRAFT"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      image: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("event_name", form.event_name);
    formData.append("description", form.description);
    formData.append("venue", form.location);
    formData.append("time", form.time);
    formData.append("visibility", form.visibility);
    formData.append("status", form.status);
    formData.append("date", form.date);
    if (form.image) {
      formData.append("image", form.image);
    }
    postevent(formData)
      .then(() => {
        alert("Event saved successfully!");
        close();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to save event.");
      });
  };

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title || "",
        description: data.description || "",
        location: data.location || "",
        startDate: data.startDate || "",
        endDate: data.endDate || "",
        visibility: data.visibility || "PUBLIC",
        status: data.status || "DRAFT",
        image: null
      });
    }
  }, [data]);

  return (
    <div className="modalOverlay">

      <div className="eventModal">

        <div className="modalHeader">
          <h3>CREATE / EDIT EVENT</h3>
          <span onClick={close}>✕</span>
        </div>

        <label>Event Title</label>
        <input
          name="title"
          value={form.title}
          placeholder="Enter event title"
          onChange={handleChange}
        />

        <label>Short Description</label>
        <textarea
          name="description"
          value={form.description}
          placeholder="Enter short event summary..."
          onChange={handleChange}
        />

        <label>Event Location</label>
        <input
          name="location"
          value={form.location}
          placeholder="Enter event location"
          onChange={handleChange}
        />

        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />

        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />

        <label>Upload Banner</label>
        <input type="file" onChange={handleFileChange} />

        <label>Visibility Level</label>
        <select
          name="visibility"
          value={form.visibility}
          onChange={handleChange}
        >
          <option value="PUBLIC">Public</option>
          <option value="STATE">State</option>
          <option value="CLUB">Club</option>
        </select>

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="DRAFT">Save as Draft</option>
          <option value="PUBLISHED">Publish</option>
        </select>

        <div className="modalActions">
          <button className="cancelBtn" onClick={close}>Cancel</button>
          <button className="savesBtn" onClick={handleSubmit}>Save Event</button>
        </div>

      </div>
    </div>
  );
}