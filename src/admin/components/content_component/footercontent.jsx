import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { post_content, get_content } from "../../api/auth_api";

export default function FooterContent() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    footer_insta: "",
    footer_fb: "",
    footer_wp: "",
    footer_email: "",
    footer_phone: "",
    footer_address: "",
    footer_recognized_by: "",
    copy_rights: "",
  });

  const [changed, setChanged] = useState(false);

  /* =========================
     FETCH FOOTER CONTENT
  ========================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["footer-content"],
    queryFn: () => get_content("footer"),
  });

  /* =========================
     PREFILL FORM
  ========================= */
  useEffect(() => {
    if (data?.data) {
      const d = data.data;

      setForm({
        footer_insta: d.footer_insta || "",
        footer_fb: d.footer_fb || "",
        footer_wp: d.footer_wp || "",
        footer_email: d.footer_email || "",
        footer_phone: d.footer_phone || "",
        footer_address: d.footer_address || "",
        footer_recognized_by: d.footer_recognized_by || "",
        copy_rights: d.copy_rights || "",
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
      alert("✅ Footer updated successfully");
      setChanged(false);
      queryClient.invalidateQueries(["footer-content"]);
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
        footer_insta: d.footer_insta || "",
        footer_fb: d.footer_fb || "",
        footer_wp: d.footer_wp || "",
        footer_email: d.footer_email || "",
        footer_phone: d.footer_phone || "",
        footer_address: d.footer_address || "",
        footer_recognized_by: d.footer_recognized_by || "",
        copy_rights: d.copy_rights || "",
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
  if (isLoading) return <p>Loading footer content...</p>;
  if (isError) return <p>Error loading footer content</p>;

  /* =========================
     UI
  ========================= */
  return (
    <div className="card">
      {/* SOCIAL */}
      <div className="section">
        <h2>Social Links</h2>

        <label><FaInstagram /> Instagram</label>
        <input
          value={form.footer_insta}
          onChange={(e) => handleChange("footer_insta", e.target.value)}
        />

        <label><FaFacebookF /> Facebook</label>
        <input
          value={form.footer_fb}
          onChange={(e) => handleChange("footer_fb", e.target.value)}
        />

        <label><FaWhatsapp /> WhatsApp</label>
        <input
          value={form.footer_wp}
          onChange={(e) => handleChange("footer_wp", e.target.value)}
        />
      </div>

      {/* CONTACT */}
      <div className="section">
        <h2>Contact Information</h2>

        <label><FaEnvelope /> Email</label>
        <input
          value={form.footer_email}
          onChange={(e) => handleChange("footer_email", e.target.value)}
        />

        <label><FaPhone /> Phone</label>
        <input
          value={form.footer_phone}
          onChange={(e) => handleChange("footer_phone", e.target.value)}
        />

        <label><FaMapMarkerAlt /> Address</label>
        <textarea
          value={form.footer_address}
          onChange={(e) => handleChange("footer_address", e.target.value)}
        />
      </div>

      {/* EXTRA */}
      <div className="section">
        <h2>Footer Details</h2>

        <label>Recognized By</label>
        <textarea
          value={form.footer_recognized_by}
          onChange={(e) =>
            handleChange("footer_recognized_by", e.target.value)
          }
        />

        <label>Copyright</label>
        <input
          value={form.copy_rights}
          onChange={(e) => handleChange("copy_rights", e.target.value)}
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