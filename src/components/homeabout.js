import aboutImg from "../assets/image1.jpg";

export default function HomeAbout(){
  return(

    <section className="homeAboutSection">

      <div className="homeAboutContainer">

        {/* LEFT CONTENT */}
        <div className="homeAboutLeft">

          <h3 className="homeAboutHeading">
            ABOUT  FINSWIMMING Association
          </h3>

          <h2 className="homeAboutTitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula,
          </h2>

          <p className="homeAboutPara">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula,
            lorem a porttitor porttitor, velit erat tincidunt lorem, in pulvinar justo
            turpis vitae eros. Curabitur nec nisi in ipsum dignissim lacinia.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="homeAboutRight">
          <img src={aboutImg} alt="about swimmer"/>
        </div>

      </div>

    </section>

  )
}
