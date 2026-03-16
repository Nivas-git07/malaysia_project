import React from "react";
import Navbar from "../navbar/nav";
import "../../style/dashboard/Home.css";
import logo from "../../assets/logo.jpg";
import { athletedata } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getathleteList } from "../../api/home_api";

export default function ClubList() {
    const { id } = useParams();
    console.log("Club ID:", id);

    const { data, isLoading, error } = useQuery({
        queryKey: ["clubList", id],
        queryFn: () => (id ? athletedata(id) : getathleteList()),
        refetchOnWindowFocus: false,
        retry: false,
    });

    const clubs_stats = data?.data.athletes_list || [];
    console.log("Club List Data:", clubs_stats, isLoading, error);

    console.log(data, isLoading, error);

    return (
        <>
            <Navbar />

            <div className="mu-membership-wrapper">
                <div className="dataTitle">DATA OVERVIEW</div>

                <div className="overviewCards">
                    <div className="overviewCard">
                        <p>Total Athletes</p>
                        <h2>{data?.data.athletes_count || 0}</h2>
                    </div>

                    <div className="overviewCard">
                        <p>Total Clubs</p>
                        <h2>{clubs_stats.total_clubs || 0}</h2>
                    </div>

                    <div className="overviewCard">
                        <p>Total Members</p>
                        <h2>{clubs_stats.total_athletes || 0} +</h2>
                    </div>
                </div>

                <div className="stateTitle">Athlete LIST</div>

                <div className="stateCard">
                    <div className="stateFilters">
                        <input placeholder="e.g., Selangor Finswimming Club" />
                        <input placeholder="--Select State--" />
                        <button className="findBtn">Find Club</button>
                    </div>

                    <div className="stateTable">
                        <div className="stateHead">
                            <div>Athlete Name</div>
                            <div>Gender</div>
                            
                            <div>DOB</div>
                            <div>Website</div>
                        </div>

                        {clubs_stats.map((club) => (
                            <div className="stateRow" key={club.id}>
                                <div className="clubCell">
                                    <img src={logo} alt="logo" />
                                    {club.full_name}
                                </div>

                                <div >
                                    {/* <img src="https://i.pravatar.cc/40" />
                                    <img src="https://i.pravatar.cc/41" />
                                    <img src="https://i.pravatar.cc/42" /> */}
                                    <span>  {club.gender} </span>
                                </div>

                                <div>{club.date_of_birth}</div>

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
            </div>
        </>
    );
}
