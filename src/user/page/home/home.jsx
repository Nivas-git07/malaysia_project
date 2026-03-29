import HomeAbout from "../../components/homecomponent/homeabout";
import UpcomingEvents from "../../components/homecomponent/upcomingevent";
import HomeRecords from "../../components/homecomponent/homerecord";
import BestRecordsX from "../../components/homecomponent/bestrecord";
import Footer from "../../layout/footer";
import HomeGallery from "../../components/homecomponent/homegallery";
import HomeNews from "../../components/homecomponent/homenews";
import Swimmer from "../../layout/swimmer";
import StateNetworkX from "../../components/homecomponent/assosiationstate";
export default function Home() {
  return (
    <div className="home-page">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            veritatis necessitatibus earum
            <br />V ivamus vehicula, lorem a porttitor porttitor, velit erat
            .amet consectetur adipisicing elit lorem
          </p>

          <div className="heroBtnGroupX">
            <button className="heroBtnX primaryBtnX">Learn More</button>
            <button className="heroBtnX outlineBtnX">Join Membership</button>
          </div>
        </div>
      </Swimmer>
      <HomeAbout name="Malaysia" />
      <HomeRecords />
      <UpcomingEvents />

      <BestRecordsX />
      <StateNetworkX />
      <HomeGallery />
      <HomeNews />
      <Footer />
    </div>
  );
}
