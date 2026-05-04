import React, { useState } from "react";
import { FaInfoCircle, FaAddressBook, FaGlobe } from "react-icons/fa";

export default function OtherPagesContent() {
  const [form, setForm] = useState({
    aboutus_page_description: "",
    contactus_page_description: "",
    social_description: "",
  });

  const [changed, setChanged] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setChanged(true);
  };

  const handleCancel = () => {
    setForm({
      aboutus_page_description: "",
      contactus_page_description: "",
      social_description: "",
    });
    setChanged(false);
  };

  const saveChanges = () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    console.log("Other Pages Data:", formData);

    // 👉 API CALL
    // axios.post("/api/other-pages", formData)

    setChanged(false);
  };

  return (
    <div className="card">

      {/* ABOUT PAGE */}
      <div className="section">
        <h2><FaInfoCircle /> About Page Description</h2>

        <textarea
          rows={5}
          placeholder="Enter about page description"
          value={form.aboutus_page_description}
          onChange={(e) =>
            handleChange("aboutus_page_description", e.target.value)
          }
        />
      </div>

      {/* CONTACT PAGE */}
      <div className="section">
        <h2><FaAddressBook /> Contact Page Description</h2>

        <textarea
          rows={5}
          placeholder="Enter contact page description"
          value={form.contactus_page_description}
          onChange={(e) =>
            handleChange("contactus_page_description", e.target.value)
          }
        />
      </div>

      {/* SOCIAL */}
      <div className="section">
        <h2><FaGlobe /> Social Description</h2>

        <textarea
          rows={5}
          placeholder="Enter social description"
          value={form.social_description}
          onChange={(e) =>
            handleChange("social_description", e.target.value)
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