import Navbar from "../user/layout/navbar";
import Head from "../user/layout/header";
import video from "../assets/animate2.mp4"
import Swimmer from "../user/layout/swimmer";
export default function Header() {
  return (
    <Swimmer>
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
    </Swimmer>
  );
}
