import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/ManageUser.css";
import { useQuery } from "@tanstack/react-query";
import {
  getmebership,
  getmebershipdetails,
  get_pending_requests,
  get_accepted_transfers,
} from "../../api/membership";

import MembershipPopup from "../../components/membershippopup";
import PendingPopup from "../../components/transfermembership";
import AcceptedPopup from "../../components/acceptmembership";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";

function ManageUser() {
  const [Filter, setFilter] = useState({
    plan: "",
    status: "",
  });

  const [open, setOpen] = useState(false);
  const [pendingPopup, setPendingPopup] = useState(false);
  const [acceptedPopup, setAcceptedPopup] = useState(false);

  const [editData, setEditData] = useState(null);
  const [selectedPending, setSelectedPending] = useState(null);
  const [selectedAccepted, setSelectedAccepted] = useState(null);

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

  const { data: acceptedRes } = useQuery({
    queryKey: ["acceptedTransfers"],
    queryFn: get_accepted_transfers,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const membershipData = membershipRes?.data || [];
  const pendingList = pendingRes?.data || [];
  const acceptedTransfers = acceptedRes?.data || [];

  // 🔹 Format Pending
  const formattedPending = pendingList.map((p) => ({
    membership_id: p.id,
    status: p.status,
    membership_plan: "STATE SWITCH",
    state_name: p.current_state_name,
    isPending: true,
    raw: p,
  }));

  // 🔹 Format Accepted
  const formattedAccepted = acceptedTransfers.map((a) => ({
    membership_id: a.id,
    status: a.status,
    membership_plan: "STATE SWITCH",
    state_name: `${a.current_state_name} → ${a.target_state_name}`,
    isAccepted: true,
    raw: a,
  }));

  const combinedData = [
    ...membershipData,
    ...formattedPending,
    ...formattedAccepted,
  ];

  // 🔥 NAME LOGIC
  const getDisplayName = (item) => {
    return (
      item.purchaser_athlete_name ??
      item.purchaser_club_name ??
      item.purchaser_state_name ??
      "—"
    );
  };

  // 🔥 LOCATION LOGIC (MAIN FIX)
  const getDisplayLocation = (item) => {
    if (item.isPending) return "Switching to new state";

    switch (item.membership_plan) {
      case "INDIVIDUAL_MEMBER":
        return (
          item.club_name ??
          item.state_name ??
          item.national_name ??
          "—"
        );

      case "ALLIED_MEMBER":
        return item.state_name ?? item.purchaser_club_name ?? "—";

      case "AFFILIATE_MEMBER":
        return item.national_name ?? item.purchaser_state_name ?? "—";

      case "STATE SWITCH":
        return item.state_name ?? "—";

      default:
        return "—";
    }
  };

  // 🔥 FILTER
  const handleFilterChange = (e) => {
    setFilter({
      ...Filter,
      [e.target.name]: e.target.value,
    });
  };

  const filteredData = combinedData.filter((item) => {
    const planMatch =
      Filter.plan === "" ||
      item.membership_plan?.toLowerCase() === Filter.plan.toLowerCase();

    const statusMatch =
      Filter.status === "" ||
      item.status?.toLowerCase().includes(Filter.status.toLowerCase());

    return planMatch && statusMatch;
  });

  // 🔥 VIEW HANDLER
  const handleView = (item) => {
    if (item.isPending) {
      setSelectedPending(item.raw);
      setPendingPopup(true);
      return;
    }

    if (item.isAccepted) {
      setSelectedAccepted(item.raw);
      setAcceptedPopup(true);
      return;
    }

    getmebershipdetails(item.membership_id)
      .then((res) => {
        setEditData(res.data);
        setOpen(true);
      })
      .catch((err) => console.error(err));
  };

  // 🔥 LOADING
  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="card" count={3} />
        </div>
      </>
    );

  // 🔥 ERROR
  if (error)
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load memberships"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        <div className="EventReport">MEMBERSHIP</div>

        <div className="athleteProfileCard">
          <div className="athleteCard">
            <div className="athleteFilters">

              {/* 🔥 PLAN FILTER */}
              <select name="plan" onChange={handleFilterChange}>
                <option value="">All Plans</option>
                <option value="individual_member">Individual Member</option>
                <option value="allied_member">Allied Member</option>
                <option value="affiliate_member">Affiliate Member</option>
                <option value="state switch">State Switch</option>
              </select>

              {/* 🔥 STATUS FILTER */}
              <select name="status" onChange={handleFilterChange}>
                <option value="">All Status</option>
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
              <div>State / Club</div>
              <div>View</div>
            </div>

            {filteredData.map((item, i) => (
              <div className="athleteprofileRows" key={i}>
                
                <div>{getDisplayName(item)}</div>

                <div>{item.membership_plan}</div>

                <div
                  className={`statuss ${
                    item.isPending
                      ? "pending"
                      : item.status === "PENDING_OLD"
                      ? "accepted"
                      : item.status?.toLowerCase()
                  }`}
                >
                  {item.status}
                </div>

                <div>{getDisplayLocation(item)}</div>

                <div onClick={() => handleView(item)} className="view-btn">
                  View
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 POPUPS */}
      {open && (
        <MembershipPopup
          data={editData}
          onClose={() => setOpen(false)}
          refetch={refetch}
        />
      )}

      {pendingPopup && selectedPending && (
        <PendingPopup
          data={selectedPending}
          onClose={() => setPendingPopup(false)}
        />
      )}

      {acceptedPopup && selectedAccepted && (
        <AcceptedPopup
          data={selectedAccepted}
          onClose={() => setAcceptedPopup(false)}
        />
      )}
    </>
  );
}

export default ManageUser;