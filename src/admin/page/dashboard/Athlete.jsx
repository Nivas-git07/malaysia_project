import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Athlete.css";
import { getAthletes } from "../../api/athlete_api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// const data = [
//   {
//     country: "UAE",
//     name: "Santo merline",
//     gender: "Female",
//     dob: "09/04/2008",
//     discipline: "Surface",
//   },
//   {
//     country: "ARG",
//     name: "Jane Cooper",
//     gender: "Male",
//     dob: "09/04/2008",
//     discipline: "Immersion",
//   },
//   {
//     country: "UAE",
//     name: "Esther Howard",
//     gender: "Female",
//     dob: "09/04/2008",
//     discipline: "Surface",
//   },
//   {
//     country: "IND",
//     name: "Guy Hawkins",
//     gender: "Male",
//     dob: "09/04/2008",
//     discipline: "Bi-fins",
//   },
//   {
//     country: "UAE",
//     name: "Jacob Jones",
//     gender: "Female",
//     dob: "09/04/2008",
//     discipline: "Surface",
//   },
// ];



function Athlete() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
  gender: "",
  discipline: "",
  state: ""
});
  const { data: athleteData, isLoading, error } = useQuery({
    queryKey: ["athletes"],
    queryFn: getAthletes,
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(athleteData, isLoading, error);
  const data = athleteData?.data?.athletes_list || [];
  console.log("athlete list ",data);

  const handleFilterChange = (e) => {
  setFilters({
    ...filters,
    [e.target.name]: e.target.value
  });
};

const filteredData = data.filter((item) => {
  return (
    (filters.gender === "" ||
      item.gender?.toLowerCase() === filters.gender.toLowerCase()) &&

    (filters.discipline === "" ||
      item.discipline?.toLowerCase() === filters.discipline.toLowerCase()) &&

    (filters.state === "" ||
      item.state?.toLowerCase() === filters.state.toLowerCase())
  );
});


  return (
    <>
      <Navbar />
      <div className="mu-membership-wrapper">

        <div className="EventReport">ATHLETE</div>
        <div className="athleteCard">

          <div className="athleteFilters">

            <select className="filterSelect" name="gender" onChange={handleFilterChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select className="filterSelect" name="discipline" onChange={handleFilterChange}>
              <option value="">Select Discipline</option>
              
              <option value="SURFACE">surface</option>
              <option value="BI-FINS">Bi-fins</option>
              <option value="APNEA">Apnea</option>
              <option value="IMMERSION">Immersion</option>
            </select>

            <select className="filterSelect" name="state" onChange={handleFilterChange}>
              <option value="">Select State</option>
              <option value="tamilnadu">Tamil Nadu</option>
              <option value="kerala">Kerala</option>
              <option value="karnataka">Karnataka</option>
              <option value="andhra">Andhra Pradesh</option>
            </select>

            <button className="findBtn">Find Athlete</button>

          </div>

          {/* ===== TABLE ===== */}
          <div className="athleteTable">
            <div className="athleteHeads">
              <div>Country</div>
              <div>Athelete</div>
              <div>Gender</div>
              <div>DOB</div>
              <div>Discipline</div>
              <div>view more</div>
            </div>

            {filteredData.map((item, i) => (
              <div className="athleteRows" key={i}>
                <div className="country">
                  <div className="country">
                    {item.state}
                  </div>
                </div>

                <div className="athleteInfo">
                  <img src="https://i.pravatar.cc/60" alt="" />
                  <div>
                    <span className="athleteName">{item.full_name}</span>
                    <p>IND</p>
                  </div>
                </div>

                <div>{item.gender}</div>
                <div>{item.date_of_birth}</div>
                <div>{item.discipline}</div>

                <div className="viewProfile" onClick={() => navigate(`/athlete/${item.id}`)}>
                  View Profile
                </div>
              </div>
            ))}

            {/* FOOTER */}
            <div className="tableFooter">
              <span>Showing 1 to 5 of 100 entries</span>
              <div className="pagination">
                <button>{"<"}</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>25</button>
                <button>{">"}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Athlete;
