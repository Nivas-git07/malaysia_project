import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";

import AthleteProfile from "../../components/profile/profilesection";
import AthletePerformance from "../../components/profile/performance";
import { useParams } from "react-router-dom";
import { get_athlete_profile } from "../../api/home_api";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
export default function Athelete() {
  const { id } = useParams();
   const { stateId, clubId } = useParams();
  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  const isClub = !!clubId;
  const isState = !!stateId && !clubId;
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
        {basePath && (
          <nav className="heroNav">
            <ul>
              {isState && (
                <li>
                  <NavLink to={`/state/${stateId}`}>Home</NavLink>
                </li>
              )}
              {isClub && (
                <li>
                  <NavLink to={`/state/${stateId}/club/${clubId}`}>
                    Home
                  </NavLink>
                </li>
              )}

              {isState && (
                <li>
                  <NavLink to={`${basePath}/association`}>CLUBS</NavLink>
                </li>
              )}

              {isClub && (
                <li>
                  <NavLink to={`${basePath}/athlete`}>ATHLETES</NavLink>
                </li>
              )}
              <li>
                <NavLink to={basePath ? `${basePath}/event` : "/event"}>
                  EVENTS
                </NavLink>
              </li>
              <li>
                <NavLink to={basePath ? `${basePath}/news` : "/news"}>
                  NEWS
                </NavLink>
              </li>
              <li>
                <NavLink to={basePath ? `${basePath}/about` : "/about"}>
                  ABOUT
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </Swimmer>

      <AthleteProfile athlete={athlete} records={athlete_records} />
      <AthletePerformance performanceData={records}/>

      <Footer />
    </div>
  );
}
