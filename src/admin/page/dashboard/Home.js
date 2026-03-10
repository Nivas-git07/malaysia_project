import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Home.css";
import logo from "../../assets/logo.jpg";
import { homeData } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homeData"],
    queryFn: homeData,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data, isLoading, error);
  console.log(data?.data.stats);
  return (
    
    <>
      <Navbar />

     
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
          <input placeholder="e.g., Selangor Finswimming Club" />
          <input placeholder="--Select State--" />
          <button className="findBtn">Find Club</button>
        </div>

     
        <div className="stateTable">
          <div className="stateHead">
            <div>State Name</div>
            <div>Members</div>
            <div>Club Count</div>
            <div>Website</div>
          </div>

          {data?.data.states_list?.map((club, i) => (
            <div className="stateRow" key={i}>
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
    </>
  );
}
