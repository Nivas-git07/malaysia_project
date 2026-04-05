import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import { useParams } from "react-router-dom";
import NewsDetailX from "../../components/newscomponent/newsdetails";
import { NavLink } from "react-router-dom";
export default function News() {
  const { stateId, clubId } = useParams();

  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  return (
    <>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">News</h1>
          <p className="homeHeroSub">
            Discover the latest updates, stories, and highlights from across our
            network.
            <br />
            From major events to key announcements — stay informed and
            connected.
          </p>
          {basePath && (
            <nav className="heroNav">
              <ul>
                <li>
                  <NavLink to="/membershipabout">MEMBERSHIP</NavLink>
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
        </div>
      </Swimmer>
      <NewsDetailX />

      <Footer />
    </>
  );
}
