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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat
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
                <NavLink to="/events">EVENTS</NavLink>
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
      <AboutPageX />
      <Footer />
    </>
  );
}
