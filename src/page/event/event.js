import EventsPage from "../../components/eventcomponent/allevent";
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
export default function Event() {
    return (
        <div>
            <Swimmer>
                <div className="homeHeroContent">
                    <h1 className="homeHeroTitle">
                        ALL EVENTS
                    </h1>
                </div>
            </Swimmer>
            <EventsPage />
            <Footer />

        </div>
    )
}