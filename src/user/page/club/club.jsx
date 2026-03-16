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
import HomeClub from "../../components/homecomponent/clubcard";
export default function ClubPage() {

    const location = useLocation();

    

    return (
        <>
            <div className="home-page" key={location.pathname}>
                <Swimmer >
                    <div className="homeHeroContent">

                        <h1 className="homeHeroTitle animateTitle">

                            <span className="word">WELCOME</span>
                            <span className="word">TO</span>

                            <span className="word red">{decodeURIComponent(location.pathname.split("/")[2])}</span>

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
                <HomeAbout name={decodeURIComponent(location.pathname.split("/")[2])} />
                <UpcomingEvents />
                <HomeRecords />
                <BestRecords />
            
                {/* <HomeClub /> */}
                <HomeGallery />
                <HomeNews />
                <Footer />
            </div>

        </>
    );
}