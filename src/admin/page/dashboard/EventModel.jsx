import React, { useState, useEffect } from "react";
import "../../style/dashboard/EventModel.css";
import { postevent, editevent } from "../../api/event_api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQueryClient } from "@tanstack/react-query";
import { FiX } from "react-icons/fi";

export default function EventModal({ close, data }) {
  const queryClient = useQueryClient();
  const eventData = Array.isArray(data) ? data[0] : data;

  const [highlights, setHighlights] = useState([""]);
  const [form, setForm] = useState({
    event_name: "",
    description: "",
    location: "",
    date: "",
    event_start: "",
    event_end: "",
    image: null,
    visibility: "PUBLIC",
    status: "DRAFT"
  });

  const [loading, setLoading] = useState(false);

  const handleHighlightChange = (index, value) => {
    const updated = [...highlights];
    updated[index] = value;
    setHighlights(updated);
  };

  const addHighlight = () => {
    setHighlights([...highlights, ""]);
  };

  const removeHighlight = (index) => {
    const updated = highlights.filter((_, i) => i !== index);
    setHighlights(updated.length ? updated : [""]);
  };

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
    if (loading) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("event_name", form.event_name);
    formData.append("description", form.description);
    formData.append("venue", form.location);
    formData.append("event_start", form.event_start);
    formData.append("event_end", form.event_end);
    formData.append("date", form.date);
    formData.append("visibility", form.visibility);
    formData.append("status", form.status);
    formData.append(
      "highlight",
      JSON.stringify(highlights.filter(h => h.trim() !== ""))
    );

    if (form.image) {
      formData.append("image", form.image);
    }

    const request = eventData?.id
      ? editevent(eventData.id, formData)
      : postevent(formData);

    request
      .then(() => {
        alert(eventData ? "Event updated successfully!" : "Event saved successfully!");
        queryClient.invalidateQueries(["events"]);
        close();
      })
      .catch(() => {
        alert("Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (eventData) {
      setForm({
        event_name: eventData.event_name || "",
        description: eventData.description || "",
        location: eventData.venue || "",
        date: eventData.date || "",
        event_start: eventData.event_start || "",
        event_end: eventData.event_end || "",
        visibility: eventData.visibility || "PUBLIC",
        status: eventData.status || "DRAFT",
        image: null
      });

      let parsedHighlights = [""];

      if (eventData.highlight) {
        try {
          parsedHighlights =
            typeof eventData.highlight === "string"
              ? JSON.parse(eventData.highlight)
              : eventData.highlight;
        } catch {
          parsedHighlights = [""];
        }
      }

      setHighlights(parsedHighlights.length ? parsedHighlights : [""]);
    }
  }, [eventData]);

  return (
    <div className="modalOverlay">
      <div className="eventModal">
        <div className="modalHeader">
          <h3>CREATE / EDIT EVENT</h3>
          <span onClick={close}><FiX /></span>
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

        <label>Date</label>
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

        <label>Start Time</label>
        <input
          type="time"
          name="event_start"
          value={form.event_start}
          onChange={handleChange}
        />

        <label>End Time</label>
        <input
          type="time"
          name="event_end"
          value={form.event_end}
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

        <label>Event Highlights</label>
        <div className="highlightContainer">
          {highlights.map((item, index) => (
            <div className="highlightRow" key={index}>
              <input
                type="text"
                className="highlightInput"
                placeholder="Enter highlight"
                value={item}
                onChange={(e) =>
                  handleHighlightChange(index, e.target.value)
                }
              />
              {index !== 0 && (
                <button
                  type="button"
                  className="removeHighlightBtn"
                  onClick={() => removeHighlight(index)}
                >
                  <FiX />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="addHighlightBtn"
            onClick={addHighlight}
          >
            + Add Highlight
          </button>
        </div>

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
          <button
            type="button"
            className="savesBtn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Event"}
          </button>
        </div>
      </div>
    </div>
  );
}