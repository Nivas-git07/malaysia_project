import { Template } from "./swimmer/template";
import Footer from "../../user/layout/footer";
export default function Aboutpreview({ data }) {
  return (
    <>
      <Template>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">ABOUT US</h1>
          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat
          </p>
        </div>
      </Template>
      <AboutPageX />

      <Footer />
    </>
  );
}
