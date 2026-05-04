import React, { useEffect, useState } from "react";
import { FaUsers, FaBuilding, FaRunning } from "react-icons/fa";
import { post_content, get_content } from "../../api/auth_api";

export default function AssociationContent() {
  const [form, setForm] = useState({
    associations_page_headline: "",
    associations_page_description: "",

    clubs_page_headline: "",
    clubs_page_description: "",

    athletes_page_headline: "",
    athletes_page_description: "",
  });

  const [initialData, setInitialData] = useState(null);
  const [changed, setChanged] = useState(false);

  /* =========================
     FETCH DATA
  ========================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get_content("association"); // ✅ FIXED
        const data = res.data;

        const mapped = {
          associations_page_headline: data.associations_page_headline || "",
          associations_page_description:
            data.associations_page_description || "",

          clubs_page_headline: data.clubs_page_headline || "",
          clubs_page_description: data.clubs_page_description || "",

          athletes_page_headline: data.athletes_page_headline || "",
          athletes_page_description: data.athletes_page_description || "",
        };

        setForm(mapped);
        setInitialData(mapped); // ✅ important for cancel
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  /* =========================
     CHANGE
  ========================== */
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setChanged(true);
  };

  /* =========================
     CANCEL (restore backend)
  ========================== */
  const handleCancel = () => {
    if (!initialData) return;
    setForm(initialData);
    setChanged(false);
  };

  /* =========================
     SAVE
  ========================== */
  const saveChanges = async () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        formData.append(key, form[key]);
      }
    });

    try {
      const res = await post_content(formData);
      console.log(res.data);

      alert("✅ Association content updated");

      setInitialData(form); // ✅ update base
      setChanged(false);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update");
    }
  };

  return (
    <div className="card">

      {/* ASSOCIATIONS */}
      <div className="section">
        <h2><FaUsers /> Associations Page</h2>

        <label>Headline</label>
        <input
          value={form.associations_page_headline}
          onChange={(e) =>
            handleChange("associations_page_headline", e.target.value)
          }
        />

        <label>Description</label>
        <textarea
          rows={4}
          value={form.associations_page_description}
          onChange={(e) =>
            handleChange("associations_page_description", e.target.value)
          }
        />
      </div>

      {/* CLUBS */}
      <div className="section">
        <h2><FaBuilding /> Clubs Page</h2>

        <label>Headline</label>
        <input
          value={form.clubs_page_headline}
          onChange={(e) =>
            handleChange("clubs_page_headline", e.target.value)
          }
        />

        <label>Description</label>
        <textarea
          rows={4}
          value={form.clubs_page_description}
          onChange={(e) =>
            handleChange("clubs_page_description", e.target.value)
          }
        />
      </div>

      {/* ATHLETES (NEW) */}
      <div className="section">
        <h2><FaRunning /> Athletes Page</h2>

        <label>Headline</label>
        <input
          value={form.athletes_page_headline}
          onChange={(e) =>
            handleChange("athletes_page_headline", e.target.value)
          }
        />

        <label>Description</label>
        <textarea
          rows={4}
          value={form.athletes_page_description}
          onChange={(e) =>
            handleChange("athletes_page_description", e.target.value)
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
            disabled={!changed}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}