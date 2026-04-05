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
              Welcome to the official platform of the{" "}
              {clubcontent.club_name || "CLUB NAME"} Finswimming Association.
              <br />
              Discover events, connect with athletes and clubs, and be part of a
              growing aquatic sports community.
            </p>
          </div>
          <nav className="heroNav">
            <ul>
              <li>
                <NavLink to={`/state/${stateId}/club/${clubId}`}>Home</NavLink>
              </li>
              <li>
                <NavLink to={`/state/${stateId}/club/${clubId}/athletes`}>
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
        <HomeAbout name={decodeURIComponent(location.pathname.split("/")[3])} />
        <UpcomingEvents />
        <HomeRecords stats={club_stats} />
        <BestRecords />

        {/* <HomeClub /> */}
        <HomeGallery />
        <HomeNews />
        <Footer />
      </div>
    </>
  );
}
