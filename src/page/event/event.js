import video from "../../assets/animate2.mp4"
import Head from "../../layout/header";
import Navbar from "../../layout/navbar";
export default function Event() {
    return (
        <div>
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

                        ALL EVENTS

                    </h1>



                </div>


            </section>
        </div>
    )
}