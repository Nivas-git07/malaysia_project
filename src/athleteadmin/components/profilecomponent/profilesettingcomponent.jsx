import React from "react";
// import "./athlete-profile.css";

import { FaCamera, FaUserCircle } from "react-icons/fa";

export default function ProfileSettings() {
  return (
    <div className="athleteProfile__page">

      {/* HEADER */}
      <div className="athleteProfile__header">
        <p className="athleteProfile__smallTitle">ACCOUNT MANAGEMENT</p>
        <h1 className="athleteProfile__title">Profile Settings</h1>
      </div>

      <div className="athleteProfile__layout">

        {/* LEFT CARD */}
        <div className="athleteProfile__card">

          <div className="athleteProfile__imageWrapper">
            <FaUserCircle className="athleteProfile__image" />
            <div className="athleteProfile__cameraIcon">
              <FaCamera />
            </div>
          </div>

          <h3 className="athleteProfile__name">Marcus Finswell</h3>
          <p className="athleteProfile__email">marcus.v@mfsa-pro.com</p>

          <button className="athleteProfile__changeBtn">
            Change Image
          </button>

          <div className="athleteProfile__meta">

            <div className="athleteProfile__metaItem">
              <p className="athleteProfile__label">ACCOUNT STATUS</p>
              <span className="athleteProfile__status">ACTIVE</span>
            </div>

            <div className="athleteProfile__metaItem">
              <p className="athleteProfile__label">DIVISION</p>
              <span className="athleteProfile__value">MASTER ELITE III</span>
            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="athleteProfile__form">

          <h3 className="athleteProfile__formTitle">
            Personal Details
          </h3>

          <div className="athleteProfile__formGrid">

            <div className="athleteProfile__group">
              <label>FULL NAME</label>
              <input type="text" value="Marcus Finswell" readOnly />
            </div>

            <div className="athleteProfile__group">
              <label>EMAIL ADDRESS</label>
              <input type="text" value="marcus.v@mfsa-pro.com" readOnly />
            </div>

            <div className="athleteProfile__group">
              <label>PHONE NUMBER</label>
              <input type="text" value="+356 9901 2345" readOnly />
            </div>

            <div className="athleteProfile__group">
              <label>NATIONALITY</label>
              <select>
                <option>Malta</option>
              </select>
            </div>

            <div className="athleteProfile__group athleteProfile__full">
              <label>RESIDENTIAL ADDRESS</label>
              <textarea>
42 Fin St, Sliema SLM 1024, Malta
              </textarea>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}