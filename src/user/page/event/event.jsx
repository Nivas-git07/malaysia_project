import EventsPage from "../../components/eventcomponent/allevent";
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
export default function Event() {
  return (
    <div>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle"> Upcoming Event</h1>
          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt commodi 
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat amet consectetur
          </p>
        </div>
      </Swimmer>

      <EventsPage />
      <Footer />
    </div>
  );
}
