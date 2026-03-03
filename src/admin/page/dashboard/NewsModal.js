import React, { useState, useEffect } from "react";
import "../../style/dashboard/NewsModal.css";
import { postnews } from "../../api/news_api";

export default function NewsModal({ close, data }) {

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
    visibility: "PUBLIC",
    status: "DRAFT"
  });

  /* ================= FORM HANDLERS ================= */

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

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("visibility", form.visibility);
      formData.append("status", form.status);

      if (form.image) {
        formData.append("image", form.image);
      }

      postnews(formData)
        .then(() => {
          alert("News posted successfully!");
          close();
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to post news. Please try again.");
        });

    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  /* ================= PREFILL EDIT DATA ================= */

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title || "",
        description: data.description || "",
        content: data.content || "",
        image: null,
        visibility: data.visibility || "PUBLIC",
        status: data.status || "DRAFT"
      });
    }
  }, [data]);

  /* ================= HIDE SIDENAV + LOCK SCROLL ================= */

  useEffect(() => {
    // Add class to body when modal opens
    document.body.classList.add("modal-open");

    return () => {
      // Remove when modal closes
      document.body.classList.remove("modal-open");
    };
  }, []);

  /* ================= RENDER ================= */

  return (
    <div
      className="modalOverlay"
      onClick={close}   // Close when clicking background
    >

      <div
        className="newsModal"
        onClick={(e) => e.stopPropagation()}  // Prevent close when clicking inside
      >

        <div className="modalHeader">
          <h3>CREATE / EDIT NEWS</h3>
          <span onClick={close}>✕</span>
        </div>

        <label>Title</label>
        <input
          name="title"
          value={form.title}
          placeholder="Enter news title"
          onChange={handleChange}
        />

        <label>Show description</label>
        <textarea
          name="description"
          value={form.description}
          placeholder="Enter a short summary for preview..."
          onChange={handleChange}
        />

        <label>Full Content</label>
        <textarea
          name="content"
          value={form.content}
          placeholder="Enter full news content..."
          onChange={handleChange}
        />

        <label>Upload Image</label>
        <input type="file" onChange={handleFileChange} />

        <label>Visibility level</label>
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
          <button className="cancelBtn" onClick={close}>
            Cancel
          </button>
          <button className="savesBtn" onClick={handleSubmit}>
            Save News
          </button>
        </div>

      </div>
    </div>
  );
}