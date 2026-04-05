import { useQuery } from "@tanstack/react-query";
import { getclubathlete } from "../../api/club";
import { useParams } from "react-router-dom";
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import FeaturedAthletes from "../../components/athletecomponent/featuredathelete";
import FindAthlete from "../../components/athletecomponent/atheletegrid";
import { NavLink } from "react-router-dom";
export default function ALLAthelete() {
  const { stateId, clubId } = useParams();
  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  const isClub = !!clubId;
  const isState = !!stateId && !clubId;

  const { data: athleteData, isError } = useQuery({
    queryKey: ["clubAthlete", clubId],
    queryFn: () => getclubathlete(clubId),
    enabled: !!clubId,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const athletes = athleteData?.data || [];

  if (!athleteData && !isError) return null;

  if (isError || !clubId) {
    return (
      <div className="emptyState">
        <h3>Failed to load athletes</h3>
      </div>
    );
  }

  return (
    <div>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">ALL ATHLETES</h1>
          <p className="homeHeroSub">
            Explore all athletes from this club.
            <br />
            Discover talents, achievements, and profiles.
          </p>
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

      {athletes.length > 0 ? (
        <>
          <FeaturedAthletes data={athletes} />
          <FindAthlete data={athletes} />
        </>
      ) : (
        <div className="emptyState">
          <div className="emptyIcon">🏊‍♂️</div>

          <h3>No Athletes Found</h3>

          <p>
            This club hasn’t added any athletes yet.
            <br />
            Please check back later.
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}
