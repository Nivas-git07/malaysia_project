import React, { useState } from "react";
import { FaLayerGroup, FaImage, FaStar } from "react-icons/fa";
import { post_content } from "../../api/auth_api";
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

    affiliate: createPlan(),
    allied: createPlan(),
    individual: createPlan(),
    coach: createPlan(),
  });

  const [changed, setChanged] = useState(false);

  const updateField = (section, key, value) => {
    setForm({
      ...form,
      [section]: {
        ...form[section],
        [key]: value,
      },
    });
    setChanged(true);
  };

  const renderBlock = (title, key, count) => (
    <div className="mfsaMembership-card">
      <h2>{title}</h2>

      {[...Array(count)].map((_, i) => {
        const index = i + 1;
        return (
          <div className="mfsaMembership-row" key={index}>
            <input
              placeholder={`Title ${index}`}
              value={form[key][`h${index}`]}
              onChange={(e) =>
                updateField(key, `h${index}`, e.target.value)
              }
            />

            <textarea
              placeholder={`Description ${index}`}
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

  const renderPlan = (title, key) => (
    <div className="mfsaMembership-card">
      <h2><FaLayerGroup /> {title}</h2>

      {[1, 2, 3, 4].map((i) => (
        <div className="mfsaMembership-row" key={i}>
          <input
            placeholder={`Feature ${i}`}
            value={form[key][`h${i}`]}
            onChange={(e) =>
              updateField(key, `h${i}`, e.target.value)
            }
          />

          <textarea
            placeholder={`Description ${i}`}
            value={form[key][`p${i}`]}
            onChange={(e) =>
              updateField(key, `p${i}`, e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );

  const saveData = () => {
    console.log("FINAL DATA:", form);
    setChanged(false);
  };

  return (
    <div className="mfsaMembership-container">

      {/* DESCRIPTION */}
      <div className="mfsaMembership-card">
        <h2>Membership Page</h2>

        <textarea
          placeholder="Membership page description"
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
            onChange={(e) => {
              setForm({ ...form, image: e.target.files[0] });
              setChanged(true);
            }}
          />
        </div>
      </div>

      {/* WHY JOIN */}
      {renderBlock("Why Join MFSA", "whyJoin", 4)}

      {/* BENEFITS */}
      {renderBlock("Membership Benefits", "benefits", 6)}

      {/* HOW TO BECOME */}
      {renderPlan("Affiliate Plan", "affiliate")}

      {/* MEMBERSHIP PLANS */}
      {renderPlan("Allied Plan", "allied")}
      {renderPlan("Individual Plan", "individual")}
      {renderPlan("Coach Plan", "coach")}

      {/* STICKY BAR */}
          <div className="sticky-bar">
        <span className="status">
          {changed ? "● Unsaved changes" : "All changes saved"}
        </span>

        <div className="actions">
          <button className="cancel-btn" >
            Cancel
          </button>

          <button
            className="save-btn"
         
            disabled={!changed}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}