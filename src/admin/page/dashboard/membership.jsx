import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/ManageUser.css";
import { useQuery } from "@tanstack/react-query";
import {
  getmebership,
  getmebershipdetails,
  get_pending_requests,
} from "../../api/membership";
import MembershipPopup from "../../components/membershippopup";

function ManageUser() {
  const [Filter, setFilter] = useState({
    plan: "",
    status: "",
  });

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const {
    data: membershipRes,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["membership"],
    queryFn: getmebership,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: pendingRes } = useQuery({
    queryKey: ["pending"],
    queryFn: get_pending_requests,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const membershipData = membershipRes?.data || [];
  const pendingData = pendingRes?.data || [];
  console.log("Membership Data:", membershipData);
  console.log("Pending Data:", pendingData);

  const formattedPending = pendingData.map((p) => ({
    membership_id: p.id,
    user_name: "Pending User",
    membership_plan: "STATE SWITCH",
    status: p.status,
    state_name: "Switch Request",
    isPending: true,
  }));

  const combinedData = [...membershipData, ...formattedPending];

  const handleFilterChange = (e) => {
    setFilter({
      ...Filter,
      [e.target.name]: e.target.value,
    });
  };

  const filteredData = combinedData.filter((item) => {
    return (
      (Filter.plan === "" ||
        item.membership_plan?.toLowerCase() === Filter.plan.toLowerCase()) &&
      (Filter.status === "" ||
        item.status?.toLowerCase().includes(Filter.status.toLowerCase()))
    );
  });

  const handleView = (item) => {
    if (item.isPending) {
      setEditData({
        user_name: item.user_name,
        membership_plan: item.membership_plan,
        status: item.status,
        state_name: item.state_name,
        note: "This is a pending state switch request",
      });
      setOpen(true);
      return;
    }

    getmebershipdetails(item.membership_id)
      .then((res) => {
        setEditData(res.data);
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading</p>;

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="EventReport">MEMBERSHIP</div>

        <div className="athleteProfileCard">
          <div className="athleteCard">
            <div className="athleteFilters">
              <select name="plan" onChange={handleFilterChange}>
                <option value="">Select plan</option>
                <option value="allied_member">Allied Member</option>
                <option value="state switch">State Switch</option>
              </select>

              <select name="status" onChange={handleFilterChange}>
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="athleteTable">
            <div className="profileHeads">
              <div>Name</div>
              <div>Plan</div>
              <div>Status</div>
              <div>State</div>
              <div>View</div>
            </div>

            {filteredData.map((item, i) => (
              <div className="athleteprofileRows" key={i}>
                <div>{item.user_name}</div>

                <div>{item.membership_plan}</div>

                <div
                  className={`statuss ${
                    item.isPending ? "pending" : item.status.toLowerCase()
                  }`}
                >
                  {item.isPending ? "Pending Switch" : item.status}
                </div>

                <div>
                  {item.isPending ? "Switching to new state" : item.state_name}
                </div>

                <div onClick={() => handleView(item)} className="view-btn">
                  View
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <MembershipPopup
          data={editData}
          onClose={() => setOpen(false)}
          refetch={refetch}
        />
      )}
    </>
  );
}

export default ManageUser;
