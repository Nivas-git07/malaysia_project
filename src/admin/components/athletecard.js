
import { FaTrophy, FaMedal } from "react-icons/fa";
import profile from "../assets/profile.png";

export default function AthleteCard() {
  return (
    <div className="athlete-card">

      {/* Image */}
      <div className="athlete-card-image">
        <img src={profile} alt="athlete"/>
      </div>

      {/* Content */}
      <div className="athlete-card-content">

        <h2 className="athlete-card-name">JANE COOPER</h2>

        {/* Info */}
        <div className="athlete-card-info">

          <div className="athlete-card-info-item">
            <span className="athlete-card-label">DATE OF BIRTH</span>
            <span className="athlete-card-value">09 / 05 / 2000</span>
          </div>

          <div className="athlete-card-info-item">
            <span className="athlete-card-label">COUNTRY</span>
            <span className="athlete-card-value">Sweden</span>
          </div>

        </div>

        {/* Discipline */}
        <div className="athlete-card-discipline">
          <span className="athlete-card-label">DISCIPLINE</span>
          <span className="athlete-card-value">
            500m Surface, Bi-fins Specialist
          </span>
        </div>

        {/* Medal Section */}
        <div className="athlete-card-medals">

          <div className="athlete-card-medal athlete-medal-total">
            <FaTrophy className="athlete-medal-icon"/>
            <div>
              <h3>12</h3>
              <p>MEDALS</p>
            </div>
          </div>

          <div className="athlete-card-medal athlete-medal-gold">
            <FaMedal className="athlete-medal-icon"/>
            <div>
              <h3>1</h3>
              <p>GOLD</p>
            </div>
          </div>

          <div className="athlete-card-medal athlete-medal-silver">
            <FaMedal className="athlete-medal-icon"/>
            <div>
              <h3>5</h3>
              <p>SILVER</p>
            </div>
          </div>

          <div className="athlete-card-medal athlete-medal-bronze">
            <FaMedal className="athlete-medal-icon"/>
            <div>
              <h3>6</h3>
              <p>BRONZE</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}