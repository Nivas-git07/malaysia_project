import { useState } from "react";
import { access_permission } from "../api/auth_api";
function PermissionModal({ staff, onClose }) {
  console.log(staff);
  const [permissions, setPermissions] = useState({
    nc: false,
    cu: false,
    ec: false,
    gc: false,
    tm: false,
    ma: false,
    arc: false,
  });

  const handleToggle = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

 const handleSave = async () => {
  try {
    const staffId = staff?.user || staff?.id;

    if (!staffId) {
      alert("Invalid staff ID ❌");
      return;
    }

    const res = await access_permission(staffId, permissions);

    if (res.status === 200 || res.status === 201) {
      alert("Permissions Updated ✅");
      onClose();
    }
  } catch (err) {
    console.error(err?.response?.data || err);
    alert("Failed ❌");
  }
};
  return (
    <div className="mfsaModalOverlay">
      <div className="mfsaModalCard">
        {/* HEADER */}
        <div className="mfsaModalHeader">
          <div>
            <h3>Assign Permissions</h3>
            <p>Control staff access to system features</p>
          </div>
          <span onClick={onClose} className="closeBtn">
            ×
          </span>
        </div>

        {/* USER */}
        <div className="mfsaUserRow">
          <span>{staff.staff_email_id}</span>
          <span className="statusActive">ACTIVE</span>
        </div>

        {/* CONTENT */}
        <div className="mfsaPermissionSection">
          <p className="sectionTitle">CONTENT MANAGEMENT</p>

          <div className="permRow">
            <span>News Creation</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={permissions.nc}
                onChange={() => handleToggle("nc")}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="permRow">
            <span>Content Update</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={permissions.cu}
                onChange={() => handleToggle("cu")}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="mfsaPermissionSection">
          <p className="sectionTitle">EVENT & MEDIA</p>

          <div className="permRow">
            <span>Event Creation</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={permissions.ec}
                onChange={() => handleToggle("ec")}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="permRow">
            <span>Gallery Creation</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={permissions.gc}
                onChange={() => handleToggle("gc")}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="mfsaPermissionSection">
          <p className="sectionTitle">SYSTEM OPERATIONS</p>

          <div className="permRow">
            <span>Ticket Management</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={permissions.tm}
                onChange={() => handleToggle("tm")}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="permRow">
            <span>Membership Approval</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={permissions.ma}
                onChange={() => handleToggle("ma")}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="permRow">
            <span>Athlete Record Creation</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={permissions.arc}
                onChange={() => handleToggle("arc")}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mfsaModalActions">
          <button className="cancelBtn" onClick={onClose}>
            Cancel
          </button>
          <button className="savessBtn" onClick={handleSave}>
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );
}

export default PermissionModal;
