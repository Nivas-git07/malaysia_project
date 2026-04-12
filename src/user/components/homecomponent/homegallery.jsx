import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
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
    <AnimatePresence>
      <motion.section
        className="homeGallerySection"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.4 }}
      >
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
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {galleryList.length > 0 ? (
            galleryList.slice(0, 7).map((item, index) => {
              const isLoaded = loadedImages[index];

              return (
                <motion.div
                  key={item.id || index}
                  className={`galleryItemWrapper g${index + 1}`}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
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
                        [index]: true,
                      }))
                    }
                    onClick={() =>
                      setSelectedImage(item.image || fallbackImg)
                    }
                  />
                </motion.div>
              );
            })
          ) : (
            <motion.div
              className="mfsaEmptyState"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>No gallery images available.</p>
            </motion.div>
          )}
        </motion.div>

        {/* LIGHTBOX */}
        {selectedImage && (
          <motion.div
            className="lightboxOverlay"
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImage}
              alt="preview"
              className="lightboxImage"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </motion.section>
    </AnimatePresence>
  );
}