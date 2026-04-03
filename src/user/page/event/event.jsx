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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            commodi
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat amet
            consectetur
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
                  to={stateId ? `${basePath}/association` : "/association"}
                >
                  CLUBS
                </NavLink>
              </li>
              <li>
                <NavLink to={stateId ? `${basePath}/event` : "/event"}>
                  EVENTS
                </NavLink>
              </li>
              <li>
                <NavLink to="/news">NEWS</NavLink>
              </li>
              <li>
                <NavLink to={stateId ? `${basePath}/about` : "/about"}>
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
