import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getclubabout } from "../../api/club";
import { FaFlag, FaEye } from "react-icons/fa";

export default function AboutPageX({ aboutInfo }) {
  const { clubId, stateId } = useParams();
  console.log(aboutInfo);
 

  return (
    <section className="mfsaAboutPageX-section">
      <div className="mfsaAboutPageX-container">
        <div className="mfsaAboutPageX-topCard">
          <div className="mfsaAboutPageX-left">
            <span className="mfsaAboutPageX-sub">INTRODUCTION</span>

            <h2 className="mfsaAboutPageX-title">
              {aboutInfo?.club_name
                ? `About ${aboutInfo.club_name}`
                : aboutInfo?.state_name
                  ? `About ${aboutInfo.state_name}`
                  : "About"}
            </h2>

            {aboutInfo?.about ? (
              <p>{aboutInfo.about}</p>
            ) : (
              <div className="mfsaEmptyBoxs">
                <p>No about content available.</p>
              </div>
            )}

            {aboutInfo?.description && <p>{aboutInfo.description}</p>}
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

            {aboutInfo?.mission ? (
              <p>{aboutInfo.mission}</p>
            ) : (
              <div className="mfsaEmptyBoxs">
                <p>No mission defined.</p>
              </div>
            )}
          </div>

          <div className="mfsaAboutPageX-card">
            <div className="mfsaAboutPageX-icon red">
              <FaEye />
            </div>

            <h3>OUR VISION</h3>

            {aboutInfo?.vision ? (
              <p>{aboutInfo.vision}</p>
            ) : (
              <div className="mfsaEmptyBoxs">
                <p>No vision defined.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
