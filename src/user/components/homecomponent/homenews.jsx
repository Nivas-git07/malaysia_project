import NewsCard from "./newscard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import n1 from "../../assets/news1.jpg";
import n2 from "../../assets/news2.jpg";

export default function HomeNews({ news }) {
  const navigate = useNavigate();

  const newsList = Array.isArray(news) ? news : [];

  return (
    <section className="homeNewsSection">
      <div className="homeNewsHeader">
        <h2 className="homeNewsTitle">NEWS</h2>

        <div className="homeNewsArrows">
          <span className="readmore" onClick={() => navigate("/news")}>
            Read More
          </span>
        </div>
      </div>

      <div className="homeNewsGrid">
        {newsList.length === 0 ? (
          <div className="mfsaEmptyState">
            <p>No news available.</p>
          </div>
        ) : (
          newsList
            .slice(0, 3)
            .map((item) => (
              <NewsCard
                key={item.id}
                img={item.image || n1}
                title={item.title}
                category={item.category || "News"}
              />
            ))
        )}
      </div>
    </section>
  );
}
