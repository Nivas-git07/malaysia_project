import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import "../../style/Settings.css";
import Navbar from "../navbar/nav";
import { getProfile, updateProfile } from "../../api/profile";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Settings() {
  const [editMode, setEditMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // editable state (used ONLY in edit mode)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const queryClient = useQueryClient();

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const profile = profileData?.data || {};

  // 🔥 Handle edit click
  const handleEdit = () => {
    setEditMode(true);
    setShowPopup(true);

    // preload API values into state
    setFirstName(profile.first_name || "");
    setLastName(profile.last_name || "");
    setPhone(profile.phone_number || "");

    setTimeout(() => setShowPopup(false), 1500);
  };

  // 🔥 Save changes
  const handleSave = async () => {
    try {
      await updateProfile(firstName, phone);

      // refetch latest profile
      queryClient.invalidateQueries(["profile"]);

      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="personalTitle">PERSONAL INFORMATION</div>

        <div className="profileContainer">
          {showPopup && <div className="editPopup">Editing enabled</div>}

          {/* Edit Icon */}
          <div className="profileEditIcon" onClick={handleEdit}>
            <FiEdit2 size={14} />
          </div>

          {/* Avatar */}
          <div className="avatarBox">
            <img src="https://i.pravatar.cc/100" alt="profile" />
          </div>

          <div className="formGrid">
            {/* First Name */}
            <div className="formGroup">
              <label>First Name</label>
              <input
                value={editMode ? firstName : profile.full_name || ""}
                onChange={(e) => setFirstName(e.target.value)}
                readOnly={!editMode}
                className={!editMode ? "readOnlyField" : ""}
              />
            </div>

            {/* Last Name */}
            <div className="formGroup">
              <label>Last Name</label>
              <input
                value={editMode ? lastName : profile.last_name || ""}
                onChange={(e) => setLastName(e.target.value)}
                readOnly={!editMode}
                className={!editMode ? "readOnlyField" : ""}
              />
            </div>

            {/* Email */}
            <div className="formGroup">
              <label>Email</label>
              <input
                value={profile.email_id || ""}
                readOnly
                className="readOnlyField"
              />
            </div>

            
            <div className="formGroup">
              <label>Phone number</label>
              <input
                value={editMode ? phone : profile.phone_number || ""}
                onChange={(e) => setPhone(e.target.value)}
                readOnly={!editMode}
                className={!editMode ? "readOnlyField" : ""}
              />
            </div>

      
            <div className="formGroup">
              <label>Role</label>
              <input
                value={profile.role || ""}
                readOnly
                className="readOnlyField"
              />
            </div>

          
            <div className="formGroup">
              <label>State</label>
              <input
                value={profile.state || "Malaysia"}
                readOnly
                className="readOnlyField"
              />
            </div>
          </div>

      
          {editMode && (
            <div className="buttonRow">
              <button
                className="discardBtn"
                onClick={() => setEditMode(false)}
              >
                Discard Changes
              </button>

              <button className="saveBtn" onClick={handleSave}>
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