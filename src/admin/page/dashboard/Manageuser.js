import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/ManageUser.css";
import ManageUserModal from "./ManageUserModal";

const usersData = [
  {
    id: 1,
    name: "Arjun Kumar",
    email: "arjun@gmail.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    role: "Coach",
    status: "Inactive",
  }
];

function ManageUser() {

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditData(item);
    setOpen(true);
  };

  return (
    <>
      {/* <Navbar />

      <div className="mu-title">MANAGE USERS</div>

      <div className="mu-card">

        <div className="mu-top">
          <h2>User Management</h2>
          <button
            className="mu-add-btn"
            onClick={handleAdd}
          >
            + Add User
          </button>
        </div>

        <div className="mu-head">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {usersData.map((item) => (
          <div className="mu-row" key={item.id}>
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>{item.role}</div>
            <div>{item.status}</div>
            <div
              className="mu-edit-btn"
              onClick={() => handleEdit(item)}
            >
              ✎ Edit
            </div>
          </div>
        ))}

      </div>

      {open && (
        <ManageUserModal
          close={() => setOpen(false)}
          data={editData}
        />
      )} */}
    </>
  );
}

export default ManageUser;