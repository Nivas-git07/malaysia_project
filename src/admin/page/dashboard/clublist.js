import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Home.css";
import logo from "../../assets/logo.jpg";
import { statedata } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export default function StateList() {
  const { id } = useParams();
  console.log("State ID:", id);
  const { data, isLoading, error } = useQuery({
    queryKey: ["statedata"],
    queryFn: () => statedata(id),
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(data, isLoading, error);
  console.log(data?.data);
  return (

    <>
      <Navbar />


      <div className="mu-membership-wrapper">

        <div className="dataTitle">DATA OVERVIEW</div>


        <div className="overviewCards">
          <div className="overviewCard">
            <p>Total Clubs</p>
            <h2>{data?.data.clubs_count || 0}</h2>
          </div>

          <div className="overviewCard">
            <p>Total Clubs</p>
            <h2>{data?.data.total_clubs || 0}</h2>
          </div>

          <div className="overviewCard">
            <p>Total Members</p>
            <h2>{data?.data.total_athletes || 0} +</h2>
          </div>
        </div>


        <div className="stateTitle">CLUB LIST</div>


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

            {data?.data.clubs_list?.map((club, i) => (
              <div className="stateRow" key={club.id}>
                <div className="clubCell">
                  <img src={logo} alt="logo" />

                  {club.club_name}
                </div>

                <div className="membersCell">
                  <img src="https://i.pravatar.cc/40" />
                  <img src="https://i.pravatar.cc/41" />
                  <img src="https://i.pravatar.cc/42" />
                  <span> + {club.members_count} </span>
                </div>

                <div>{club.clubs_count}</div>

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
