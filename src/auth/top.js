import Navbar from "../layout/navbar";
import Head from "../layout/header";
import video from "../assets/animate2.mp4"
export default function Header() {
  return (
    <section className="hero">
      <Head />
      <Navbar />
      <video
        className="heroVideo"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={video} type="video/mp4" />
      </video>  

      <div className="container heroContent">
        <div className="left">
          <h1>
            JOIN THE MALAYSIA <br />
            <span className="red">FINSWIMMING</span><br />
            ASSOCIATION
          </h1>


        </div>

        <div className="right">
          <p>
            Register as a <br />
            State, Club, or <br />
            <span className="red">Individual Athlete</span>
          </p>
        </div>
      </div>

    </section>
  );
}
