import React, { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { post_content, get_content } from "../../api/auth_api";

export default function BestRecordsContent() {
  const [form, setForm] = useState({
    best_records_page_headline: "",
    best_records_page_description: "",
  });

  const [initialData, setInitialData] = useState(null); // ✅ store backend
  const [changed, setChanged] = useState(false);

  /* =========================
     FETCH DATA
  ========================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get_content("best_records");
        const data = res.data;

        const mappedData = {
          best_records_page_headline:
            data.best_records_page_headline || "",
          best_records_page_description:
            data.best_records_page_description || "",
        };

        setForm(mappedData);
        setInitialData(mappedData); // ✅ save original
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  /* =========================
     CHANGE HANDLER
  ========================== */
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setChanged(true);
  };

  /* =========================
     ✅ PROPER CANCEL
  ========================== */
  const handleCancel = () => {
    if (!initialData) return;

    setForm(initialData); // 🔥 restore backend values
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

      alert("✅ Best records updated");

      setInitialData(form); // ✅ update new base
      setChanged(false);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to update");
    }
  };

  return (
    <div className="card">
      <div className="section">
        <h2>
          <FaTrophy /> Best Records Page
        </h2>

        <label>Headline</label>
        <input
          value={form.best_records_page_headline}
          onChange={(e) =>
            handleChange("best_records_page_headline", e.target.value)
          }
        />

        <label>Description</label>
        <textarea
          rows={4}
          value={form.best_records_page_description}
          onChange={(e) =>
            handleChange("best_records_page_description", e.target.value)
          }
        />
      </div>

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