import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
export default function NewsCard({ id, img, video, title, category ,content}) {
  const navigate = useNavigate();
  const { stateId, clubId } = useParams();

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
      {/* MEDIA */}
      {(img || video) && (
        <div className="newsImgWrap">
          {video ? (
            <video
              className="newsMedia"
              muted
              loop
              autoPlay
              playsInline
              preload="metadata"
            >
              <source src={video} type="video/mp4" />
            </video>
          ) : (
            <img src={img} alt="news" className="newsMedia" loading="lazy" />
          )}
        </div>
      )}

      {/* CONTENT */}
      <div className="newsContent">
        <span className="newsCategory">{category}</span>

        <h3 className="newsTitles">{title}</h3>

        <p className="newsDesc">
          {content}
        </p>

        <motion.button
          className="newsBtn"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (clubId) {
              navigate(`/state/${stateId}/club/${clubId}/news/${id}`);
            } else if (stateId) {
              navigate(`/state/${stateId}/news/${id}`);
            } else {
              navigate(`/news/${id}`);
            }
          }}
        >
          Read Full Story <FiArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
}
