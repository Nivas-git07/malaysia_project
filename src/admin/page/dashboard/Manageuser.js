import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/ManageUser.css";
import ManageUserModal from "./ManageUserModal";
import MembershipSection from "../../components/membershipcard";
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

      <div className="mu-membership-wrapper">

        <div className="EventReport">MEMBERSHIP</div>
        <div className="athleteProfileCard">
          {/* <AthleteCard /> */}

          <div className="athleteCard">
       

            <div className="athleteFilters">

              <select className="filterSelect">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select className="filterSelect" >
                <option value="">Select Discipline</option>
                <option value="freestyle">Freestyle</option>
                <option value="butterfly">Butterfly</option>
                <option value="backstroke">Backstroke</option>
                <option value="breaststroke">Breaststroke</option>
              </select>

              <select className="filterSelect">
                <option value="">Select State</option>
                <option value="tamilnadu">Tamil Nadu</option>
                <option value="kerala">Kerala</option>
                <option value="karnataka">Karnataka</option>
                <option value="andhra">Andhra Pradesh</option>
              </select>

              <button className="findBtn">Find Athlete</button>

            </div>

            {/* ===== TABLE ===== */}
            <div className="athleteTable">
              <div className="profileHead">
                <div>Name</div>
                <div>Membership Plan</div>
                <div>status</div>
                <div>Action</div>
                <div>view more</div>
              </div>

              {/* {filteredData.map((item, i) => (
                <div className="athleteprofileRow" key={i}>
                  <div className="country">
                    <div className="country">
                      {item.state}
                    </div>
                  </div>

                  <div className="athleteInfo">
                    <img src="https://i.pravatar.cc/60" alt="" />
                    <div>
                      <span className="athleteName">{item.full_name}</span>
                      <p>IND</p>
                    </div>
                  </div>

                  <div>{item.gender}</div>
                  <div>{item.date_of_birth}</div>
                  <div>{item.discipline}</div>


                </div>
              ))} */}

              {/* FOOTER */}
              <div className="tableFooter">
                <span>Showing 1 to 5 of 100 entries</span>
                <div className="pagination">
                  <button>{"<"}</button>
                  <button className="active">1</button>
                  <button>2</button>
                  <button>3</button>
                  <button>4</button>
                  <button>25</button>
                  <button>{">"}</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default ManageUser;