import HomeAbout from "../../components/homecomponent/homeabout";
import UpcomingEvents from "../../components/homecomponent/upcomingevent";
import HomeRecords from "../../components/homecomponent/homerecord";
import BestRecords from "../../components/homecomponent/bestrecord";
import Footer from "../../layout/footer";
import HomeGallery from "../../components/homecomponent/homegallery";
import HomeNews from "../../components/homecomponent/homenews";
import Swimmer from "../../layout/swimmer";
export default function Home() {
    return (
        <div className="home-page">
            <Swimmer>
                <div className="homeHeroContent">

                    <h1 className="homeHeroTitle">
                        WELCOME TO <span className="red">MALAYSIA</span>
                        <br />
                        <div className="next_title">
                            <span className="homeHeroBig">FINSWIMMING</span> ASSOCIATION
                        </div>

                    </h1>

                    <p className="homeHeroSub">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        <br />
                        Vivamus vehicula, lorem a porttitor porttitor, velit erat
                    </p>

                </div>
            </Swimmer>
            <HomeAbout />
            <UpcomingEvents />
            <HomeRecords />
            <BestRecords />
            <HomeGallery />
            <HomeNews />
            <Footer />
        </div>
    )
}