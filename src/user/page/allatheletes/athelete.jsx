import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import FeaturedAthletes from "../../components/athletecomponent/featuredathelete";
import FindAthlete from "../../components/athletecomponent/findathelete";
export default function ALLAthelete() {
  return (
    <div>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">ALL ATHELETS</h1>
          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat
          </p>
        </div>
      </Swimmer>
      <FeaturedAthletes />
      <FindAthlete />

      <Footer />
    </div>
  );
}
