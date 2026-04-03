import Navbar from "../navbar/nav";
import { FiX, FiPlus } from "react-icons/fi";
import { useState } from "react";
import Preview from "../../hook/preview/preview";
import { getabout } from "../../api/about_api";
import { useQuery } from "@tanstack/react-query";
import { editabout } from "../../api/about_api";
export default function About() {
  const { data: aboutData, isLoading } = useQuery({
    queryKey: ["aboutContent"],
    queryFn: getabout,
  });

  const aboutInfo = aboutData?.data;

  const [about, setAbout] = useState("");
  const [vision, setVision] = useState("");
  const [missions, setMissions] = useState([]);
  const [initialized, setInitialized] = useState(false);

  if (!initialized && aboutInfo) {
    setAbout(aboutInfo.about || "");
    setVision(aboutInfo.vision || "");
    const missionArray = aboutInfo.mission
      ? aboutInfo.mission
          .split(".")
          .filter(Boolean)
          .map((m) => m.trim())
      : [];

    setMissions(missionArray);
    setInitialized(true);
  }

  const addPoint = () => {
    setMissions([...missions, ""]);
  };

  const removePoint = (index) => {
    const updated = missions.filter((_, i) => i !== index);
    setMissions(updated);
  };

  const updatePoint = (index, value) => {
    const updated = [...missions];
    updated[index] = value;
    setMissions(updated);
  };

  const handleSave = () => {
    const payload = {
      about,
      vision,
      mission: missions.join(". "),
    };

    console.log("SAVE DATA:", payload);
    const response = editabout(payload);
    console.log("API Response:", response);


    // 👉 Call your API here
    // updateAbout(payload)
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
              Modify your about, vision, and mission details to keep members
              updated.
            </p>
          </div>

          {/* CARD */}
          <div className="mfsaAboutAdminX-card">
            {/* ABOUT */}
            <div className="mfsaAboutAdminX-group">
              <label>About MFSA</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Enter detailed information..."
              />
              <span className="mfsaAboutAdminX-hint">
                This section appears at the top of the public about page.
              </span>
            </div>

            {/* VISION */}
            <div className="mfsaAboutAdminX-group">
              <label>Our Vision</label>
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="Our vision..."
              />
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

              <button className="mfsaAboutAdminX-addBtn" onClick={addPoint}>
                <FiPlus /> Add Point
              </button>
            </div>

            {/* ACTIONS */}
            <div className="mfsaAboutAdminX-actions">
              <button className="mfsaAboutAdminX-btnOutline">Cancel</button>

              <button
                className="mfsaAboutAdminX-btnPrimary"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* PREVIEW SECTION */}
        <Preview />
      </div>
    </>
  );
}
