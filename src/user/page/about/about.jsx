import Swimmer from "../../layout/swimmer";
import AboutPageX from "../../components/aboutcomponent/aboutcontent";
import Footer from "../../layout/footer";
export default function About() {
  return (
    <>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">ABOUT US</h1>
          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat
          </p>
        </div>
      </Swimmer>
      <AboutPageX />
      <Footer />
    </>
  );
}
