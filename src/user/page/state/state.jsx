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
import { NavLink, useLocation } from "react-router-dom";
import { get_state_page } from "../../api/state";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export default function StatePage() {
  const location = useLocation();
  const { stateName, stateId } = useParams();

  const { data: stateData } = useQuery({
    queryKey: ["statePage", stateId],
    queryFn: () => get_state_page(stateId),
  });
  const stateInfo = stateData?.data || {};
  const state_stats = stateInfo.stats || {};

  const statecontent = stateInfo.content || {};

  console.log("State Page Data:", stateData);

  return (
    <>
      <div className="home-page" key={location.pathname}>
        <Swimmer>
          <section className="hero">
            <video autoPlay muted loop className="heroVideo">
              <source src="/your-video.mp4" type="video/mp4" />
            </video>

            <div className="homeHeroContent">
              <h1 className="heroTitle animateTitle">
                <span className="word">WELCOME</span>
                <span className="word">TO</span>

                <span className="word red">
                  {statecontent.state_name || "STATE NAME"}
                </span>

                <br />

                <div className="next_title">
                  <span className="word homeHeroBig">FINSWIMMING</span>
                  <span className="word">ASSOCIATION</span>
                </div>
              </h1>

              <p className="heroSubtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                Vivamus vehicula, lorem a porttitor porttitor.
              </p>
            </div>

            <nav className="heroNav">
              <ul>
                <li>
                  <NavLink to="/membership">MEMBERSHIP</NavLink>
                </li>
                <li>
                  <NavLink to={`/state/${stateId}/association`}>CLUBS</NavLink>
                </li>
                <li>
                  <NavLink to={`/state/${stateId}/event`}>EVENTS</NavLink>
                </li>
                <li>
                  <NavLink to="/news">NEWS</NavLink>
                </li>
                <li>
                  <NavLink to={`/state/${stateId}/about`}>About</NavLink>
                </li>
              </ul>
            </nav>
          </section>
        </Swimmer>
        <HomeAbout name={decodeURIComponent(location.pathname.split("/")[1])} />
        <UpcomingEvents />
        <HomeRecords stats={state_stats} />
        <BestRecords />

        <HomeClub />
        <HomeGallery />
        <HomeNews />
        <Footer />
      </div>
    </>
  );
}
