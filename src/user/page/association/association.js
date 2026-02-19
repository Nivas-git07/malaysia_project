
import Footer from "../../layout/footer";
import Swimmer from "../../layout/swimmer";
import AssociatedStates from "../../components/associatecomponent/associatedstate";
export default function Association() {
    return (
        <div>
            <Swimmer>
                <div className="homeHeroContent">
                    <h1 className="homeHeroTitle">
                        Associated States
                    </h1>
                </div>
            </Swimmer>
            <AssociatedStates />
            <Footer />

        </div>
    )
}