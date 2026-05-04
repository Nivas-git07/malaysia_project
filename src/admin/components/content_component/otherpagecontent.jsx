import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaAddressBook, FaGlobe } from "react-icons/fa";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { post_content, get_content } from "../../api/auth_api";

export default function OtherPagesContent() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    aboutus_page_description: "",
    contactus_page_description: "",
    social_description: "",
  });

  const [changed, setChanged] = useState(false);

  /* =========================
     GET CONTENT (others)
  ========================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["others-content"],
    queryFn: () => get_content("others"),
  });

  /* =========================
     PREFILL FORM
  ========================= */
  useEffect(() => {
    if (data?.data) {
      const d = data.data;

      setForm({
        aboutus_page_description: d.aboutus_page_description || "",
        contactus_page_description: d.contactus_page_description || "",
        social_description: d.social_description || "",
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
      alert("✅ Content updated successfully");
      setChanged(false);
      queryClient.invalidateQueries(["others-content"]);
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
        aboutus_page_description: d.aboutus_page_description || "",
        contactus_page_description: d.contactus_page_description || "",
        social_description: d.social_description || "",
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
  if (isLoading) return <p>Loading content...</p>;
  if (isError) return <p>Error loading content</p>;

  /* =========================
     UI
  ========================= */
  return (
    <div className="card">
      {/* ABOUT */}
      <div className="section">
        <h2>
          <FaInfoCircle /> About Page Description
        </h2>

        <textarea
          rows={5}
          value={form.aboutus_page_description}
          onChange={(e) =>
            handleChange("aboutus_page_description", e.target.value)
          }
        />
      </div>

      {/* CONTACT */}
      <div className="section">
        <h2>
          <FaAddressBook /> Contact Page Description
        </h2>

        <textarea
          rows={5}
          value={form.contactus_page_description}
          onChange={(e) =>
            handleChange("contactus_page_description", e.target.value)
          }
        />
      </div>

      {/* SOCIAL */}
      <div className="section">
        <h2>
          <FaGlobe /> Social Description
        </h2>

        <textarea
          rows={5}
          value={form.social_description}
          onChange={(e) =>
            handleChange("social_description", e.target.value)
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