
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import AthleteProfile from "../../components/profile/profilesection";
import AthletePerformance from "../../components/profile/performance";
export default function Athelete() {
    return (
        <div>
            <Swimmer>
                <div className="homeHeroContent">
                    <h1 className="homeHeroTitle">
                        ATHELETE
                    </h1>
                </div>
            </Swimmer>

            <AthleteProfile />

            <AthletePerformance/>

            <Footer />

        </div>
    )
}