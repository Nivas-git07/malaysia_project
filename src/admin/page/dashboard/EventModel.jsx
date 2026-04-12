import React, { useState, useEffect } from "react";
import "../../style/dashboard/EventModel.css";
import { postevent } from "../../api/event_api";
import { editevent } from "../../api/event_api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQueryClient } from "@tanstack/react-query";
import { FiX } from "react-icons/fi";
export default function EventModal({ close, data }) {
  console.log("EventModal received data:", data);
  const queryClient = useQueryClient();
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

  const [loading, setLoading] = useState(false);

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

    const request = data && data[0]?.id
      ? editevent(data[0]?.id, formData)
      : postevent(formData);

    request
      .then(() => {
        alert(data ? "Event updated successfully!" : "Event saved successfully!");
        queryClient.invalidateQueries(["events"]);
        close();
      })
      .catch((err) => {
        console.error(err);
        alert("Something went wrong.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (data?.[0]) {
      setForm({
        event_name: data[0]?.event_name || "",
        description: data[0]?.description || "",
        location: data[0]?.venue || "",
        date: data[0]?.date || "",
        event_start: data[0]?.event_start || "",
        event_end: data[0]?.event_end || "",
        visibility: data[0]?.visibility || "PUBLIC",
        status: data[0]?.status || "DRAFT",
        image: null
      });


      let parsedHighlights = [""];

      if (data[0]?.highlight) {
        try {
          parsedHighlights =
            typeof data[0].highlight === "string"
              ? JSON.parse(data[0].highlight)
              : data[0].highlight;
        } catch (e) {
          parsedHighlights = [""];
        }
      }

      setHighlights(parsedHighlights.length ? parsedHighlights : [""]);
    }
  }, [data]);

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



        {/* <label>Organizer</label>
        <input
          name="organizer"
          value={form.organizer}
          placeholder="Enter organizer name"
          onChange={handleChange}
        /> */}

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