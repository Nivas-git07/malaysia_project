
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import AthleteProfile from "../../components/profile/profilesection";
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

            <Footer />

        </div>
    )
}