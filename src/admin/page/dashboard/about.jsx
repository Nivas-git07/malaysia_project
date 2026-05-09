import Navbar from "../navbar/nav";
import { FiX, FiPlus } from "react-icons/fi";
import { useState } from "react";
import Preview from "../../hook/preview/preview";
import { getabout } from "../../api/about_api";
import { useQuery } from "@tanstack/react-query";
import { editabout } from "../../api/about_api";
import { useNavigate } from "react-router-dom";
// import Aboutpreview from "../../previewtemplate/aboutpreview";

import { post_about_preview } from "../../api/preview_api";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
export default function About() {
  const navigate = useNavigate();
  const {
    data: aboutData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["aboutContent"],
    queryFn: getabout,
    retry: false,
  });

  const aboutInfo = aboutData?.data;

  const [about, setAbout] = useState("");
  const [vision, setVision] = useState("");
  const [missions, setMissions] = useState([]);
  const [initialized, setInitialized] = useState(false);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={2} />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load about content"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

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

  const preview_post = () => {
    try {
      const response = post_about_preview(about, missions, vision);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

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
    editabout(payload)
      .then(() => {
        alert("About content updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update about content. Please try again.");
      });
  };

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="mfsaAboutAdminX-container">
          <div className="mfsaAboutAdminX-header">
            <h2>Edit About Content</h2>
            <p>
              Modify your about, vision, and mission details to keep members
              updated.
            </p>
          </div>

          <div className="mfsaAboutAdminX-card">
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

            <div className="mfsaAboutAdminX-group">
              <label>Our Vision</label>
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="Our vision..."
              />
            </div>

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

        {/* <div className="mfsaPreviewX-section">
          <div className="mfsaPreviewX-card">
            <div className="mfsaPreviewX-content">
              <span className="mfsaPreviewX-badge">PREVIEW MODE</span>

              <h3>Need a Live Preview?</h3>

              <p>
                View how your changes will appear to association members before
                hitting publish.
              </p>

              <button
                className="mfsaPreviewX-btn"
                onClick={() => {
                  preview_post(); 
                  navigate("/aboutpreview");
                }}
              >
                Open Preview Page 
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
