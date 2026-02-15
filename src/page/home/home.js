import Navbar from "../../layout/navbar";
import Head from "../../layout/header";
import HomeAbout from "../../components/homecomponent/homeabout";
import UpcomingEvents from "../../components/homecomponent/upcomingevent";
import HomeRecords from "../../components/homecomponent/homerecord";
import BestRecords from "../../components/homecomponent/bestrecord";
import Footer from "../../layout/footer";
import HomeGallery from "../../components/homecomponent/homegallery";
import HomeNews from "../../components/homecomponent/homenews";
import video from "../../assets/animate2.mp4"
export default function Home() {
    return (
        <div className="home-page">
            <section className="hero">
                <video
                    className="heroVideo"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src={video} type="video/mp4" />
                </video>
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
            <UpcomingEvents />
            <HomeRecords />
            <BestRecords />
            <HomeGallery />
            <HomeNews />
            <Footer />
        </div>
    )
}