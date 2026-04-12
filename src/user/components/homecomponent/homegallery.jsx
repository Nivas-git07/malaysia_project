import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import fallbackImg from "../../assets/event1.png";

export default function HomeGallery({ gallery }) {
  const navigate = useNavigate();
  const { stateId, clubId } = useParams();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

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
    <section className="homeGallerySection">
      
      {/* HEADER */}
      <div className="homeGalleryHeader">
        <h2 className="homeGalleryTitle">GALLERY</h2>

        <div className="readmore" onClick={handleNavigateGallery}>
          View All <FiArrowRight />
        </div>
      </div>

      {/* GRID */}
      <motion.div
        className="homeGalleryGrid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {galleryList.length > 0 ? (
          galleryList.slice(0, 7).map((item, index) => {
            const key = item.id || index;
            const isLoaded = loadedImages[key];

            return (
              <motion.div
                key={key}
                className={`galleryItemWrapper g${index + 1}`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {/* Skeleton */}
                {!isLoaded && <div className="imageSkeleton" />}

                <img
                  src={item.image || fallbackImg}
                  alt="gallery"
                  loading="lazy"
                  className={`galleryItem ${
                    isLoaded ? "show" : "hide"
                  }`}
                  onLoad={() =>
                    setLoadedImages((prev) => ({
                      ...prev,
                      [key]: true,
                    }))
                  }
                  onError={(e) => {
                    e.target.src = fallbackImg;
                    setLoadedImages((prev) => ({
                      ...prev,
                      [key]: true,
                    }));
                  }}
                  onClick={() =>
                    setSelectedImage(item.image || fallbackImg)
                  }
                />
              </motion.div>
            );
          })
        ) : (
          <div className="mfsaEmptyState">
            <p>No gallery images available.</p>
          </div>
        )}
      </motion.div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="lightboxOverlay"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="preview"
            className="lightboxImage"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        </div>
      )}
    </section>
  );
}