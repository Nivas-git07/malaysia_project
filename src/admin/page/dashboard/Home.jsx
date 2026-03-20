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



  return (

    <>
      <Navbar />
      <div className="mu-membership-wrapper">


        <div className="dataTitle">DATA OVERVIEW</div>


        <div className="overviewCards">
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
        </div>


        <div className="stateTitle">STATE LIST</div>


        <div className="stateCard">

          <div className="stateFilters">

            <input
              type="text"
              placeholder="e.g., Selangor Finswimming Club"
              className="filterInput"
            />

            <select
              className="filterSelect"
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
            >
              <option value="">Select State</option>
              <option value="Tamilnadu">Tamil Nadu</option>
              <option value="Kerala">Kerala</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andra pradesh">Andra Pradesh</option>
              <option value="Telangana">Telangana</option>
            </select>

            <button className="findBtn">Find Club</button>

          </div>


          <div className="stateTable">
            <div className="stateHead">
              <div>State Name</div>
              <div>Members</div>
              <div>Club Count</div>
              <div>Website</div>
            </div>

            {filteredData.map((club, i) => (
              <div className="stateRow" key={i} onClick={() => navigate(`/home/state/${club.user}`)}>
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
                >
                  www.georgetown.com
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
