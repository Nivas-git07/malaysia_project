import React from 'react'
import Navbar from "../navbar/nav";
import "../../style/dashboard/Report.css";

function Report() {
  return (
    <>
      <Navbar />
       <div className="AthleteReport">REPORT</div>
       <div className="nationalWrapper">

      {/* ===== TABS ===== */}
      <div className="tabsRow">
        <button className="tab active">National</button>
        <button className="tab">State</button>
        <button className="tab">Club</button>
        <button className="tab">Athelete</button>
        <button className="tab">Event – Based</button>
      </div>

      {/* ===== FILTER BAR ===== */}
      <div className="filterRow">
        <div className="filtersLeft">
          <select><option>Filter by State</option></select>
          <select><option>Filter by year</option></select>
          <input placeholder="Select athlete or club"/>
        </div>

        <button className="exportBtn">Export CSV</button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="tableBlock">

        <div className="tableHead">
          <div>Category</div>
          <div>Entity</div>
          <div>Participants</div>
          <div>Medals</div>
          <div>Events</div>
          <div>Last Upload</div>
        </div>

        <div className="tableRow">
          <div>State</div>
          <div>Kuala Lumpur</div>
          <div>215</div>
          <div>32</div>
          <div>8</div>
          <div>2025-08-06</div>
        </div>

        <div className="tableRow">
          <div>Club</div>
          <div>BlueFin Racers</div>
          <div>215</div>
          <div>32</div>
          <div>8</div>
          <div>2025-08-06</div>
        </div>

        <div className="tableRow">
          <div>State</div>
          <div>Labuan</div>
          <div>215</div>
          <div>32</div>
          <div>8</div>
          <div>2025-08-06</div>
        </div>

      </div>

      {/* ===== CHART AREA ===== */}
      <div className="chartArea">

      <div className="donut">
  <span className="percent p15">15%</span>
  <span className="percent p20">20%</span>
  <span className="percent p65">65%</span>
</div>

        <div className="legendBlock">

          <div className="selectType">
            <span>Select type</span>
            <select><option>State</option></select>
          </div>

          <div className="legendItem">
            <span className="dot red"></span>
            Participants
            <b>234</b>
          </div>

          <div className="legendItem">
            <span className="dot blue"></span>
            metals
            <b>38</b>
          </div>

          <div className="legendItem">
            <span className="dot black"></span>
            Event Oraganized
            <b>10</b>
          </div>

        </div>

      </div>

    </div>
    </>
  )
}

export default Report