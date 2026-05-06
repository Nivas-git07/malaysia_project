import { useState, useEffect } from "react";
import { access_permission, get_staff_permission } from "../api/auth_api";

function PermissionModal({ staff, onClose }) {
  const [permissions, setPermissions] = useState({
    nc: false,
    cu: false,
    ec: false,
    gc: false,
    tm: false,
    ma: false,
    arc: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const staffId = staff?.user || staff?.id;
  console.log(staffId)

  /* 🔥 FETCH EXISTING PERMISSIONS */
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        if (!staffId) return;

        const res = await get_staff_permission(staffId);

        const data = res?.data || {};

        setPermissions({
          nc: data.nc ?? false,
          cu: data.cu ?? false,
          ec: data.ec ?? false,
          gc: data.gc ?? false,
          tm: data.tm ?? false,
          ma: data.ma ?? false,
          arc: data.arc ?? false,
        });
      } catch (err) {
        console.error("Permission fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [staffId]);

  /* TOGGLE */
  const handleToggle = (key) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* SAVE */
  const handleSave = async () => {
    try {
      if (!staffId) {
        alert("Invalid staff ID ❌");
        return;
      }

      setSaving(true);

      const res = await access_permission(staffId, permissions);

      if (res.status === 200 || res.status === 201) {
        alert("Permissions Updated ✅");
        onClose();
      }
    } catch (err) {
      console.error(err?.response?.data || err);
      alert("Failed ❌");
    } finally {
      setSaving(false);
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
          <span onClick={onClose} className="closeBtn">×</span>
        </div>

        {/* USER */}
        <div className="mfsaUserRow">
          <span>{staff?.staff_email_id}</span>
          <span className="statusActive">ACTIVE</span>
        </div>

        {/* 🔥 LOADING STATE */}
        {loading ? (
          <div className="mfsaPermissionLoading">
            Loading permissions...
          </div>
        ) : (
          <>
            {/* CONTENT */}
            <div className="mfsaPermissionSection">
              <p className="sectionTitle">CONTENT MANAGEMENT</p>

              <PermissionItem
                label="News Creation"
                checked={permissions.nc}
                onChange={() => handleToggle("nc")}
              />

              <PermissionItem
                label="Content Update"
                checked={permissions.cu}
                onChange={() => handleToggle("cu")}
              />
            </div>

            <div className="mfsaPermissionSection">
              <p className="sectionTitle">EVENT & MEDIA</p>

              <PermissionItem
                label="Event Creation"
                checked={permissions.ec}
                onChange={() => handleToggle("ec")}
              />

              <PermissionItem
                label="Gallery Creation"
                checked={permissions.gc}
                onChange={() => handleToggle("gc")}
              />
            </div>

            <div className="mfsaPermissionSection">
              <p className="sectionTitle">SYSTEM OPERATIONS</p>

              <PermissionItem
                label="Ticket Management"
                checked={permissions.tm}
                onChange={() => handleToggle("tm")}
              />

              <PermissionItem
                label="Membership Approval"
                checked={permissions.ma}
                onChange={() => handleToggle("ma")}
              />

              <PermissionItem
                label="Athlete Record Creation"
                checked={permissions.arc}
                onChange={() => handleToggle("arc")}
              />
            </div>
          </>
        )}

        {/* FOOTER */}
        <div className="mfsaModalActions">
          <button className="cancelBtn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="savessBtn"
            onClick={handleSave}
            disabled={saving || loading}
          >
            {saving ? "Saving..." : "Save Permissions"}
          </button>
        </div>
      </div>
    </div>
  );
}


function PermissionItem({ label, checked, onChange }) {
  return (
    <div className="permRow">
      <span>{label}</span>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default PermissionModal;