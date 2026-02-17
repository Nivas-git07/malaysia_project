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