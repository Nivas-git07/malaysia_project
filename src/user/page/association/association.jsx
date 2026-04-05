import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import StateAssociationX from "../../components/associatecomponent/associatedstate";
// import AssociationCardGrid from "../../components/associatecomponent/AssociationCardGrid";
import { get_state } from "../../api/auth";
import { getclublist } from "../../api/state";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Association() {
  const location = useLocation();
  // const { stateName, stateId } = useParams();
  const { stateId, clubId } = useParams();
  const isClub = !!clubId;
  const isState = !!stateId && !clubId;

  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const { data: clubData } = useQuery({
    queryKey: ["clubs", stateId],
    queryFn: () => getclublist(stateId),
    enabled: !!stateId,
  });

  const states = stateData?.data || [];
  const clubs = clubData?.data || [];

  return (
    <div>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">
            {stateId ? "Associated Clubs" : "Associated States"}
          </h1>

          <p className="homeHeroSub">
            Browse verified associations and explore finswimming networks.
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

      {!stateId ? (
        <StateAssociationX data={states} type="state" />
      ) : (
        <StateAssociationX data={clubs} type="club" />
      )}

      <Footer />
    </div>
  );
}
