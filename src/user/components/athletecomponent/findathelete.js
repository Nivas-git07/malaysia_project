export default function FindAthlete() {
  return (
    <section className="findAthleteSection">

      <div className="findAthleteContainer">

        <h2 className="findAthleteTitle">ATHLETES</h2>

        <div className="findAthleteRow">

       
          <div className="findField">
            <label>Athlete name</label>
            <input
              type="text"
              placeholder="e.g., Jane Cooper"
              className="findInput"
            />
          </div>

          
          <div className="findField">
            <label>Club</label>
           <div className="customSelect">
    <select className="findInput">
      <option>--Select Club--</option>
      <option>Selangor Finswimming Club</option>
      <option>Kuala Lumpur Club</option>
      <option>Johor Aquatic Club</option>
      <option>Penang Aquatic Club</option>
    </select>
  </div>
          </div>

         
          <div className="findButtonWrap">
            <button className="findBtn">
              Find Athlete
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
