import React, { useState, useEffect } from "react";
import { FaImages, FaInfoCircle } from "react-icons/fa";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { post_content, get_content } from "../../api/auth_api";

export default function GalleryContent() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    gallery_headline: "",
    gallery_page_description: "",
  });

  const [changed, setChanged] = useState(false);

  /* =========================
     FETCH MEDIA CONTENT
  ========================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["media-content"],
    queryFn: () => get_content("media"),
  });

  /* =========================
     PREFILL FORM
  ========================= */
  useEffect(() => {
    if (data?.data) {
      const d = data.data;

      setForm({
        gallery_headline: d.gallery_headline || "",
        gallery_page_description: d.gallery_page_description || "",
      });

      setChanged(false);
    }
  }, [data]);

  /* =========================
     MUTATION
  ========================= */
  const mutation = useMutation({
    mutationFn: (formData) => post_content(formData),

    onSuccess: () => {
      alert("✅ Gallery updated successfully");
      setChanged(false);

      queryClient.invalidateQueries(["media-content"]);
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
        gallery_headline: d.gallery_headline || "",
        gallery_page_description: d.gallery_page_description || "",
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
     STATES
  ========================= */
  if (isLoading) return <p>Loading gallery content...</p>;
  if (isError) return <p>Error loading gallery content</p>;

  /* =========================
     UI
  ========================= */
  return (
    <div className="card">
      {/* HEADLINE */}
      <div className="section">
        <h2>
          <FaImages /> Gallery Page Settings
        </h2>

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
        <h2>
          <FaInfoCircle /> Gallery Description
        </h2>

        <textarea
          rows={5}
          placeholder="Enter gallery page description"
          value={form.gallery_page_description}
          onChange={(e) =>
            handleChange("gallery_page_description", e.target.value)
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