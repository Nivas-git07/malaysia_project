import React, { useState, useEffect } from "react";
import "../../style/dashboard/EventModel.css";

import { postevent, editevent, delete_event } from "../../api/event_api";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { FiX } from "react-icons/fi";

import { get_state } from "../../../user/api/auth";
import { get_check } from "../../../user/api/home_api";

export default function EventModal({ close, data }) {
  const queryClient = useQueryClient();

  const eventData = Array.isArray(data) ? data[0] : data;

  const { data: state } = useQuery({
    queryKey: ["get_state"],
    queryFn: get_state,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const states = state?.data || [];

  const { data: sessiondata } = useQuery({
    queryKey: ["get_session"],
    queryFn: get_check,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const [highlights, setHighlights] = useState([""]);

  const [form, setForm] = useState({
    event_name: "",
    description: "",
    location: "",
    date: "",
    event_start: "",
    event_end: "",
    image: null,
    status: "DRAFT",

    sanction_type: "",

    national: "",
    state: "",
  });

  const [previewImage, setPreviewImage] = useState("");

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
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({
        ...form,
        image: file,
      });

      setPreviewImage(URL.createObjectURL(file));
    }
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

    formData.append("status", form.status);

    formData.append(
      "highlight",
      JSON.stringify(highlights.filter((h) => h.trim() !== "")),
    );

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    // CLUB USER
    if (sessiondata?.data?.role === "CLUB") {
      if (form.sanction_type === "NATIONAL") {
        formData.append("national", sessiondata?.data?.national_id);
      }

      if (form.sanction_type === "STATE") {
        formData.append("state", form.state);
      }
    }

    // STATE USER
    if (sessiondata?.data?.role === "STATE") {
      formData.append("national", sessiondata?.data?.national_id);
    }

    const request = eventData?.id
      ? editevent(eventData.id, formData)
      : postevent(formData);

    request
      .then(() => {
        alert(
          eventData
            ? "Event updated successfully!"
            : "Event saved successfully!",
        );

        queryClient.invalidateQueries(["events"]);

        close();
      })
      .catch((e) => {
        console.error(e?.response?.data || e);

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

        status: eventData.status || "DRAFT",

        image: null,

        sanction_type: "",

        national: "",

        state: "",
      });

      if (eventData.image) {
        setPreviewImage(eventData.image);
      }

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

          <span onClick={close}>
            <FiX />
          </span>
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

              date: date.toISOString().split("T")[0],
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

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {previewImage && (
          <div className="previewContainer">
            <img src={previewImage} alt="Preview" className="previewImage" />
          </div>
        )}

        <label>Event Highlights</label>

        <div className="highlightContainer">
          {highlights.map((item, index) => (
            <div className="highlightRow" key={index}>
              <input
                type="text"
                className="highlightInput"
                placeholder="Enter highlight"
                value={item}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
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

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="DRAFT">Save as Draft</option>

          <option value="PUBLISHED">Publish</option>
        </select>

        {!eventData && (
          <div className="sanctionWrapper">
            <div className="sanctionHeader">
              <h4>Sanction Authority</h4>

              <p>Choose the governing authority responsible for this event.</p>
            </div>

            {/* CLUB */}
            {sessiondata?.data?.role === "CLUB" && (
              <div className="sanctionCard">
                <div className="sanctionField">
                  <label>Authority Type</label>

                  <select
                    className="modernSelect"
                    value={form.sanction_type}
                    onChange={(e) =>
                      setForm({
                        ...form,

                        sanction_type: e.target.value,

                        national: "",

                        state: "",
                      })
                    }
                  >
                    <option value="">Select Authority</option>

                    <option value="STATE">State Sanction</option>

                    <option value="NATIONAL">National Sanction</option>
                  </select>
                </div>

                {form.sanction_type === "STATE" && (
                  <div className="sanctionField">
                    <label>Select State</label>

                    <select
                      className="modernSelect"
                      value={form.state}
                      onChange={(e) =>
                        setForm({
                          ...form,

                          state: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose State</option>

                      {states?.map((s) => (
                        <option key={s.user} value={s.user}>
                          {s.state_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {form.sanction_type === "NATIONAL" && (
                  <div className="selectedAuthorityCard">
                    <span className="authorityBadge">NATIONAL</span>

                    <h5>National Federation</h5>

                    <p>
                      Event will be submitted under national sanction approval.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STATE */}
            {sessiondata?.data?.role === "STATE" && (
              <div className="selectedAuthorityCard">
                <span className="authorityBadge">NATIONAL</span>

                <h5>National Federation</h5>

                <p>
                  State events are directly submitted to national sanction
                  authority.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="modalActions">
          {data && (
            <button
              type="button"
              className="membership-reject-btn"
              onClick={async () => {
                try {
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this event?",
                  );

                  if (!confirmDelete) return;

                  setLoading(true);

                  const response = await delete_event(eventData.id);

                  if (response?.status === 200 || response?.status === 204) {
                    alert("Event deleted successfully!");

                    await queryClient.invalidateQueries(["events"]);

                    close();
                  } else {
                    alert("Delete failed.");
                  }
                } catch (e) {
                  console.error(e?.response?.data || e);

                  alert(
                    e?.response?.data?.message || "Failed to delete event.",
                  );
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? "Deleting..." : "Delete Event"}
            </button>
          )}

          {!data && (
            <button className="cancelBtn" onClick={close}>
              Cancel
            </button>
          )}

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
