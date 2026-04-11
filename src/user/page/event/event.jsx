import EventsPage from "../../components/eventcomponent/allevent";
import Footer from "../../layout/footer";
import SwimmerHero from "../../layout/hero";

import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function Event() {
  const { stateId, clubId } = useParams();
  const isClub = !!clubId;
  const isState = !!stateId && !clubId;

  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  return (
    <div>
      <SwimmerHero>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Upcoming Event</h1>
          <p className="homeHeroSub">
            Stay updated with our upcoming events, competitions, and activities.
            <br />
            Join us and be part of exciting moments across our sports community.
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
      </SwimmerHero>

      <EventsPage />
      <Footer />
    </div>
  );
}
