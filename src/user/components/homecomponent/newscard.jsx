import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function NewsCard({ img, title, category }) {
  const navigate = useNavigate();
  return (
    <div className="homeNewsCard">
      {/* IMAGE */}
      <div className="newsImgWrap">
        <img src={img} alt="news" />
      </div>

      {/* CONTENT */}
      <div className="newsContent">
        {/* CATEGORY */}
        <span className="newsCategory">{category}</span>

        {/* TITLE */}
        <h3 className="newsTitles">{title}</h3>

        {/* DESCRIPTION */}
        <p className="newsDesc">
          Calling all young swimmers! Join our developmental program and start
          your path to excellence.
        </p>

        {/* READ MORE */}
        <button
          className="newsBtn"
          onClick={() => {
            navigate("/user/news");
          }}
        >
          Read Full Story <FiArrowRight />
        </button>
      </div>
    </div>
  );
}
