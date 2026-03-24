import Swimmer from "../../layout/swimmer";
import AboutPage from "../../components/aboutcomponent/aboutcontent";
import Footer from "../../layout/footer";
import ContactX from "../../components/contactcomponent/contactpage";
import FollowSectionX from "../../components/contactcomponent/followsection";
export default function Contact() {
  return (
    <>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">Contact US</h1>
          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat
          </p>
        </div>
      </Swimmer>
      <ContactX />
      <FollowSectionX />

      <Footer />
    </>
  );
}
