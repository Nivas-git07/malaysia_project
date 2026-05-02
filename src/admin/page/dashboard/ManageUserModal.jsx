import React, { useState, useEffect } from "react";
import "../../style/dashboard/ManageUserModel.css";

export default function ManageUserModal({ close, data }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name || "",
        email: data.email || "",
        role: data.role || "User",
        status: data.status || "Active",
      });
    }
  }, [data]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("User Data:", form);
    alert("User saved successfully!");
    close();
  };

  return (
    <div className="mu-modal-overlay" onClick={close}>
      <div className="mu-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="mu-modal-header">
          <h3>CREATE / EDIT USER</h3>
          <span className="mu-modal-close" onClick={close}>
            ✕
          </span>
        </div>

        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />

        <label>Role</label>
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="Admin">Admin</option>
          <option value="Coach">Coach</option>
          <option value="User">User</option>
        </select>

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <div className="mu-modal-actions">
          <button className="mu-modal-cancel" onClick={close}>
            Cancel
          </button>

          <button className="mu-modal-save" onClick={handleSubmit}>
            Save User
          </button>
        </div>
      </div>
    </div>
  );
}
