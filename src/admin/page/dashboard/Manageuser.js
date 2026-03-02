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
      <Navbar />

      <div className="manageUserTitle">MANAGE USERS</div>

      <div className="manageUserCard">

        <div className="manageUserTop">
          <h2>User Management</h2>
          <button
            className="addManageUserBtn"
            onClick={handleAdd}
          >
            + Add User
          </button>
        </div>

        <div className="manageUserHead">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {usersData.map((item) => (
          <div className="manageUserRow" key={item.id}>
            <div>{item.name}</div>
            <div>{item.email}</div>
            <div>{item.role}</div>
            <div>{item.status}</div>
            <div
              className="manageUserEditBtn"
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
      )}
    </>
  );
}

export default ManageUser;