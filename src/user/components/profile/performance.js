import { FiCalendar } from "react-icons/fi";

export default function AthletePerformance() {

  const performanceData = [
    { event:"100m Bi-fins", time:"00:16.25", rank:"1st", comp:"National Championship", date:"May 2025" },
    { event:"400m Immersion", time:"00:16.25", rank:"1st", comp:"National Championship", date:"May 2025" },
    { event:"200m Surface", time:"00:16.25", rank:"1st", comp:"National Championship", date:"May 2025" },
    { event:"50m Surface", time:"00:16.25", rank:"1st", comp:"National Championship", date:"May 2025" },
    { event:"100m Bi-fins", time:"00:16.25", rank:"1st", comp:"National Championship", date:"May 2025" },
    { event:"400m Immersion", time:"00:16.25", rank:"1st", comp:"National Championship", date:"May 2025" }
  ];

  return (

    <section className="perfSection">

      <div className="perfContainer">

        {/* TITLE */}
        <h2 className="perfTitle">PERFORMANCE</h2>

        {/* FILTER ROW */}
        <div className="perfFilters">

          <select className="perfInput">
            <option>Event</option>
            <option>Bi-fins</option>
            <option>Surface</option>
            <option>Immersion</option>
          </select>

          <select className="perfInput">
            <option>Competition</option>
            <option>National Championship</option>
          </select>

          <div className="perfDateWrap">
            <input type="date" className="perfInput"/>
            <FiCalendar className="perfDateIcon"/>
          </div>

          <button className="perfFindBtn">Find</button>

        </div>

        {/* TABLE */}
        <div className="perfTable">

          <div className="perfHead">
            <span>Event</span>
            <span>Best time</span>
            <span>Rank</span>
            <span>Competition</span>
            <span>Date</span>
          </div>

          {performanceData.map((row,i)=>(
            <div className="perfRow" key={i}>

              <span>{row.event}</span>
              <span className="perfRed">{row.time}</span>
              <span>{row.rank}</span>
              <span>{row.comp}</span>
              <span className="perfRed">{row.date}</span>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
