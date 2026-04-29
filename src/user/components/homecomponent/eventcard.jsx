import { FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function EventCardX({ id, bg, title, date, location }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="mfsaEventX-card"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
     
      <div className="mfsaEventX-imgWrap">
        <img src={bg} alt="event" />

 
        <div className="mfsaEventX-date">{date}</div>
      </div>

     
      <div className="mfsaEventX-body">
        <h3 className="mfsaEventX-title">{title}</h3>

        <div className="mfsaEventX-location">
          <FiMapPin />
          <span>{location}</span>
        </div>

        <motion.button
          className="mfsaEventX-btn"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(`/eventview/${id}`)}
        >
          Register Now
        </motion.button>
      </div>
    </motion.div>
  );
}