import Navbar from "../navbar/nav";
import { FiX, FiPlus } from "react-icons/fi";
import { useState } from "react";
import Preview from "../hook/preview/preview";

export default function About() {

  const [missions, setMissions] = useState([
    "Promoting finswimming excellence across Malaysia through structured training.",
    "Establishing world-class competition standards for national events.",
    "Supporting athletes with scholarships and high-performance equipment.",
    "Expanding the sport to include youth development programs in schools."
  ]);

  /* ADD POINT */
  const addPoint = () => {
    setMissions([...missions, ""]);
  };

  /* REMOVE POINT */
  const removePoint = (index) => {
    const updated = missions.filter((_, i) => i !== index);
    setMissions(updated);
  };

  /* UPDATE TEXT */
  const updatePoint = (index, value) => {
    const updated = [...missions];
    updated[index] = value;
    setMissions(updated);
  };

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">

        <div className="mfsaAboutAdminX-container">

          {/* HEADER */}
          <div className="mfsaAboutAdminX-header">
            <h2>Edit About Content</h2>
            <p>
              Modify your about, vision, and mission details to keep members updated.
            </p>
          </div>

          <div className="mfsaAboutAdminX-card">

            {/* ABOUT */}
            <div className="mfsaAboutAdminX-group">
              <label>About MFSA</label>
              <textarea placeholder="Enter detailed information..." />
            </div>

            {/* VISION */}
            <div className="mfsaAboutAdminX-group">
              <label>Our Vision</label>
              <textarea placeholder="Our vision..." />
            </div>

            {/* MISSION */}
            <div className="mfsaAboutAdminX-group">

              <div className="mfsaAboutAdminX-missionHeader">
                <label>Our Mission Points</label>
                <span>{missions.length} Points Listed</span>
              </div>

              <div className="mfsaAboutAdminX-missionList">

                {missions.map((item, i) => (
                  <div className="mfsaAboutAdminX-missionItem" key={i}>

                    {/* INPUT INSTEAD OF TEXT */}
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updatePoint(i, e.target.value)}
                      className="mfsaAboutAdminX-input"
                      placeholder="Enter mission point..."
                    />

                    <FiX onClick={() => removePoint(i)} />

                  </div>
                ))}

              </div>

              <button
                className="mfsaAboutAdminX-addBtn"
                onClick={addPoint}
              >
                <FiPlus /> Add Point
              </button>

            </div>

            {/* ACTIONS */}
            <div className="mfsaAboutAdminX-actions">
              <button className="mfsaAboutAdminX-btnOutline">Cancel</button>
              <button className="mfsaAboutAdminX-btnPrimary">Save Changes</button>
            </div>

          </div>

        </div>

        <Preview />

      </div>
    </>
  );
}