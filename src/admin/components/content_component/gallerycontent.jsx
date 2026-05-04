import React, { useState } from "react";
import { FaImages, FaInfoCircle } from "react-icons/fa";

export default function GalleryContent() {
  const [form, setForm] = useState({
    gallery_headline: "",
    gallery_page_description: "",
  });

  const [changed, setChanged] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setChanged(true);
  };

  const handleCancel = () => {
    setForm({
      gallery_headline: "",
      gallery_page_description: "",
    });
    setChanged(false);
  };

  const saveChanges = () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    console.log("Gallery Data:", formData);

    // 👉 API CALL
    // axios.post("/api/gallery-content", formData)

    setChanged(false);
  };

  return (
    <div className="card">

      {/* HEADLINE */}
      <div className="section">
        <h2><FaImages /> Gallery Page Settings</h2>

        <label>Gallery Headline</label>
        <input
          placeholder="Enter gallery headline"
          value={form.gallery_headline}
          onChange={(e) =>
            handleChange("gallery_headline", e.target.value)
          }
        />
      </div>

      {/* DESCRIPTION */}
      <div className="section">
        <h2><FaInfoCircle /> Gallery Description</h2>

        <textarea
          rows={5}
          placeholder="Enter gallery page description"
          value={form.gallery_page_description}
          onChange={(e) =>
            handleChange("gallery_page_description", e.target.value)
          }
        />
      </div>

      {/* STICKY ACTION BAR */}
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