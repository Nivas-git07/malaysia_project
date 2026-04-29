import img from "../../assets/event3.png";
import {
  FaMedal,
  FaUserCheck,
  FaChalkboardTeacher,
  FaUsers,
} from "react-icons/fa";

export default function WhyJoinMFSA() {
  return (
    <section className="mfsaWhyJoin-section">
      <div className="mfsaWhyJoin-container">
        <div className="mfsaWhyJoin-left">
          <img src={img} alt="mfsa" />

          <div className="mfsaWhyJoin-badge">
            <FaMedal className="icon" />
            <div>
              <p>National Federation</p>
              <span>Official Governing Body</span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="mfsaWhyJoin-right">
          <h2>Why Join MFSA?</h2>

          <div className="mfsaWhyJoin-list">
            <div className="item">
              <div className="iconBox">
                <FaMedal />
              </div>
              <div>
                <h4>Access to national competitions</h4>
                <p>
                  Participate in sanctioned events and climb the national
                  leaderboards.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="iconBox">
                <FaUserCheck />
              </div>
              <div>
                <h4>Official athlete recognition</h4>
                <p>
                  Get verified membership cards and official ranking in the
                  national database.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="iconBox">
                <FaChalkboardTeacher />
              </div>
              <div>
                <h4>Training & development programs</h4>
                <p>
                  Exclusive workshops with top-tier coaches and international
                  experts.
                </p>
              </div>
            </div>

            <div className="item">
              <div className="iconBox">
                <FaUsers />
              </div>
              <div>
                <h4>Community & networking</h4>
                <p>
                  Connect with fellow athletes, coaches, and enthusiasts across
                  Malaysia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
