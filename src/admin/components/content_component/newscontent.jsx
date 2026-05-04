import React, { useState } from "react";
import { FaNewspaper, FaInfoCircle } from "react-icons/fa";

export default function NewsContent() {
  const [form, setForm] = useState({
    news_headline: "",
    news_page_description: "",
  });

  const [changed, setChanged] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setChanged(true);
  };

  const handleCancel = () => {
    setForm({
      news_headline: "",
      news_page_description: "",
    });
    setChanged(false);
  };

  const saveChanges = () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    console.log("News Data:", formData);

    // 👉 API CALL
    // axios.post("/api/news", formData)

    setChanged(false);
  };

  return (
    <div className="card">

      {/* HEADLINE */}
      <div className="section">
        <h2><FaNewspaper /> News Page Settings</h2>

        <label>News Headline</label>
        <input
          placeholder="Enter news headline"
          value={form.news_headline}
          onChange={(e) =>
            handleChange("news_headline", e.target.value)
          }
        />
      </div>

      {/* DESCRIPTION */}
      <div className="section">
        <h2><FaInfoCircle /> News Description</h2>

        <textarea
          rows={5}
          placeholder="Enter news page description"
          value={form.news_page_description}
          onChange={(e) =>
            handleChange("news_page_description", e.target.value)
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