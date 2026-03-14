import Navbar from "../navbar/nav";
import AthleteCard from "../../components/athletecard";
import { getAthletes } from "../../api/athlete_api";
import { useQuery } from "@tanstack/react-query";
import useQueryClient from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AthleteProfile() {
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
            <div>
                <Navbar />
                <div className="mu-membership-wrapper">
                    <div className="EventReport">Profile </div>
                    <div className="athleteProfileCard">
                        <AthleteCard />

                        <div className="athleteCard">
                            <div className="EventReport">Performance </div>

                            <div className="athleteFilters">

                                <select className="filterSelect" name="gender" onChange={handleFilterChange}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>

                                <select className="filterSelect" name="discipline" onChange={handleFilterChange}>
                                    <option value="">Select Discipline</option>
                                    <option value="freestyle">Freestyle</option>
                                    <option value="butterfly">Butterfly</option>
                                    <option value="backstroke">Backstroke</option>
                                    <option value="breaststroke">Breaststroke</option>
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
                                <div className="profileHead">
                                    <div>Event</div>
                                    <div>Best Time</div>
                                    <div>Rank</div>
                                    <div>Competition</div>
                                    <div>Date</div>
                                </div>

                                {filteredData.map((item, i) => (
                                    <div className="athleteprofileRow" key={i}>
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

                </div>


            </div>
        </>
    );
}

export default AthleteProfile;