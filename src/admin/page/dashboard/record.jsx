import Navbar from "../navbar/nav";
import { get_event_records } from "../../api/event_api";
import { useQuery } from "@tanstack/react-query";
import { get_athlete_records } from "../../api/record";
export default function Record() {
  const { data: athleteRecords } = useQuery({
    queryKey: ["athleteRecords"],
    queryFn: get_athlete_records,
  });
  console.log("Athlete Records:", athleteRecords?.data) || [];
  const athleteList = athleteRecords?.data.athletes_list || [];
  const { data: eventRecords } = useQuery({
    queryKey: ["eventRecords"],
    queryFn: get_event_records,
  });
  const records = eventRecords?.data || [];
  console.log("Event Records:", records);
  const filteredData = [
    {
      full_name: "John Doe",
      state: "California",
    },
    {
      full_name: "Jane Smith",
      state: "New York",
    },
    {
      full_name: "Michael Johnson",
      state: "Texas",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="mu-membership-wrapper">
        <div className="newsTitle">Record Entry</div>

        <div className="athleteCard">
          <div className="athleteFilters recordFilters">
            <div className="filterGroup">
              <label className="filterLabel">Event Name</label>
              <select
                className="filterSelect"
                name="event_name"
                // onChange={handleFilterChange}
              >
                <option value="">Select Event</option>
                {records.map((event) => (
                  <option key={event.id} value={event.event_name}>
                    {event.event_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">Discipline</label>
              <select
                className="filterSelect"
                name="discipline"
                // onChange={handleFilterChange}
              >
                <option value="">Select Discipline</option>
                <option value="freestyle">Freestyle</option>
                <option value="butterfly">Butterfly</option>
                <option value="backstroke">Backstroke</option>
                <option value="breaststroke">Breaststroke</option>
              </select>
            </div>

            <div className="filterGroup">
              <label className="filterLabel">Date</label>
              <input type="date" className="filterSelect" name="date" />
            </div>

            <button className="findBtn addRowBtn">Add Row</button>
          </div>
          <div className="athleteTable">
            <div className="athleteHead">
              <div>S.No</div>
              <div>Athlete Name</div>
              <div>State</div>
              <div>Medal</div>
              <div>Rank</div>
              <div>Record / Time</div>
            </div>

            {filteredData.map((item, i) => (
              <div className="athleteRow recordRow" key={i}>
                <div className="sno">{i + 1}</div>

                <div className="athleteInfo">
                  {/* <img src="https://i.pravatar.cc/60" alt="" /> */}
                  <div>
                    <select className="tableSelect">
                      <option value="">Select Athlete</option>
                      {athleteList.map((athlete) => (
                        <option key={athlete.id} value={athlete.full_name}>
                          {athlete.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>{item.state}</div>

                {/* Medal */}
                <div>
                  <select className="tableSelect">
                    <option value="">Select</option>
                    <option value="gold">🥇 Gold</option>
                    <option value="silver">🥈 Silver</option>
                    <option value="bronze">🥉 Bronze</option>
                  </select>
                </div>

                {/* Rank */}
                <div>
                  <select className="tableSelect">
                    <option value="">Rank</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>

                {/* Record / Time */}
                <div>
                  <input
                    type="text"
                    placeholder="00:00:00"
                    className="tableInput"
                  />
                </div>
              </div>
            ))}

            {/* SAVE BUTTON AREA */}
            <div className="tableFooter recordFooter">
              <button className="saveRecordBtn">Save Record</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
