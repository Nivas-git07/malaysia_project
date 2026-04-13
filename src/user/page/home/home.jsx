import HomeAbout from "../../components/homecomponent/homeabout";
import UpcomingEvents from "../../components/homecomponent/upcomingevent";
import HomeRecords from "../../components/homecomponent/homerecord";
import BestRecordsX from "../../components/homecomponent/bestrecord";
import Footer from "../../layout/footer";
import HomeGallery from "../../components/homecomponent/homegallery";
import HomeNews from "../../components/homecomponent/homenews";
import Swimmer from "../../layout/swimmer";
import StateNetworkX from "../../components/homecomponent/assosiationstate";
import { useQuery } from "@tanstack/react-query";
import { get_home } from "../../api/home_api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["homeData"],
    queryFn: get_home,
    staleTime: 1000 * 60 * 5, // 5 min cache
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // 🚨 IMPORTANT: don't default to [] here
  const homeData = data?.data ?? null;

  // ---------- UI STATES ----------

  if (isLoading && !homeData) {
    return (
      <div className="home-page">
        <div className="mfsaEmptyState">Loading Home...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="home-page">
        <div className="mfsaEmptyState">Failed to load data</div>
      </div>
    );
  }

  // ---------- SAFE DATA ----------
  const homeStats = homeData?.stats ?? null;
  const homeevents = homeData?.upcoming_events ?? null;
  const homenews = homeData?.latest_news ?? null;
  const homegallery = homeData?.gallery ?? null;

  return (
    <div className="home-page">
      {/* HERO */}
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle animateTitle">
            <span className="word">WELCOME</span>
            <span className="word">TO</span>

            <span className="word red">MALAYSIA</span>

            <br />

            <div className="next_title">
              <span className="word homeHeroBig">FINSWIMMING</span>
              <span className="word">ASSOCIATION</span>
            </div>
          </h1>

          <p className="homeHeroSub">
            Welcome to the official platform of the Malaysia Finswimming
            Association.
            <br />
            Discover events, connect with athletes and clubs, and be part of a
            growing aquatic sports community.
          </p>

          <div className="heroBtnGroupX">
            <button
              className="heroBtnX primaryBtnX"
              onClick={() => navigate("/membershipabout")}
            >
              Learn More
            </button>
            <button
              className="heroBtnX outlineBtnX"
              onClick={() => navigate("/register")}
            >
              Join Membership
            </button>
          </div>
        </div>
      </Swimmer>

      <HomeAbout name="Malaysia" />

    
      {homeevents && <UpcomingEvents event={homeevents} />}
      {homeStats && <HomeRecords stats={homeStats} />}

      <BestRecordsX />
      <StateNetworkX />

      {homegallery && <HomeGallery gallery={homegallery} />}
      {homenews && <HomeNews news={homenews} />}

      <Footer />
    </div>
  );
}