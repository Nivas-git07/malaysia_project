import Swimmer from "../../layout/swimmer";
import AboutPageX from "../../components/aboutcomponent/aboutcontent";
import Footer from "../../layout/footer";
import { NavLink, useParams } from "react-router-dom";
export default function About() {
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
          <h1 className="homeHeroTitle">ABOUT US</h1>
          <p className="homeHeroSub">
            Learn more about our mission, vision, and the values that drive our
            organization.
            <br />
            We are committed to building a strong community by supporting
            athletes, clubs, and regional associations.
          </p>
        </div>
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
                <NavLink to={basePath ? `${basePath}/event` : `/event`}>
                  EVENTS
                </NavLink>
              </li>
              <li>
                <NavLink to={basePath ? `${basePath}/news` : `news`}>
                  NEWS
                </NavLink>
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
      <AboutPageX />
      <Footer />
    </>
  );
}
