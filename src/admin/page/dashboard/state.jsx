import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Home.css";
import logo from "../../assets/logo.jpg";
import { statedata } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClubList } from "../../api/home_api";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../../components/common/SkeletonLoader";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
export default function StateList() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("State ID:", id);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["clubList", id],
    queryFn: () => (id ? statedata(id) : getClubList()),
    refetchOnWindowFocus: false,
    retry: false,
  });
  

  const clubs_stats = data?.data || [];
  console.log(clubs_stats);
  console.log(data, isLoading, error);

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
            title="Unable to load clubs"
            message="Please check your connection and try again."
            onRetry={() => refetch()}
          />
        </div>
      </>
    );
  }

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
         

          <div className="mfsaTableScroll">
            <div className="stateTable">
              <div className="stateHead">
                <div>Club Name</div>
                <div>Members count</div>
                <div>Club owner</div>
                <div>Website</div>
              </div>

              {clubs_stats.clubs_list?.length === 0 ? (
                <EmptyState
                  title="No clubs found"
                  message="Try adjusting your selection."
                  actionLabel="Retry"
                  onAction={() => refetch()}
                />
              ) : (
                clubs_stats.clubs_list?.map((club) => (
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
                      <span> {club.athlete_count} </span>
                    </div>

                    <div>{club.owner_name}</div>

                    <a
                      href={`http://localhost:5173/club/${club.user}`}
                      className="website"
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      www.mfsa.com
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
