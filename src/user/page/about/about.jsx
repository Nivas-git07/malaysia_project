import Swimmer from "../../layout/swimmer"
import AboutPage from "../../components/aboutcomponent/aboutcontent"
import Footer from "../../layout/footer"
export default function About() {
    return (
        <>
            <Swimmer>
                <div className="homeHeroContent">
                    <h1 className="homeHeroTitle">
                        ABOUT US
                    </h1>
                </div>
            </Swimmer>
            <AboutPage/>
            <Footer/>
        </>
    )
}