import React, { useState, useEffect } from "react";
import "../../style/dashboard/NewsModal.css";
import { postnews, editnews } from "../../api/news_api";
import { useQueryClient } from "@tanstack/react-query";

export default function NewsModal({ close, data }) {
  const queryClient = useQueryClient();
  const newsData = Array.isArray(data) ? data[0] : data;

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
    visibility: "PUBLIC",
    status: "DRAFT"
  });

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

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("content", form.content);
    formData.append("visibility", form.visibility);
    formData.append("status", form.status);

    if (form.image) {
      formData.append("image", form.image);
    }

    const request = newsData?.id
      ? editnews(newsData.id, formData)
      : postnews(formData);

    request
      .then(() => {
        alert(newsData ? "News updated successfully!" : "News posted successfully!");
        queryClient.invalidateQueries(["news"]);
        close();
      })
      .catch(() => {
        alert("Something went wrong.");
      });
  };

  useEffect(() => {
    if (newsData) {
      setForm({
        title: newsData.title || "",
        description: newsData.description || "",
        content: newsData.content || "",
        image: null,
        visibility: newsData.visibility || "PUBLIC",
        status: newsData.status || "DRAFT"
      });
    }
  }, [newsData]);

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="modalOverlay" onClick={close}>
      <div className="newsModal" onClick={(e) => e.stopPropagation()}>
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
          placeholder="Enter a short summary..."
          onChange={handleChange}
        />

        <label>Full Content</label>
        <textarea
          name="content"
          value={form.content}
          placeholder="Enter full content..."
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