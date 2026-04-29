import SwimmerHero from "../../layout/hero";
import AboutPageX from "../../components/aboutcomponent/aboutcontent";
import Footer from "../../layout/footer";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getclubabout } from "../../api/club";
export default function About() {
  const { stateId, clubId } = useParams();
  const isClub = !!clubId;
  const isState = !!stateId && !clubId;
  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

  const { data: aboutData, isLoading } = useQuery({
    queryKey: ["aboutPage", clubId, stateId],
    queryFn: () => getclubabout({ clubId, stateId }),
    
  });

  const aboutInfo = aboutData?.data;
  console.log("the about page content ",aboutInfo)
  return (
    <>
      <SwimmerHero>
        <div className="homeHeroContents">
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
                <NavLink to={basePath ? `${basePath}/about` : "/about"}>
                  ABOUT
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </SwimmerHero>
      <AboutPageX aboutInfo={aboutInfo} />
      <Footer />
    </>
  );
}
