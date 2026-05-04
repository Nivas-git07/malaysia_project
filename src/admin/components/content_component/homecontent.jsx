import React, { useState } from "react";
import { FaBars, FaImage, FaInfoCircle } from "react-icons/fa";

export default function HomeContent() {
  const [form, setForm] = useState({
    home_page_banner: null,
    home_page_description: "",
    who_we_are: "",
    who_we_are_image: null,
    our_mission: "",
    our_vision: "",
  });

  const [preview, setPreview] = useState({
    banner: null,
    whoImage: null,
  });

  const [changed, setChanged] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setChanged(true);
  };

  const handleFileChange = (key, file) => {
    setForm({ ...form, [key]: file });
    setChanged(true);

    if (file) {
      const url = URL.createObjectURL(file);

      if (key === "home_page_banner") {
        setPreview((prev) => ({ ...prev, banner: url }));
      }

      if (key === "who_we_are_image") {
        setPreview((prev) => ({ ...prev, whoImage: url }));
      }
    }
  };

  const saveChanges = () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    console.log("Submitting:", formData);

    // 👉 API CALL HERE
    // axios.post('/api/home', formData)

    setChanged(false);
  };

  return (
    <div className="card">

      {/* HERO BANNER */}
      <div className="section">
        <h2><FaBars /> Home Banner (Video)</h2>

        <input
          type="file"
          accept="video/*"
          onChange={(e) =>
            handleFileChange("home_page_banner", e.target.files[0])
          }
        />

        {preview.banner && (
          <video
            src={preview.banner}
            controls
            className="preview-video"
          />
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="section">
        <h2><FaInfoCircle /> Home page Banner Description</h2>

        <textarea
          placeholder="Enter home page description"
          value={form.home_page_description}
          onChange={(e) =>
            handleChange("home_page_description", e.target.value)
          }
        />
      </div>

      {/* WHO WE ARE */}
      <div className="section">
        <h2><FaInfoCircle /> Who We Are</h2>

        <textarea
          placeholder="Enter about content"
          value={form.who_we_are}
          onChange={(e) =>
            handleChange("who_we_are", e.target.value)
          }
        />
      </div>

      {/* WHO IMAGE */}
      <div className="section">
        <h2><FaImage /> Who We Are Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleFileChange("who_we_are_image", e.target.files[0])
          }
        />

        {preview.whoImage && (
          <img
            src={preview.whoImage}
            alt="preview"
            className="preview-image"
          />
        )}
      </div>

      {/* MISSION */}
      <div className="section">
        <h2><FaInfoCircle /> Our Mission</h2>

        <textarea
          value={form.our_mission}
          onChange={(e) =>
            handleChange("our_mission", e.target.value)
          }
        />
      </div>

      {/* VISION */}
      <div className="section">
        <h2><FaInfoCircle /> Our Vision</h2>

        <textarea
          value={form.our_vision}
          onChange={(e) =>
            handleChange("our_vision", e.target.value)
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