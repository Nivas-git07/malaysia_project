import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Home.css";
import logo from "../../assets/logo.jpg";
import { homeData } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StateList from "./state";
import { checksession } from "../../api/home_api";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
export default function Home() {

  const { data: sessionData, isLoading: sessionLoading, error: sessionError } = useQuery({
    queryKey: ["checkSession"],
    queryFn: checksession,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log("Session Data:", sessionData?.data, sessionLoading, sessionError);
  const role = sessionData?.data.role || "Unknown";
  console.log("User Role:", role);
  const { data, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: homeData,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data, isLoading, error);
  const datas = data?.data
  console.log(datas)
  const navigate = useNavigate();
  const data1 = data?.data.states_list || [];
  const [filters, setFilters] = useState({
    state: ""
  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredData = data1.filter((item) => {
    const itemState = item.state_name?.toLowerCase().replace(/\s/g, "");
    const selectedState = filters.state?.toLowerCase().replace(/\s/g, "");

    return filters.state === "" || itemState === selectedState;
  });
  console.log(data?.data.stats);

  

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <SkeletonLoader variant="table" count={6} />
        </div>
      </>
    );
  }

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


        {/* <div className="dataTitle">DATA OVERVIEW</div> */}


        {/* <div className="overviewCards">
          <div className="overviewCard">
            <p>Total States</p>
            <h2>{data?.data.stats.total_states || 0}</h2>
          </div>

          <div className="overviewCard">
            <p>Total Clubs</p>
            <h2>{data?.data.stats.total_clubs || 0}</h2>
          </div>

          <div className="overviewCard">
            <p>Total Members</p>
            <h2>{data?.data.stats.total_athletes || 0} +</h2>
          </div>
        </div> */}


        <div className="stateTitle">STATE LIST</div>


        <div className="stateCard">

        


          <div className="mfsaTableScroll">
            <div className="stateTable">
              <div className="stateHead">
                <div>State Name</div>
                <div>Members</div>
                <div>Club Count</div>
                <div>Website</div>
              </div>

              {filteredData.length === 0 ? (
                <EmptyState title="No states found" message="Try adjusting your filters." />
              ) : (
                filteredData.map((club, i) => (
                  <div
                    className="stateRow"
                    key={i}
                    onClick={() => navigate(`/admin/home/state/${club.user}`)}
                  >
                    <div className="clubCell">
                      <img src={logo} alt="logo" />
                      {data?.data.states_list[i].state_name}
                    </div>

                    <div className="membersCell">
                      <img src="https://i.pravatar.cc/40" />
                      <img src="https://i.pravatar.cc/41" />
                      <img src="https://i.pravatar.cc/42" />
                      <span> + {data?.data.states_list[i].members_count} </span>
                    </div>

                    <div>{data?.data.states_list[i].clubs_count}</div>

                    <a
                      href="https://www.georgetown.com"
                      className="website"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      www.georgetown.com
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
