import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Home.css";
import logo from "../../assets/logo.jpg";
import { statedata } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClubList } from "../../api/home_api";
import { useNavigate } from "react-router-dom";
export default function StateList() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("State ID:", id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["clubList", id],
    queryFn: () => (id ? statedata(id) : getClubList()),
    refetchOnWindowFocus: false,
    retry: false,
  });
  

  const clubs_stats = data?.data || [];
  const club_count = data?.data.clubs_count || 0;
  console.log(clubs_stats);
  console.log(data, isLoading, error);

  return (
    <>
      <Navbar />

      <div className="mu-membership-wrapper">
        {/* <div className="dataTitle">DATA OVERVIEW</div>

        <div className="overviewCards">
          <div className="overviewCard">
            <p>Total Clubs</p>
            <h2>{clubs_stats.clubs_count || 0}</h2>
          </div>

          <div className="overviewCard">
            <p>Total Clubs</p>
            <h2>{clubs_stats.total_clubs || 0}</h2>
          </div>

          <div className="overviewCard">
            <p>Total Members</p>
            <h2>{clubs_stats.athletes_count || 0} +</h2>
          </div>
        </div> */}

        <div className="stateTitle">CLUB LIST</div>

        <div className="stateCard">
          <div className="stateFilters">
            <input placeholder="e.g., Selangor Finswimming Club" />
            <input placeholder="--Select State--" />
            <button className="findBtn">Find Club</button>
          </div>

          <div className="stateTable">
            <div className="stateHead">
              <div>Club Name</div>
              <div>Members count</div>
              <div>Club owner</div>
              <div>Website</div>
            </div>

            {clubs_stats.clubs_list?.map((club) => (
              <div
                className="stateRow"
                key={club.user}
                onClick={() => {
                  navigate(`/admin/home/club/${club.user}`);
                }}
              >
                <div className="clubCell">
                  <img src={logo} alt="logo" />
                  {club.club_name}
                </div>

                <div>
                  {/* <img src="https://i.pravatar.cc/40" />
                  <img src="https://i.pravatar.cc/41" />
                  <img src="https://i.pravatar.cc/42" /> */}
                  <span> {club.athlete_count} </span>
                </div>

                <div>{club.owner_name}</div>

                <a
                  href={`http://localhost:5173/club/${club.user}`}
                  className="website"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.mfsa.com
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
