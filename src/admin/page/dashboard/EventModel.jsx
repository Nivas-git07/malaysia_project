import React, { useState, useEffect } from "react";
import "../../style/dashboard/EventModel.css";
import { postevent } from "../../api/event_api";
import { editevent } from "../../api/event_api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function EventModal({ close, data }) {
  console.log("EventModal received data:", data);
  const [form, setForm] = useState({
    event_name: "",
    description: "",
    location: "",
    date: "",
    time: "",
    organizer: "",
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
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("visibility", form.visibility);
    formData.append("organized_by", form.organizer);
    formData.append("status", form.status);
    formData.append("time", form.time);
    if (form.image) {
      formData.append("image", form.image);
    }
    if (data && data[0]?.id) {
      editevent(data[0]?.id, formData)
        .then(() => {
          alert("Event updated successfully!");
          close();
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to update event. Please try again.");
        });
    }
    else {
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
  }

  useEffect(() => {
    if (data?.[0]) {
      setForm({
        event_name: data[0]?.event_name || "",
        description: data[0]?.description || "",
        location: data[0]?.venue || "",
        date: data[0]?.date || "",
        time: data[0]?.time || "",
        organizer: data[0]?.organized_by || "",
        visibility: data[0]?.visibility || "PUBLIC",
        status: data[0]?.status || "DRAFT",
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
          name="event_name"
          value={form.event_name}
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

        <label> Date</label>
        {/* <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          lang="en-CA"
        /> */}

        <DatePicker 
          selected={form.date ? new Date(form.date) : null}
          onChange={(date) =>
            setForm({
              ...form,
              date: date.toISOString().split("T")[0]
            })
          }
          dateFormat="yyyy/MM/dd"
          className="datePicker"
        />

        <label> Time</label>
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}

        />



        <label>Organizer</label>
        <input
          name="organizer"
          value={form.organizer}
          placeholder="Enter organizer name"
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