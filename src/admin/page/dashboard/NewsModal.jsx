import React, { useState, useEffect } from "react";
import "../../style/dashboard/NewsModal.css";
import { postnews, editnews, delete_news } from "../../api/news_api";
import { useQueryClient } from "@tanstack/react-query";

export default function NewsModal({ close, data }) {
  const queryClient = useQueryClient();

  const newsData = Array.isArray(data) ? data[0] : data;

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: null,
    video: null,
    visibility: "PUBLIC",
    status: "DRAFT",
  });

  /* =========================
      PREVIEW STATES
  ========================= */
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  /* =========================
      INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* =========================
      IMAGE CHANGE
  ========================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      image: file,
    });

    setImagePreview(URL.createObjectURL(file));
  };

  /* =========================
      VIDEO CHANGE
  ========================= */
  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      video: file,
    });

    setVideoPreview(URL.createObjectURL(file));
  };

  /* =========================
      REMOVE IMAGE
  ========================= */
  const removeImage = () => {
    setForm({
      ...form,
      image: null,
    });

    setImagePreview(null);
  };

  /* =========================
      REMOVE VIDEO
  ========================= */
  const removeVideo = () => {
    setForm({
      ...form,
      video: null,
    });

    setVideoPreview(null);
  };

  /* =========================
      SUBMIT
  ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("content", form.content);
    formData.append("visibility", form.visibility);
    formData.append("status", form.status);

    /* IMAGE */
    if (form.image) {
      formData.append("image", form.image);
    }

    /* VIDEO */
    if (form.video) {
      formData.append("video", form.video);
    }

    const request = newsData?.id
      ? editnews(newsData.id, formData)
      : postnews(formData);

    request
      .then(() => {
        alert(
          newsData ? "News updated successfully!" : "News posted successfully!",
        );

        queryClient.invalidateQueries(["news"]);
        close();
      })
      .catch((e) => {
        console.error(e);
        alert("Something went wrong.");
      });
  };

  /* =========================
      EDIT DATA
  ========================= */
  useEffect(() => {
    if (newsData) {
      setForm({
        title: newsData.title || "",
        description: newsData.description || "",
        content: newsData.content || "",
        image: null,
        video: null,
        visibility: newsData.visibility || "PUBLIC",
        status: newsData.status || "DRAFT",
      });

      /* EXISTING IMAGE */
      if (newsData.image) {
        setImagePreview(newsData.image);
      }

      /* EXISTING VIDEO */
      if (newsData.video) {
        setVideoPreview(newsData.video);
      }
    }
  }, [newsData]);

  /* =========================
      BODY LOCK
  ========================= */
  useEffect(() => {
    document.body.classList.add("modal-open");

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, []);

  return (
    <div className="modalOverlay" onClick={close}>
      <div className="newsModal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="modalHeader">
          <h3>CREATE / EDIT NEWS</h3>
          <span onClick={close}>✕</span>
        </div>

        {/* TITLE */}
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          placeholder="Enter news title"
          onChange={handleChange}
        />

        {/* DESCRIPTION */}
        <label>Show description</label>
        <textarea
          name="description"
          value={form.description}
          placeholder="Enter a short summary..."
          onChange={handleChange}
        />

        {/* CONTENT */}
        <label>Full Content</label>
        <textarea
          name="content"
          value={form.content}
          placeholder="Enter full content..."
          onChange={handleChange}
        />

        {/* IMAGE */}
        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* IMAGE PREVIEW */}
      {imagePreview && (
  <div className="previewContainer">
    <img
      src={imagePreview}
      alt="preview"
      className="previewImage"
    />

    <button
      type="button"
      className="removePreviewBtn"
      onClick={removeImage}
    >
      Remove Image
    </button>
  </div>
)}

        {/* VIDEO */}
        <label>Upload Video</label>
        <input type="file" accept="video/*" onChange={handleVideoChange} />

        {/* VIDEO PREVIEW */}
        {videoPreview && (
          <div className="previewContainer">
            <video className="previewVideo" controls preload="metadata">
              <source src={videoPreview} type="video/mp4" />
            </video>

            <button
              type="button"
              className="removePreviewBtn"
              onClick={removeVideo}
            >
              Remove Video
            </button>
          </div>
        )}

        {/* VISIBILITY */}
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

        {/* STATUS */}
        <label>Status</label>

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="DRAFT">Save as Draft</option>
          <option value="PUBLISHED">Publish</option>
        </select>

        {/* ACTIONS */}
        <div className="modalActions">
          {data ? (
            <button
              type="button"
              className="cancelBtn"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this news?")
                ) {
                  delete_news(newsData.id)
                    .then((res) => {
                      if (res?.status === 200 || res?.status === 204) {
                        alert("News deleted successfully!");

                        queryClient.invalidateQueries(["news"]);

                        close();
                      } else {
                        throw new Error("Delete failed");
                      }
                    })
                    .catch((e) => {
                      console.error(e?.response?.data || e);

                      alert("Failed to delete news. Please try again.");
                    });
                }
              }}
            >
              Delete News
            </button>
          ) : (
            <button className="cancelBtn" onClick={close}>
              Cancel
            </button>
          )}

          <button className="savesBtn" onClick={handleSubmit}>
            Save News
          </button>
        </div>
      </div>
    </div>
  );
}
