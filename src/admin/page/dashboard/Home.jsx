import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Home.css";
import logo from "../../assets/logo.jpg";

import { homeData, checksession } from "../../api/home_api";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

export default function Home() {
  const navigate = useNavigate();

  // SESSION CHECK
  const {
    data: sessionData,
    isLoading: sessionLoading,
    error: sessionError,
  } = useQuery({
    queryKey: ["checkSession"],
    queryFn: checksession,
    refetchOnWindowFocus: false,
    retry: false,
  });

  console.log("Session Data:", sessionData?.data, sessionLoading, sessionError);

  const role = sessionData?.data?.role || "Unknown";

  console.log("User Role:", role);


  const { data, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: homeData,
    enabled: !!sessionData,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  console.log(data, isLoading, error);

  const data1 = data?.data?.states_list || [];

  // FILTER STATE
  const [filters, setFilters] = useState({
    state: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // FILTERED DATA
  const filteredData = data1.filter((item) => {
    const itemState = item?.state_name?.toLowerCase().replace(/\s/g, "");

    const selectedState = filters?.state?.toLowerCase().replace(/\s/g, "");

    return filters.state === "" || itemState === selectedState;
  });

  console.log(data?.data?.stats);

  // LOADING
  if (isLoading || sessionLoading) {
    return (
      <>
        <Navbar />

        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="table" count={6} />
        </div>
      </>
    );
  }

  // ERROR
  if (error) {
    return (
      <>
        <Navbar />

        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load state list"
            message="Please check your connection and try again."
            onRetry={() => window.location.reload()}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        {/* TITLE */}
        <div className="stateTitle">STATE LIST</div>

        {/* FILTER */}

        {/* TABLE CARD */}
        <div className="stateCard">
          <div className="mfsaTableScroll">
            <div className="stateTable">
              {/* TABLE HEADER */}
              <div className="stateHead">
                <div>State Name</div>
                <div>Members</div>
                <div>Club Count</div>
                <div>Website</div>
              </div>

              {/* EMPTY STATE */}
              {filteredData.length === 0 ? (
                <EmptyState
                  title="No states found"
                  message="Try adjusting your filters."
                />
              ) : (
                filteredData.map((club, i) => (
                  <div
                    className="stateRow"
                    key={club.id || i}
                    onClick={() => navigate(`/admin/home/state/${club.user}`)}
                  >
                    {/* STATE NAME */}
                    <div className="clubCell">
                      <img src={logo} alt="logo" />

                      <span>{club.state_name}</span>
                    </div>

                    {/* MEMBERS */}
                    <div className="membersCell">
                      <img src="https://i.pravatar.cc/40" alt="member1" />

                      <img src="https://i.pravatar.cc/41" alt="member2" />

                      <img src="https://i.pravatar.cc/42" alt="member3" />

                      <span> + {club.members_count || 0}</span>
                    </div>

                    {/* CLUB COUNT */}
                    <div>{club.clubs_count || 0}</div>

                    {/* WEBSITE */}
                    <a
                      href={`https://mfsa.techleafsolutions.com/state/${club.user}`}
                      className="website"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Website
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
