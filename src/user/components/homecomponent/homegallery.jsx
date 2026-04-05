import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import fallbackImg from "../../assets/event1.png";

export default function HomeGallery({ gallery }) {
  const navigate = useNavigate();

  const galleryList = Array.isArray(gallery) ? gallery : [];

  return (
    <section className="homeGallerySection">
      <div className="homeGalleryHeader">
        <h2 className="homeGalleryTitle">GALLERY</h2>

        <div className="readmore" onClick={() => navigate("/gallery")}>
          View All <FiArrowRight />
        </div>
      </div>
      

      <div className="homeGalleryGrid">
        {galleryList.length === 0 ? (
          <div className="mfsaEmptyState">
            <p>No gallery images available.</p>
          </div>
        ) : (
          galleryList
            .slice(0, 7)
            .map((item, index) => (
              <img
                key={item.id || index}
                src={item.image || fallbackImg}
                alt="gallery"
                className={`galleryItem g${index + 1}`}
              />
            ))
        )}
      </div>
    </section>
  );
}
