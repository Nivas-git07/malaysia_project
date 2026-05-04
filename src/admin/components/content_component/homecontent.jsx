import React, { useState, useEffect } from "react";
import { FaBars, FaImage, FaInfoCircle } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { post_content, get_content } from "../../api/auth_api";

export default function HomeContent() {
  const queryClient = useQueryClient();

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

  /* =========================
     GET CONTENT (QUERY)
  ========================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["home-content"],
    queryFn: () => get_content("home"),
  });

  /* =========================
     SET DATA INTO FORM
  ========================= */
  useEffect(() => {
    if (data?.data) {
      const d = data.data;

      setForm({
        home_page_banner: null,
        home_page_description: d.home_page_description || "",
        who_we_are: d.who_we_are || "",
        who_we_are_image: null,
        our_mission: d.our_mission || "",
        our_vision: d.our_vision || "",
      });

      setPreview({
        banner: d.home_page_banner || null,
        whoImage: d.who_we_are_image || null,
      });

      setChanged(false);
    }
  }, [data]);

  /* =========================
     MUTATION (UPDATE)
  ========================= */
  const mutation = useMutation({
    mutationFn: (formData) => post_content(formData),

    onSuccess: () => {
      alert("✅ Content updated successfully");

      setChanged(false);

      // 🔥 auto refetch updated data
      queryClient.invalidateQueries(["home-content"]);
    },

    onError: (error) => {
      console.error(error);
      alert(
        error?.response?.data?.message ||
          "❌ Failed to update content"
      );
    },
  });

  /* =========================
     HANDLERS
  ========================= */

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setChanged(true);
  };

  const handleFileChange = (key, file) => {
    if (!file) return;

    setForm((prev) => ({ ...prev, [key]: file }));
    setChanged(true);

    const url = URL.createObjectURL(file);

    if (key === "home_page_banner") {
      setPreview((prev) => ({ ...prev, banner: url }));
    }

    if (key === "who_we_are_image") {
      setPreview((prev) => ({ ...prev, whoImage: url }));
    }
  };

  const saveChanges = () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      const value = form[key];

      if (value !== null && value !== "") {
        formData.append(key, value);
      }
    });

    // 🔍 Debug
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    mutation.mutate(formData);
  };

  const handleCancel = () => {
    if (data?.data) {
      const d = data.data;

      setForm({
        home_page_banner: null,
        home_page_description: d.home_page_description || "",
        who_we_are: d.who_we_are || "",
        who_we_are_image: null,
        our_mission: d.our_mission || "",
        our_vision: d.our_vision || "",
      });

      setPreview({
        banner: d.home_page_banner || null,
        whoImage: d.who_we_are_image || null,
      });
    }

    setChanged(false);
  };

  /* =========================
     UI STATES
  ========================= */

  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Error loading content</p>;

  /* =========================
     UI
  ========================= */

  return (
    <div className="card">
      {/* HERO BANNER */}
      <div className="section">
        <h2>
          <FaBars /> Home Banner (Video)
        </h2>

        <input
          type="file"
          accept="video/*"
          onChange={(e) =>
            handleFileChange("home_page_banner", e.target.files[0])
          }
        />

        {preview.banner && (
          <video src={preview.banner} controls className="preview-video" />
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="section">
        <h2>
          <FaInfoCircle /> Home Banner Description
        </h2>

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
        <h2>
          <FaInfoCircle /> Who We Are
        </h2>

        <textarea
          placeholder="Enter about content"
          value={form.who_we_are}
          onChange={(e) => handleChange("who_we_are", e.target.value)}
        />
      </div>

      {/* WHO IMAGE */}
      <div className="section">
        <h2>
          <FaImage /> Who We Are Image
        </h2>

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
        <h2>
          <FaInfoCircle /> Our Mission
        </h2>

        <textarea
          value={form.our_mission}
          onChange={(e) => handleChange("our_mission", e.target.value)}
        />
      </div>

      {/* VISION */}
      <div className="section">
        <h2>
          <FaInfoCircle /> Our Vision
        </h2>

        <textarea
          value={form.our_vision}
          onChange={(e) => handleChange("our_vision", e.target.value)}
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