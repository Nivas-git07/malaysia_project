import Navbar from "../../layout/navbar";
import Head from "../../layout/header";
import HomeAbout from "../../components/homeabout";
export default function Home() {
    return (
        <div>
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
        </div>
    )
}