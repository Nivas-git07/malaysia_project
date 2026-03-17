import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import "../../style/Settings.css";
import Navbar from "../navbar/nav";

function Settings() {
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [firstName, setFirstName] = useState("Jane Cooper");
  const [lastName, setLastName] = useState("Wade Warren");
  const [phone, setPhone] = useState("252.555.0126");
  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
      <div className="personalTitle">PERSONAL INFORMATION</div>

      <div className="profileContainer">
        {/* {editMode && <div className="editBanner">Editing mode enabled</div>} */}
        {showPopup && <div className="editPopup">Editing enabled</div>}
        <div
          className="profileEditIcon"
          onClick={() => {
            setEditMode(true);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 1500); // auto hide
          }}
        >
          <FiEdit2 size={14} />
        </div>

        <div className="avatarBox">
          <img src="https://i.pravatar.cc/100" alt="profile" />
        </div>

        <div className="formGrid">
          <div className="formGroup">
            <label>First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              readOnly={!editMode}
              className={!editMode ? "readOnlyField" : ""}
            />
          </div>

          <div className="formGroup">
            <label>Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

            <select value="Malaysia" disabled className="readOnlyField">
              <option value="Malaysia">Malaysia</option>
            </select>
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
       </div>
    </>
  );
}

export default Settings;
