import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeAbout from "../../components/homecomponent/homeabout";
import UpcomingEvents from "../../components/homecomponent/upcomingevent";
import HomeRecords from "../../components/homecomponent/homerecord";
import BestRecords from "../../components/homecomponent/bestrecord";
import Footer from "../../layout/footer";
import HomeGallery from "../../components/homecomponent/homegallery";
import HomeNews from "../../components/homecomponent/homenews";
import Swimmer from "../../layout/swimmer";
import Homeassoc from "../../components/homecomponent/assosiationstate";
import HomeClub from "../../components/homecomponent/clubcard";
import { NavLink } from "react-router-dom";
import { getclubpage } from "../../api/club";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Unauthorized from "../../components/unauthorize/unauthorized";
import { get_content } from "../../api/home_api";
import { useCMSParams } from "../../../utils/cmsparam";
export default function ClubPage() {
  const location = useLocation();
  const { stateName, stateId, clubName, clubId } = useParams();

  const {
    data: clubData,
    isError,
    error,
  } = useQuery({
    queryKey: ["clubPage", clubId],
    queryFn: () => getclubpage(clubId),
    enabled: !!clubId,
    retry: false,
  });

  const params = useCMSParams("home");

  const { data: homecontent } = useQuery({
    queryKey: ["home", params],
    queryFn: () => get_content(params),
  });

  const content = homecontent?.data;

  if (!clubData && !isError) {
    return null;
  }

  if (isError || !clubId) {
    return <Unauthorized />;
  }

  const clubInfo = clubData?.data || {};
  console.log("Club Page Data:", clubInfo);
  const club_stats = clubInfo.stats || {};
  const clubcontent = clubInfo.content || {};
  const clubgallery = clubInfo.gallery || {};
  const clubnews = clubInfo.latest_news || {};
  const clubevent = clubInfo.upcoming_events || {};

  return (
    <>
      <div className="home-page" key={location.pathname}>
        <Swimmer>
          <div className="homeHeroContent">
            <h1 className="homeHeroTitle animateTitle">
              <span className="word">WELCOME</span>
              <span className="word">TO</span>

              <span className="word red">
                {clubcontent.club_name || "CLUB NAME"}
              </span>

              <br />

              <div className="next_title">
                <span className="word homeHeroBig">FINSWIMMING</span>
                <span className="word">ASSOCIATION</span>
              </div>
            </h1>

            <p className="homeHeroSub">
              {(
                homecontent?.data?.home_page_description ||
                `Welcome to the official platform of the Malaysia Finswimming Association.
Discover events, connect with athletes and clubs, and be part of a growing aquatic sports community.`
              )
                .split("\n")
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          </div>
          <nav className="heroNav">
            <ul>
              <li>
                <NavLink to={`/state/${stateId}/club/${clubId}`}>Home</NavLink>
              </li>
              <li>
                <NavLink to={`/state/${stateId}/club/${clubId}/athlete`}>
                  ATHELETES
                </NavLink>
              </li>
              <li>
                <NavLink to={`/state/${stateId}/club/${clubId}/event`}>
                  EVENTS
                </NavLink>
              </li>
              <li>
                <NavLink to={`/state/${stateId}/club/${clubId}/news`}>
                  NEWS
                </NavLink>
              </li>
              <li>
                <NavLink to={`/state/${stateId}/club/${clubId}/about`}>
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </Swimmer>
        <HomeAbout name={clubcontent.club_name} content={content}/>
        <UpcomingEvents events={clubevent} />
        <HomeRecords stats={club_stats} />
        <BestRecords />

        {/* <HomeClub /> */}
        <HomeGallery gallery={clubgallery} />
        <HomeNews news={clubnews} />
        <Footer />
      </div>
    </>
  );
}
