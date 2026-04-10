import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import EventDetailX from "../../components/eventcomponent/eventdetails";
import Navbar from "../../layout/navbar";
export default function Eventview() {
  return (
    
    <div className="event-description">
      <Navbar />
      {/* <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">EVENT DETAILS</h1>

          <p className="homeHeroSub">
            Get complete information about this event, including schedule,
            venue, and participation details.
            <br />
            Stay informed and be prepared to take part in this exciting event.
          </p>
        </div>
      </Swimmer> */}
      <EventDetailX />
      <Footer />
    </div>
  );
}
