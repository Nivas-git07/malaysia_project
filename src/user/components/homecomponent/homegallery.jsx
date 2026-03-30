import g1 from "../../assets/event1.png";
import g2 from "../../assets/event2.png";
import g3 from "../../assets/event4.png";
import g4 from "../../assets/event5.png";
import g5 from "../../assets/background2.png";
import g7 from "../../assets/feature2.png";
import g6 from "../../assets/event6.png";
import { useNavigate } from "react-router-dom";

import { FiArrowRight } from "react-icons/fi";

export default function HomeGallery() {
  const navigate = useNavigate();

  return (
    <section className="homeGallerySection">
      {/* HEADER */}
      <div className="homeGalleryHeader">
        <h2 className="homeGalleryTitle">GALLERY</h2>

        <div
          className="homeGalleryView"
          onClick={() => navigate("/user/gallery")}
        >
          View All <FiArrowRight />
        </div>
      </div>

      {/* COLLAGE GRID */}
      <div className="homeGalleryGrid">
        <img src={g1} className="galleryItem g1" />
        <img src={g2} className="galleryItem g2" />
        <img src={g3} className="galleryItem g3" />
        <img src={g4} className="galleryItem g4" />
        <img src={g5} className="galleryItem g5" />
        <img src={g6} className="galleryItem g6" />
        <img src={g7} className="galleryItem g7" />
      </div>
    </section>
  );
}
