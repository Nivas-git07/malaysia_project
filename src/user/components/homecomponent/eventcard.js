import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function EventCard({ bg, logo, title, date, country }) {
  const navigate = useNavigate();
  return (

    <div className="eventCard">

      <img src={bg} alt="event" className="eventBg" />

      <div className="eventOverlay" />

      <div className="eventContent">

        <div className="eventLogoWrap">
          <img src={logo} alt="logo" />
        </div>

        <h3 className="eventcardTitle">
          {title}
        </h3>

      </div>

      <div className="eventBottom">

        <div className="eventMeta">
          <span>{date}</span>
          <span className="divider">|</span>
          <span>{country}</span>
        </div>

        <div className="eventRead" onClick={() => { navigate("/eventview") }}>
          Read More <FiArrowRight />
        </div>

      </div>

    </div>

  )
}
