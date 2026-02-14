import Navbar from "../layout/navbar";
import Head from "../layout/header";

export default function Header() {
  return (
    <section className="hero">
      <Head/>
      <Navbar />
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
