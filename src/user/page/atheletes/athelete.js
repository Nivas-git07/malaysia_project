
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import FeaturedAthletes from "../../components/athletecomponent/featuredathelete";
import FindAthlete from "../../components/athletecomponent/findathelete";
export default function Athelete() {
    return (
        <div>
            <Swimmer>
                <div className="homeHeroContent">
                    <h1 className="homeHeroTitle">
                        ATHELETS
                    </h1>
                </div>
            </Swimmer>
            <FeaturedAthletes />
            <FindAthlete />


            <Footer />

        </div>
    )
}