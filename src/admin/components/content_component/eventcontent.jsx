import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { post_content, get_content } from "../../api/auth_api";

export default function EventContent() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    event_headline: "",
    event_page_description: "",
  });

  const [changed, setChanged] = useState(false);

  /* =========================
     FETCH EVENT CONTENT
  ========================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["event-content"],
    queryFn: () => get_content("media"), // ✅ IMPORTANT
  });

  /* =========================
     SET DATA INTO FORM
  ========================= */
  useEffect(() => {
    if (data?.data) {
      const d = data.data;

      setForm({
        event_headline: d.event_headline || "",
        event_page_description: d.event_page_description || "",
      });

      setChanged(false);
    }
  }, [data]);

  /* =========================
     UPDATE (MUTATION)
  ========================= */
  const mutation = useMutation({
    mutationFn: (formData) => post_content(formData),

    onSuccess: () => {
      alert("✅ Event content updated");
      setChanged(false);

      // 🔥 refetch updated data
      queryClient.invalidateQueries(["event-content"]);
    },

    onError: (error) => {
      console.error(error);
      alert(error?.response?.data?.message || "❌ Update failed");
    },
  });

  /* =========================
     HANDLERS
  ========================= */

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setChanged(true);
  };

  const handleCancel = () => {
    if (data?.data) {
      const d = data.data;

      setForm({
        event_headline: d.event_headline || "",
        event_page_description: d.event_page_description || "",
      });
    }

    setChanged(false);
  };

  const saveChanges = () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      const value = form[key];

      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    mutation.mutate(formData);
  };

  /* =========================
     UI STATES
  ========================= */

  if (isLoading) return <p>Loading event content...</p>;
  if (isError) return <p>Error loading event content</p>;

  /* =========================
     UI
  ========================= */

  return (
    <div className="card">
      {/* HEADER */}
      <div className="section">
        <h2>
          <FaCalendarAlt /> Event Page Settings
        </h2>

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
        <h2>
          <FaInfoCircle /> Event Description
        </h2>

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
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={saveChanges}
            disabled={!changed || mutation.isLoading}
          >
            {mutation.isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}