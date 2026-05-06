import NewsCard from "./newscard";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomeNews({ news }) {
  const navigate = useNavigate();
  const newsList = Array.isArray(news) ? news : [];

  return (
    <section className="homeNewsSection">

      {/* HEADER */}
      <motion.div
        className="homeNewsHeader"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="homeNewsTitle">NEWS</h2>

        <div className="homeNewsArrows">
          <span className="readmore" onClick={() => navigate("/news")}>
            Read More <FiArrowRight />
          </span>
        </div>
      </motion.div>

      {/* GRID */}
      <motion.div
        className="homeNewsGrid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {newsList.length === 0 ? (
          <div className="mfsaEmptyState">
            <p>No News available.</p>
          </div>
        ) : (
          newsList.slice(0, 3).map((item) => (
            <NewsCard
              key={item.id}
              img={item.image}
              video = {item.video}
              title={item.title}
              category={item.category || "News"}
            />
          ))
        )}
      </motion.div>
    </section>
  );
}