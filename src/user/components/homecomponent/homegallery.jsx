import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import fallbackImg from "../../assets/event1.png";

export default function HomeGallery({ gallery }) {
  const navigate = useNavigate();
  const { stateId, clubId } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);

  const galleryList = Array.isArray(gallery) ? gallery : [];

  const handleNavigateGallery = () => {
    if (clubId && stateId) {
      navigate(`/state/${stateId}/club/${clubId}/gallery`);
    } else if (stateId) {
      navigate(`/state/${stateId}/gallery`);
    } else {
      navigate("/gallery");
    }
  };

  return (
    <>
      <section className="homeGallerySection">
        
        {/* HEADER */}
        <div className="homeGalleryHeader">
          <h2 className="homeGalleryTitle">GALLERY</h2>

          <div className="readmore" onClick={handleNavigateGallery}>
            View All <FiArrowRight />
          </div>
        </div>

        {/* GRID */}
        <div className="homeGalleryGrid">
          {galleryList.length === 0 ? (
            <div className="mfsaEmptyState">
              <p>No gallery images available.</p>
            </div>
          ) : (
            galleryList.slice(0, 7).map((item, index) => (
              <img
                key={item.id || index}
                src={item.image || fallbackImg}
                alt="gallery"
                className={`galleryItem g${index + 1}`}
                onClick={() =>
                  setSelectedImage(item.image || fallbackImg)
                }
              />
            ))
          )}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div
          className="lightboxOverlay"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="preview"
            className="lightboxImage"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}