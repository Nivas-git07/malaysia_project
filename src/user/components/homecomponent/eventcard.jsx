import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function EventCardX({ id,bg, title, date, location }) {
  const navigate = useNavigate();

  return (
    <div className="mfsaEventX-card">
      {/* IMAGE */}
      <div className="mfsaEventX-imgWrap">
        <img src={bg} alt="event" />

        {/* DATE BADGE */}
        <div className="mfsaEventX-date">{date}</div>
      </div>

      {/* CONTENT */}
      <div className="mfsaEventX-body">
        <h3 className="mfsaEventX-title">{title}</h3>

        <div className="mfsaEventX-location">
          <FiMapPin />
          <span>{location}</span>
        </div>

        <button
          className="mfsaEventX-btn"
          onClick={() => navigate(`/eventview/${id}`)}
        >
          Register Now
        </button>
      </div>
    </div>
  );
}
