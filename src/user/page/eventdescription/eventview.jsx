import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import EventDetailX from "../../components/eventcomponent/eventdetails";
export default function Eventview() {
  return (
    <div className="event-description">
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">EVENT DETAILS</h1>

          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            commodi
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat amet
            consectetur
          </p>
        </div>
      </Swimmer>
      <EventDetailX />
      <Footer />
    </div>
  );
}
