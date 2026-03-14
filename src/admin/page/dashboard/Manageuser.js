import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/ManageUser.css";
import ManageUserModal from "./ManageUserModal";
import MembershipSection from "../../components/membershipcard";
import { getmebership } from "../../api/membership";
import { useQuery } from "@tanstack/react-query";

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

  const[Filter, setFilter] = useState({
    plan: "",
    role: "",
    status: ""
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["membership"],
    queryFn: getmebership,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data, isLoading, error);
  const membershipData = data?.data || [];
  console.log(membershipData);

  const handleFilterChange = (e) => {
    setFilter({
      ...Filter,
      [e.target.name]: e.target.value
    });
  }
  const filteredData = membershipData.filter((item) => {
    return (
      (Filter.plan === "" ||
        item.plan?.toLowerCase() === Filter.plan.toLowerCase()) &&

      (Filter.role === "" ||
        item.role?.toLowerCase() === Filter.role.toLowerCase()) &&

      (Filter.status === "" ||
        item.status?.toLowerCase() === Filter.status.toLowerCase())
    );
  });



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

            <select className="filterSelect" name="plan" onChange={handleFilterChange}>
              <option value="">Select plan</option>
              <option value="CLUB_ATHLETE_MEMBERSHIP">Club athlete membership</option>
              <option value="NATIONAL_ATHLETE_MEMBERSHIP">National athlete membership</option>
              <option value="COACH_MEMBERSHIP'">Coach membership</option>
              <option value="TECHNICAL_OFFICIAL_MEMBERSHIP">Technical official membership</option>
             
            </select>

            <select className="filterSelect" name="role" onChange={handleFilterChange}>
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Coach">Coach</option>
            </select>

            <select className="filterSelect" name="status" onChange={handleFilterChange}>
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
              <button className="findBtn">Find Athlete</button>

          </div>



          

          </div>


          <div className="athleteTable">
            <div className="profileHead">
              <div>Name</div>
              <div>Membership Plan</div>
              <div>status</div>
              <div>Action</div>
              <div>view more</div>
            </div>

            {filteredData.map((item, i) => (
                <div className="athleteprofileRow" key={i}>
                  <div className="country">
                    <div className="country">
                      {item.user_name}
                    </div>
                  </div>

                  <div className="athleteInfo">
                    
                    <div>
                      <span className="athleteName">{item.membership_plan}</span>
                      
                    </div>
                  </div>

                  <div>{item.status}</div>
                  <div>
                    <button className="acceptBtn" onClick={() => handleEdit(item)}>Accept</button>
                  </div>
                  <div>view </div>


                </div>
              ))}

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

  </>
);
}

export default ManageUser;