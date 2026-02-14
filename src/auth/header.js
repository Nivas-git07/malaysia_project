
import background from "../assets/background.png"
import { FiMail, FiPhone } from "react-icons/fi";
import Navbar from "../layout/navbar";

export default function Header() {
  return (
    <section className="hero">
      <div className="topbar">
        <div className="container topbarFlex">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          <div className="contact">

            <span className="contactItem">
              <FiMail className="contactIcon" />
              malaysia@gmail.com
            </span>

            <span className="contactDivider">|</span>

            <span className="contactItem">
              <FiPhone className="contactIcon" />
              9997776643
            </span>

          </div>

        </div>
      </div>


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
