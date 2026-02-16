import Swimmer from "../../layout/swimmer"
import Footer from "../../layout/footer"
import EventDetails from "../../components/eventcomponent/eventdetails"
export default function Eventview() {
    return (
        <div className="event-description">
            <Swimmer>
                <div className="homeHeroContent">
                    <h1 className="homeHeroTitle">
                        EVENT DETAILS
                    </h1>
                </div>
            </Swimmer>
            <EventDetails />
            <Footer />
        </div>
    )
}