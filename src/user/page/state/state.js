import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeAbout from "../../components/homecomponent/homeabout";
import UpcomingEvents from "../../components/homecomponent/upcomingevent";
import HomeRecords from "../../components/homecomponent/homerecord";
import BestRecords from "../../components/homecomponent/bestrecord";
import Footer from "../../layout/footer";
import HomeGallery from "../../components/homecomponent/homegallery";
import HomeNews from "../../components/homecomponent/homenews";
import Swimmer from "../../layout/swimmer";
import Homeassoc from "../../components/homecomponent/assosiationstate";

export default function StatePage() {

    const location = useLocation();

    

    return (
        <>
            <div className="home-page" key={location.pathname}>
                <Swimmer >
                    <div className="homeHeroContent">

                        <h1 className="homeHeroTitle animateTitle">

                            <span className="word">WELCOME</span>
                            <span className="word">TO</span>

                            <span className="word red">{location.pathname.split("/")[1]}</span>

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
                <HomeAbout name={location.pathname.split("/")[1]} />
                <UpcomingEvents />
                <HomeRecords />
                <BestRecords />
                {/* <Homeassoc /> */}
                <HomeGallery />
                <HomeNews />
                <Footer />
            </div>

        </>
    );
}