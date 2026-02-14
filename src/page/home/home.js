import Navbar from "../../layout/navbar";
import Head from "../../layout/header";
import HomeAbout from "../../components/homeabout";
import UpcomingEvents from "../../components/upcomingevent";
import HomeRecords from "../../components/homerecord";
import BestRecords from "../../components/bestrecord";
import Footer from "../../layout/footer";
import HomeGallery from "../../components/homegallery";
export default function Home() {
    return (
        <div className="home-page">
            <section className="hero">
                <Head />
                <Navbar />
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


            </section>
            <HomeAbout />
            <UpcomingEvents/>
            <HomeRecords/>
            <BestRecords />
            <HomeGallery/>
            <Footer/>
        </div>
    )
}