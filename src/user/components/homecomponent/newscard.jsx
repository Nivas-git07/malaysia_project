import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewsCard({ img, title, category }) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="homeNewsCard"
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      {/* IMAGE */}
      <div className="newsImgWrap">
        <img src={img} alt="news" />
      </div>

      {/* CONTENT */}
      <div className="newsContent">
        <span className="newsCategory">{category}</span>

        <h3 className="newsTitles">{title}</h3>

        <p className="newsDesc">
          Calling all young swimmers! Join our developmental program and start
          your path to excellence.
        </p>

        <motion.button
          className="newsBtn"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/news")}
        >
          Read Full Story <FiArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
}