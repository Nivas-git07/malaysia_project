import React, { useState } from "react";
import { FaUsers, FaBuilding, FaTrophy } from "react-icons/fa";

export default function AssociationContent() {
  const [form, setForm] = useState({
    associations_page_headline: "",
    associations_page_description: "",

    clubs_page_headline: "",
    clubs_page_description: "",

    best_records_page_headline: "",
    best_records_page_description: "",
  });

  const [changed, setChanged] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setChanged(true);
  };

  const handleCancel = () => {
    setForm({
      associations_page_headline: "",
      associations_page_description: "",

      clubs_page_headline: "",
      clubs_page_description: "",

      best_records_page_headline: "",
      best_records_page_description: "",
    });
    setChanged(false);
  };

  const saveChanges = () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    console.log("Association Content:", formData);

    // 👉 API CALL
    // axios.post("/api/association-content", formData)

    setChanged(false);
  };

  return (
    <div className="card">

      {/* ASSOCIATIONS */}
      <div className="section">
        <h2><FaUsers /> Associations Page</h2>

        <label>Headline</label>
        <input
          placeholder="Enter associations headline"
          value={form.associations_page_headline}
          onChange={(e) =>
            handleChange("associations_page_headline", e.target.value)
          }
        />

        <label>Description</label>
        <textarea
          rows={4}
          placeholder="Enter associations description"
          value={form.associations_page_description}
          onChange={(e) =>
            handleChange("associations_page_description", e.target.value)
          }
        />
      </div>

      {/* CLUBS */}
      <div className="section">
        <h2><FaBuilding /> Clubs Page</h2>

        <label>Headline</label>
        <input
          placeholder="Enter clubs headline"
          value={form.clubs_page_headline}
          onChange={(e) =>
            handleChange("clubs_page_headline", e.target.value)
          }
        />

        <label>Description</label>
        <textarea
          rows={4}
          placeholder="Enter clubs description"
          value={form.clubs_page_description}
          onChange={(e) =>
            handleChange("clubs_page_description", e.target.value)
          }
        />
      </div>

      {/* BEST RECORDS */}
      <div className="section">
        <h2><FaTrophy /> Best Records Page</h2>

        <label>Headline</label>
        <input
          placeholder="Enter best records headline"
          value={form.best_records_page_headline}
          onChange={(e) =>
            handleChange("best_records_page_headline", e.target.value)
          }
        />

        <label>Description</label>
        <textarea
          rows={4}
          placeholder="Enter best records description"
          value={form.best_records_page_description}
          onChange={(e) =>
            handleChange("best_records_page_description", e.target.value)
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
            disabled={!changed}
          >
            Save Changes
          </button>
        </div>
      </div>

    </div>
  );
}