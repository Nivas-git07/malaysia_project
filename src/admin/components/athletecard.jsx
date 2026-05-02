import { FaTrophy, FaMedal } from "react-icons/fa";
import profile from "../assets/profile.png";

export default function AthleteCard({ data, records }) {
  return (
    <div className="athlete-card">
      {/* Image */}
      <div className="athlete-card-image">
        <img src={profile} alt="athlete" />
      </div>

      {/* Content */}
      <div className="athlete-card-content">
        <h2 className="athlete-card-name">{data.full_name}</h2>

        {/* Info */}
        <div className="athlete-card-info">
          <div className="athlete-card-info-item">
            <span className="athlete-card-label">DATE OF BIRTH</span>
            <span className="athlete-card-value">{data.date_of_birth}</span>
          </div>
          <div className="athlete-card-info-item">
            <span className="athlete-card-label">Gender</span>
            <span className="athlete-card-value">{data.gender}</span>
          </div>

          <div className="athlete-card-info-item">
            <span className="athlete-card-label">DISCIPLINE</span>
            <span className="athlete-card-value">
              {records.primary_discipline}
            </span>
          </div>

          <div className="athlete-card-info-item">
            <span className="athlete-card-label">State</span>
            <span className="athlete-card-value">{data.state}</span>
          </div>
        </div>

        {/* Medal Section */}
        <div className="athlete-card-medals">
          <div className="athlete-card-medal athlete-medal-total">
            <FaTrophy className="athlete-medal-icon" />
            <div>
              <h3>{records.total_gold}</h3>
              <p>MEDALS</p>
            </div>
          </div>

          <div className="athlete-card-medal athlete-medal-gold">
            <FaMedal className="athlete-medal-icon" />
            <div>
              <h3>{records.total_gold}</h3>
              <p>GOLD</p>
            </div>
          </div>

          <div className="athlete-card-medal athlete-medal-silver">
            <FaMedal className="athlete-medal-icon" />
            <div>
              <h3>{records.total_silver}</h3>
              <p>SILVER</p>
            </div>
          </div>

          <div className="athlete-card-medal athlete-medal-bronze">
            <FaMedal className="athlete-medal-icon" />
            <div>
              <h3>{records.total_bronze}</h3>
              <p>BRONZE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
