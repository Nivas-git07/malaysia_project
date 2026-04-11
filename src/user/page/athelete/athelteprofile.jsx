import Footer from "../../layout/footer";
import SwimmerHero from "../../layout/hero";

import AthleteProfile from "../../components/profile/profilesection";
import AthletePerformance from "../../components/profile/performance";
import { useParams } from "react-router-dom";
import { getclubathlete } from "../../api/club";
import { useQuery } from "@tanstack/react-query";
export default function Athelete() {
  const { stateId, clubId } = useParams();
  const {
    data: athleteData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["clubAthlete", clubId],
    queryFn: () => getclubathlete(clubId),
    enabled: !!clubId,
    retry: false,
  });

  return (
    <div>
      <SwimmerHero>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Cameron Williamson</h1>
        </div>
      </SwimmerHero>

      <AthleteProfile />
      <AthletePerformance />

      <Footer />
    </div>
  );
}
