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
                  FaAddressCard

                </div>


            </div>
        </>
    );
}

export default AthleteProfile;