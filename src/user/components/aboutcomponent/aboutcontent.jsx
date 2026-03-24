import { FaFlag, FaEye } from "react-icons/fa";

export default function AboutPageX() {
  return (
    <section className="mfsaAboutPageX-section">
      <div className="mfsaAboutPageX-container">
        {/* ===== TOP CARD ===== */}
        <div className="mfsaAboutPageX-topCard">
          {/* LEFT TEXT */}
          <div className="mfsaAboutPageX-left">
            <span className="mfsaAboutPageX-sub">INTRODUCTION</span>

            <h2 className="mfsaAboutPageX-title">
              About Johor Finswimming Association
            </h2>

            <p>
              The Johor Finswimming Association (JFA) is the premier governing
              body dedicated to the advancement and regulation of finswimming in
              the state of Johor. Established with a commitment to sporting
              excellence, we provide a structured platform for athletes to
              thrive.
            </p>

            <p>
              Our association is focused on fostering a culture of discipline,
              health, and high performance, ensuring Johor remains a powerhouse
              in Malaysian aquatic sports.
            </p>
            <p>
              Through strategic programs, certified coaching systems, and
              competitive exposure, the association aims to nurture talent and
              elevate performance standards. JFA collaborates with national and
              international bodies to ensure that athletes receive opportunities
              to compete at the highest levels.
            </p>
          </div>

          {/* RIGHT VISUAL */}
          <div className="mfsaAboutPageX-right">
            <div className="mfsaAboutPageX-circle">
              <div className="mfsaAboutPageX-innerCircle">
                {/* simple decorative icon */}
                <span className="mfsaAboutPageX-line"></span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM CARDS ===== */}
        <div className="mfsaAboutPageX-bottom">
          {/* MISSION */}
          <div className="mfsaAboutPageX-card">
            <div className="mfsaAboutPageX-icon">
              <FaFlag />
            </div>

            <h3>OUR MISSION</h3>

            <p>
              To cultivate a world-class finswimming ecosystem in Johor by
              identifying raw talent, providing professional coaching, and
              organizing competitive events.
            </p>
            <p>
              To cultivate a world-class finswimming ecosystem in Johor by
              identifying raw talent, providing professional coaching, and
              organizing competitive events.
            </p>
          </div>

          {/* VISION */}
          <div className="mfsaAboutPageX-card">
            <div className="mfsaAboutPageX-icon red">
              <FaEye />
            </div>

            <h3>OUR VISION</h3>

            <p>
              To be the leading finswimming association in Southeast Asia,
              recognized for producing elite athletes and championing the sport
              globally.
            </p>
            <p>
              To be the leading finswimming association in Southeast Asia,
              recognized for producing elite athletes and championing the sport
              globally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
