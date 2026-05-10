import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";

import AthleteProfile from "../../components/profile/profilesection";
import AthletePerformance from "../../components/profile/performance";
import { useParams } from "react-router-dom";
import { get_athlete_profile } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
export default function Athelete() {
  const { id } = useParams();
  const {
    data: athleteData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["Athleteprofile", id],

    queryFn: () => get_athlete_profile(id),

    enabled: !!id,

    retry: false,
  });
  console.log("Athlete Data:", athleteData?.data);

  const athlete = athleteData?.data;
  const athlete_records = athleteData?.data?.total_records;
  const records = athleteData?.data?.total_records.records_history;

  return (
    <div>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">{athlete?.full_name}</h1>
        </div>
      </Swimmer>

      <AthleteProfile athlete={athlete} records={athlete_records} />
      <AthletePerformance performanceData={records}/>

      <Footer />
    </div>
  );
}
