import { FaFlag, FaEye } from "react-icons/fa";
import { getclubabout } from "../../api/club";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export default function AboutPageX() {
  const { clubId, stateId } = useParams();

  const { data: aboutData } = useQuery({
    queryKey: ["aboutPage", clubId, stateId],
    queryFn: () => getclubabout({ clubId, stateId }),
    enabled: !!clubId || !!stateId,
  });

  const aboutInfo = aboutData?.data || null;
  console.log("Club About Data:", aboutInfo);

  return (
    <section className="mfsaAboutPageX-section">
      <div className="mfsaAboutPageX-container">
        <div className="mfsaAboutPageX-topCard">
          <div className="mfsaAboutPageX-left">
            <span className="mfsaAboutPageX-sub">INTRODUCTION</span>

            <h2 className="mfsaAboutPageX-title">
              {aboutInfo?.club_name
                ? `About ${aboutInfo.club_name}`
                : "About Malaysia Finswimming Association"}
            </h2>

            <p>
              {aboutInfo?.about ||
                "This association is dedicated to the advancement of finswimming and the development of athletes through structured programs and competitions.  Through strategic programs, certified coaching systems, and competitive exposure, the association aims to nurture talent and elevate performance standards. JFA collaborates with national and international bodies to ensure that athletes receive opportunities to compete at the highest levels."}
            </p>

            <p>
              {aboutInfo?.description ||
                "We focus on discipline, performance, and athlete growth, ensuring a strong foundation for competitive success."}
            </p>
          </div>

          <div className="mfsaAboutPageX-right">
            <div className="mfsaAboutPageX-circle">
              <div className="mfsaAboutPageX-innerCircle">
                <span className="mfsaAboutPageX-line"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="mfsaAboutPageX-bottom">
          <div className="mfsaAboutPageX-card">
            <div className="mfsaAboutPageX-icon">
              <FaFlag />
            </div>

            <h3>OUR MISSION</h3>

            <p>
              {aboutInfo?.mission ||
                "To cultivate a world-class finswimming ecosystem in Johor by identifying raw talent, providing professional coaching, and organizing competitive events."}
            </p>
          </div>

          <div className="mfsaAboutPageX-card">
            <div className="mfsaAboutPageX-icon red">
              <FaEye />
            </div>

            <h3>OUR VISION</h3>

            <p>
              {aboutInfo?.vision ||
                "To be the leading finswimming association in Southeast Asia, recognized for producing elite athletes and championing the sport globally."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
