import React, { useState } from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Athlete.css";
import { getAthletes } from "../../api/athlete_api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";

function Athlete() {
  const navigate = useNavigate();

  const [viewType, setViewType] = useState("ALL");

  const [filters, setFilters] = useState({
    gender: "",
    discipline: "",
  });

  const {
    data: athleteData,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["athletes", viewType],
    queryFn: () => getAthletes(viewType),
    keepPreviousData: true,
  });

  const data = athleteData?.data?.athletes_list || [];

  
  const handleFilterChange = (e) => {
  const { name, value } = e.target;

  // 🔥 HANDLE TYPE (API SWITCH)
  if (name === "type") {
    setViewType(value);
    return;
  }

  // 🔥 NORMAL FILTERS
  setFilters((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const filteredData = data.filter((item) => {
    return (
      (filters.gender === "" ||
        item.gender?.toLowerCase() === filters.gender.toLowerCase()) &&
      (filters.discipline === "" ||
        item.discipline?.toLowerCase() === filters.discipline.toLowerCase())
    );
  });

  /* ========================= */
  /* 🔥 PRODUCTION LOADING UI */
  /* ========================= */
  if (isLoading || isFetching) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <div className="EventReport">ATHLETE</div>

          <div className="athleteCard">
            {/* FILTER SKELETON */}
            <div className="athleteFilters">
              <div className="skeletonInput"></div>
              <div className="skeletonInput"></div>
              <div className="skeletonInput"></div>
              <div className="skeletonBtn"></div>
            </div>

            {/* TABLE SKELETON */}
            <div className="mfsaTableScroll">
              <div className="athleteTable">
                <div className="athleteHeads">
                  <div>state name</div>
                  <div>Athlete</div>
                  <div>Gender</div>
                  <div>DOB</div>
                  <div>Discipline</div>
                  <div>view more</div>
                </div>

                {[...Array(6)].map((_, i) => (
                  <div className="athleteRows" key={i}>
                    <div className="skeletonText short"></div>

                    <div className="athleteInfo">
                      <div className="skeletonAvatar"></div>
                      <div>
                        <div className="skeletonText"></div>
                        <div className="skeletonText small"></div>
                      </div>
                    </div>

                    <div className="skeletonText short"></div>
                    <div className="skeletonText short"></div>
                    <div className="skeletonText short"></div>
                    <div className="skeletonText small"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ========================= */
  /* ❌ ERROR STATE */
  /* ========================= */
  if (error) {
    return (
      <>
        <Navbar />
        <div className="mu-membership-wrapper">
          <ErrorState
            title="Unable to load athletes"
            message="Please check your connection and try again."
            onRetry={() => window.location.reload()}
          />
        </div>
      </>
    );
  }

  /* ========================= */
  /* ✅ MAIN UI */
  /* ========================= */
  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="EventReport">ATHLETE</div>

        <div className="athleteCard">
          {/* FILTERS */}
          <div className="athleteFilters">
            <select
              className="filterSelect"
              name="gender"
              onChange={handleFilterChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select
              className="filterSelect"
              name="discipline"
              onChange={handleFilterChange}
            >
              <option value="">Select Discipline</option>
              <option value="SURFACE">Surface</option>
              <option value="BI-FINS">Bi-fins</option>
              <option value="APNEA">Apnea</option>
              <option value="IMMERSION">Immersion</option>
            </select>

            {/* <button className="findsBtn">Find Athlete</button> */}
            <select
              className="filterSelect"
              name="type"
              onChange={handleFilterChange}
            >
              <option value="ALL">All</option>
              <option value="PARTICULAR">Particular</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="mfsaTableScroll">
            <div className="athleteTable">
              <div className="athleteHeads">
                <div>state name</div>
                <div>Athlete</div>
                <div>Gender</div>
                <div>DOB</div>
                <div>Discipline</div>
                <div>view more</div>
              </div>

              {filteredData.length === 0 ? (
                <EmptyState
                  title="No athletes found"
                  message="Try adjusting your filters."
                />
              ) : (
                filteredData.map((item, i) => (
                  <div className="athleteRows" key={i}>
                    <div>{item.state_name}</div>

                    <div className="athleteInfo">
                      <img src={item.profile_picture} alt="" />
                      <div>
                        <span className="athleteName">{item.full_name}</span>
                        <p>IND</p>
                      </div>
                    </div>

                    <div>{item.gender}</div>
                    <div>{item.date_of_birth}</div>
                    <div>{item.discipline}</div>

                    <div
                      className="viewProfile"
                      onClick={() => navigate(`/athlete/${item.id}`)}
                    >
                      View Profile
                    </div>
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

export default Athlete;
