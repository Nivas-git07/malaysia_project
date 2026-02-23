import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import "../../style/Settings.css";
import Navbar from "../navbar/nav";

function Settings() {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <Navbar />
      <div className="personalTitle">PERSONAL INFORMATION</div>
    

      <div className="profileContainer">
          {editMode && <div className="editBanner">Editing mode enabled</div>}
        <div className="profileEditIcon" onClick={() => setEditMode(true)}>
          <FiEdit2 size={14} />
        </div>

        <div className="avatarBox">
          <img src="https://i.pravatar.cc/100" alt="profile" />
        </div>

        <div className="formGrid">
          <div className="formGroup">
            <label>First Name</label>
            <input
              value="Jane Cooper"
              readOnly={!editMode}
              className={!editMode ? "readOnlyField" : ""}
            />
          </div>

          <div className="formGroup">
            <label>Last Name</label>
            <input
              value="Wade Warren"
              readOnly={!editMode}
              className={!editMode ? "readOnlyField" : ""}
            />
          </div>

          <div className="formGroup">
            <label>Email</label>
            <input
              value="michelle.rivera@example.com"
              readOnly
              className="readOnlyField"
            />
          </div>

          <div className="formGroup">
            <label>Phone number</label>
            <input
              value="252.555.0126"
              readOnly={!editMode}
              className={!editMode ? "readOnlyField" : ""}
            />
          </div>

          <div className="formGroup">
            <label>Date of Birth</label>
            <input value="02 / 29 / 2002" readOnly className="readOnlyField" />
          </div>

          <div className="formGroup">
            <label>State</label>

            <select
              value="Malaysia"
              disabled
              className="readOnlyField"
            ></select>
          </div>
        </div>

        {editMode && (
          <div className="buttonRow">
            <button className="discardBtn" onClick={() => setEditMode(false)}>
              Discard Changes
            </button>
            <button className="saveBtn" onClick={() => setEditMode(false)}>
              Save changes
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;
