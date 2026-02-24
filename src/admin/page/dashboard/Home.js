import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Home.css";
import logo from "../../assets/logo.jpg";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* DATA OVERVIEW TITLE */}
      <div className="dataTitle">DATA OVERVIEW</div>

      {/* CARDS */}
      <div className="overviewCards">
        <div className="overviewCard">
          <p>Total States</p>
          <h2>14</h2>
        </div>

        <div className="overviewCard">
          <p>Total Clubs</p>
          <h2>200</h2>
        </div>

        <div className="overviewCard">
          <p>Total Members</p>
          <h2>1200+</h2>
        </div>
      </div>

      {/* STATE LIST TITLE */}
      <div className="stateTitle">STATE LIST</div>

      {/* STATE CARD */}
      <div className="stateCard">
        {/* FILTER BAR */}
        <div className="stateFilters">
          <input placeholder="e.g., Selangor Finswimming Club" />
          <input placeholder="--Select State--" />
          <button className="findBtn">Find Club</button>
        </div>

        {/* TABLE */}
        <div className="stateTable">
          <div className="stateHead">
            <div>Club Name</div>
            <div>Members</div>
            <div>State</div>
            <div>Website</div>
          </div>

          {["MLFA", "PFSA", "MFSA", "PFSA"].map((club, i) => (
            <div className="stateRow" key={i}>
              <div className="clubCell">
                <img src={logo} alt="logo" />

                {club}
              </div>

              <div className="membersCell">
                <img src="https://i.pravatar.cc/40" />
                <img src="https://i.pravatar.cc/41" />
                <img src="https://i.pravatar.cc/42" />
                <span>+5</span>
              </div>

              <div>George Town</div>

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
