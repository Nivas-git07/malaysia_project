import { FaMapMarkerAlt, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function FollowSectionX() {
  return (
    <section className="mfsaFollowX-section">

      <div className="mfsaFollowX-container">

        {/* LEFT SIDE */}
        <div className="mfsaFollowX-left">

          {/* MAP BACKGROUND */}
          <div className="mfsaFollowX-map">

            {/* FLOAT CARD */}
            <div className="mfsaFollowX-locationCard">
              <div className="mfsaFollowX-locIcon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h4>National Aquatics Centre</h4>
                <p>Kuala Lumpur, Malaysia</p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="mfsaFollowX-right">

          <span className="mfsaFollowX-sub">CONNECT WITH US</span>

          <h2 className="mfsaFollowX-title">
            Follow our Journey
          </h2>

          <p className="mfsaFollowX-text">
            Stay updated with the latest national trials, international competition results,
            and behind-the-scenes athlete training on our social platforms.
          </p>

          {/* SOCIAL BUTTONS */}
          <div className="mfsaFollowX-socialGrid">

            <div className="mfsaFollowX-socialBtn">
              <FaFacebookF />
              <span>Facebook</span>
            </div>

            <div className="mfsaFollowX-socialBtn">
              <FaInstagram />
              <span>Instagram</span>
            </div>

            <div className="mfsaFollowX-socialBtn">
              <FaYoutube />
              <span>YouTube</span>
            </div>

            <div className="mfsaFollowX-socialBtn">
              <FaTwitter />
              <span>Twitter</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}