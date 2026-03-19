import Navbar from "../navbar/nav";
import AthleteCard from "../../components/athletecard";
import { getAthletes } from "../../api/athlete_api";
import { useQuery } from "@tanstack/react-query";
// import useQueryClient from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_athlete_particular_list } from "../../api/athlete_api";
import { useParams } from "react-router-dom";

function AthleteProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("the athlete is is", id);

  const [filters, setFilters] = useState({
    gender: "",
    discipline: "",
    state: "",
  });
  const {
    data: athleteData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["athletes"],
    queryFn: () => get_athlete_particular_list(id),
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log(athleteData, isLoading, error);
  const data = athleteData?.data || [];
  const records = athleteData?.data.total_records || [];
  console.log(data);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="mu-membership-wrapper">
          <div className="EventReport">Profile </div>
          <div className="athleteProfileCard">
            <AthleteCard data={data} records={records} />

            <div className="athleteCard">
              <div className="EventReport">Performance </div>

              {/* ===== TABLE ===== */}
              <div className="athleteTable">
                <div className="profileHead">
                  <div>Event</div>
                  <div>Best Time</div>
                  <div>Rank</div>
                  <div>Competition</div>
                  <div>Date</div>
                </div>

                {/* {filteredData.map((item, i) => (
                  <div className="athleteprofileRow" key={i}>
                    <div className="country">
                      <div className="country">{item.state}</div>
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
                  </div>
                ))} */}

                {/* FOOTER */}
                {/* <div className="tableFooter">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AthleteProfile;
