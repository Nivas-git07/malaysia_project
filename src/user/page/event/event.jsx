import EventsPage from "../../components/eventcomponent/allevent";
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function Event() {
  const { stateId, clubId } = useParams();

  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  return (
    <div>
      <Swimmer>
        <div className="homeHeroContent">
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
              <li>
                <NavLink to="/membership">MEMBERSHIP</NavLink>
              </li>
              <li>
                <NavLink
                  to={basePath ? `${basePath}/association` : "/association"}
                >
                  CLUBS
                </NavLink>
              </li>
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

      <EventsPage />
      <Footer />
    </div>
  );
}
