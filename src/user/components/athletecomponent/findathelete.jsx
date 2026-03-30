import { FiSearch } from "react-icons/fi";
import { FaUsers, FaRunning } from "react-icons/fa";
import AthleteGrid from "./atheletegrid";

export default function FindAthlete() {
  return (
    <div className="featuredSections">

      <section className="findAthleteSection">
        <div className="findAthleteContainer">

          <div className="findBox">

            <div className="findField">
              <label>ATHLETE NAME</label>

              <div className="inputWrap">
                <FiSearch className="inputIcon" />
                <input
                  type="text"
                  placeholder="Search name..."
                />
              </div>
            </div>

         
            <div className="findField">
              <label>CLUB / ASSOCIATION</label>

              <div className="inputWrap">
                <FaUsers className="inputIcon" />
                <select>
                  <option>All Clubs</option>
                  <option>Selangor Club</option>
                  <option>Kuala Lumpur Club</option>
                </select>
              </div>
            </div>

            
            <div className="findField">
              <label>DISCIPLINE</label>

              <div className="inputWrap">
                <FaRunning className="inputIcon" />
                <select>
                  <option>All Disciplines</option>
                  <option>Bi-fins</option>
                  <option>Surface</option>
                </select>
              </div>
            </div>

           
            <div className="findButtonWrap">
              <button className="findBtns">
                <FiSearch /> Find Athlete
              </button>
            </div>

          </div>

        </div>
      </section>

      <AthleteGrid />

    </div>
  );
}