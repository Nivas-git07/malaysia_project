import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Athlete.css";
import { getAthletes } from "../../api/athlete_api";
import { useQuery } from "@tanstack/react-query";
import useQueryClient from "@tanstack/react-query";
const data = [
  {
    country: "UAE",
    name: "Santo merline",
    gender: "Female",
    dob: "09/04/2008",
    discipline: "Surface",
  },
  {
    country: "ARG",
    name: "Jane Cooper",
    gender: "Male",
    dob: "09/04/2008",
    discipline: "Immersion",
  },
  {
    country: "UAE",
    name: "Esther Howard",
    gender: "Female",
    dob: "09/04/2008",
    discipline: "Surface",
  },
  {
    country: "IND",
    name: "Guy Hawkins",
    gender: "Male",
    dob: "09/04/2008",
    discipline: "Bi-fins",
  },
  {
    country: "UAE",
    name: "Jacob Jones",
    gender: "Female",
    dob: "09/04/2008",
    discipline: "Surface",
  },
];



function Athlete() {
 const { data: athleteData, isLoading, error } = useQuery({
  queryKey: ["athletes"],
  queryFn: getAthletes,
  refetchOnWindowFocus: false,
  retry: false,
});

  return (
    <>
      <Navbar />

      <div className="AthleteTitle">ATHLETE</div>
      <div className="athleteCard">
        {/* ===== FILTER BAR ===== */}
        <div className="athleteFilters">
          <select>
            <option>Gender</option>
          </select>
          <select>
            <option>Discipline</option>
          </select>
          <select>
            <option>States</option>
          </select>
          <button className="findBtn">Find Athlete</button>
        </div>

        {/* ===== TABLE ===== */}
        <div className="athleteTable">
          <div className="athleteHead">
            <div>Country</div>
            <div>Athelete</div>
            <div>Gender</div>
            <div>DOB</div>
            <div>Discipline</div>
            <div></div>
          </div>

          {data.map((item, i) => (
            <div className="athleteRow" key={i}>
              <div className="country">
                <span className={`flag ${item.country.toLowerCase()}`}></span>
                {item.country}
              </div>

              <div className="athleteInfo">
                <img src="https://i.pravatar.cc/60" alt="" />
                <div>
                  <span className="athleteName">{item.name}</span>
                  <p>IND</p>
                </div>
              </div>

              <div>{item.gender}</div>
              <div>{item.dob}</div>
              <div>{item.discipline}</div>

              <div className="viewProfile">View Profile</div>
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
    </>
  );
}

export default Athlete;
