import Swimmer from "../../layout/swimmer";
import AboutPageX from "../../components/aboutcomponent/aboutcontent";
import Footer from "../../layout/footer";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getclubabout } from "../../api/club";
import { get_content } from "../../api/home_api";
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
  console.log("the about page content ", aboutInfo);

  const { data: other } = useQuery({
    queryKey: ["others"],
    queryFn: () =>
      get_content({
        page: "others",
        national: "national_page",
      }),
  }); 

  const contactcontent = other?.data;

  console.log(contactcontent);
  return (
    <>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">ABOUT US</h1>
          <p className="homeHeroSub">
            {(
              contactcontent?.aboutus_page_description ||
              "Learn more about our mission, vision, and the values that drive our organization.\nWe are committed to building a strong community by supporting athletes, clubs, and regional associations."
            )
              .split(/\r?\n/)
              .map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i !== arr.length - 1 && <br />}
                </span>
              ))}
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
      </Swimmer>
      <AboutPageX aboutInfo={aboutInfo} />
      <Footer />
    </>
  );
}
