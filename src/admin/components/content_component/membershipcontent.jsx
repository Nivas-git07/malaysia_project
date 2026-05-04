import React, { useEffect, useState } from "react";
import { FaLayerGroup, FaImage } from "react-icons/fa";
import { post_content, get_content } from "../../api/auth_api";

const createBlock = (count) => {
  let obj = {};
  for (let i = 1; i <= count; i++) {
    obj[`h${i}`] = "";
    obj[`p${i}`] = "";
  }
  return obj;
};

const createPlan = () => ({
  h1: "", p1: "",
  h2: "", p2: "",
  h3: "", p3: "",
  h4: "", p4: "",
});

export default function MembershipContent() {
  const [form, setForm] = useState({
    description: "",
    image: null,

    whyJoin: createBlock(4),
    benefits: createBlock(6),

    plan1: createPlan(),
    plan2: createPlan(),
    plan3: createPlan(),
    plan4: createPlan(),
  });

  const [preview, setPreview] = useState(null); // 🔥 preview image
  const [initialData, setInitialData] = useState(null); // 🔥 cancel restore
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA
  ========================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get_content("membership");
        const data = res.data;

        const mapped = {
          description: data.membership_page_description || "",
          image: null,

          whyJoin: {
            h1: data.why_join_h4_1 || "",
            p1: data.why_join_p_1 || "",
            h2: data.why_join_h4_2 || "",
            p2: data.why_join_p_2 || "",
            h3: data.why_join_h4_3 || "",
            p3: data.why_join_p_3 || "",
            h4: data.why_join_h4_4 || "",
            p4: data.why_join_p_4 || "",
          },

          benefits: {
            h1: data.benefits_1_h3 || "",
            p1: data.benefits_1_p || "",
            h2: data.benefits_2_h3 || "",
            p2: data.benefits_2_p || "",
            h3: data.benefits_3_h3 || "",
            p3: data.benefits_3_p || "",
            h4: data.benefits_4_h3 || "",
            p4: data.benefits_4_p || "",
            h5: data.benefits_5_h3 || "",
            p5: data.benefits_5_p || "",
            h6: data.benefits_6_h3 || "",
            p6: data.benefits_6_p || "",
          },

          plan1: mapPlan(data, 1),
          plan2: mapPlan(data, 2),
          plan3: mapPlan(data, 3),
          plan4: mapPlan(data, 4),
        };

        setForm(mapped);
        setInitialData(mapped);

        // 🔥 backend image preview
        if (data.membership_page_image) {
          setPreview(data.membership_page_image);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mapPlan = (data, num) => ({
    h1: data[`plan_${num}_h3_1`] || "",
    p1: data[`plan_${num}_p_1`] || "",
    h2: data[`plan_${num}_h3_2`] || "",
    p2: data[`plan_${num}_p_2`] || "",
    h3: data[`plan_${num}_h3_3`] || "",
    p3: data[`plan_${num}_p_3`] || "",
    h4: data[`plan_${num}_h3_4`] || "",
    p4: data[`plan_${num}_p_4`] || "",
  });

  /* =========================
     CHANGE HANDLER
  ========================== */
  const updateField = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    setChanged(true);
  };

  /* =========================
     IMAGE UPLOAD + PREVIEW
  ========================== */
  const handleImageChange = (file) => {
    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file)); // 🔥 preview
    setChanged(true);
  };

  /* =========================
     CANCEL (RESTORE BACKEND)
  ========================== */
  const handleCancel = () => {
    if (!initialData) return;

    setForm(initialData);
    setPreview(null); // reset preview

    // restore backend image again
    get_content("membership").then((res) => {
      if (res.data.membership_page_image) {
        setPreview(res.data.membership_page_image);
      }
    });

    setChanged(false);
  };

  /* =========================
     SAVE
  ========================== */
  const saveData = async () => {
    const formData = new FormData();

    formData.append("membership_page_description", form.description);

    if (form.image) {
      formData.append("membership_page_image", form.image);
    }

    for (let i = 1; i <= 4; i++) {
      formData.append(`why_join_h4_${i}`, form.whyJoin[`h${i}`]);
      formData.append(`why_join_p_${i}`, form.whyJoin[`p${i}`]);
    }

    for (let i = 1; i <= 6; i++) {
      formData.append(`benefits_${i}_h3`, form.benefits[`h${i}`]);
      formData.append(`benefits_${i}_p`, form.benefits[`p${i}`]);
    }

    [1, 2, 3, 4].forEach((num) => {
      const plan = form[`plan${num}`];
      for (let i = 1; i <= 4; i++) {
        formData.append(`plan_${num}_h3_${i}`, plan[`h${i}`]);
        formData.append(`plan_${num}_p_${i}`, plan[`p${i}`]);
      }
    });

    try {
      const res = await post_content(formData);
      alert("✅ Membership updated");

      setInitialData(form); // update base
      setChanged(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mfsaMembership-container">

      {/* DESCRIPTION + IMAGE */}
      <div className="mfsaMembership-card">
        <h2>Membership Page</h2>

        <textarea
          value={form.description}
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
            setChanged(true);
          }}
        />

        <div className="mfsaMembership-upload">
          <FaImage />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
        </div>

        {/* 🔥 IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mfsaMembership-preview"
          />
        )}
      </div>

      {/* CONTENT */}
      {renderBlock("Why Join MFSA", "whyJoin", 4)}
      {renderBlock("Membership Benefits", "benefits", 6)}

      {renderPlan("Affiliate Plan", "plan1")}
      {renderPlan("Allied Plan", "plan2")}
      {renderPlan("Individual Plan", "plan3")}
      {renderPlan("Coach Plan", "plan4")}

      {/* ACTION BAR */}
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
            onClick={saveData}
            disabled={!changed}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  /* =========================
     RENDER HELPERS
  ========================== */

  function renderBlock(title, key, count) {
    return (
      <div className="mfsaMembership-card">
        <h2>{title}</h2>

        {[...Array(count)].map((_, i) => {
          const index = i + 1;
          return (
            <div className="mfsaMembership-row" key={index}>
              <input
                value={form[key][`h${index}`]}
                onChange={(e) =>
                  updateField(key, `h${index}`, e.target.value)
                }
              />
              <textarea
                value={form[key][`p${index}`]}
                onChange={(e) =>
                  updateField(key, `p${index}`, e.target.value)
                }
              />
            </div>
          );
        })}
      </div>
    );
  }

  function renderPlan(title, key) {
    return (
      <div className="mfsaMembership-card">
        <h2><FaLayerGroup /> {title}</h2>

        {[1, 2, 3, 4].map((i) => (
          <div className="mfsaMembership-row" key={i}>
            <input
              value={form[key][`h${i}`]}
              onChange={(e) =>
                updateField(key, `h${i}`, e.target.value)
              }
            />
            <textarea
              value={form[key][`p${i}`]}
              onChange={(e) =>
                updateField(key, `p${i}`, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    );
  }
}