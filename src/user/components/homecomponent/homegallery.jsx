import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import fallbackImg from "../../assets/event1.png";

export default function HomeGallery({ gallery }) {
  const navigate = useNavigate();
  const { stateId, clubId } = useParams();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  const galleryList = Array.isArray(gallery) ? gallery : [];

  useEffect(() => {
    setLoadedImages({});
  }, [galleryList]);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, galleryList]);

  const handleNavigateGallery = () => {
    if (clubId && stateId) {
      navigate(`/state/${stateId}/club/${clubId}/gallery`);
    } else if (stateId) {
      navigate(`/state/${stateId}/gallery`);
    } else {
      navigate("/gallery");
    }
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? galleryList.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === galleryList.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="homeGallerySection">
      <div className="homeGalleryHeader">
        <h2 className="homeGalleryTitle">GALLERY</h2>

        <div className="readmore" onClick={handleNavigateGallery}>
          View All <FiArrowRight />
        </div>
      </div>

      <motion.div
        className="homeGalleryGrid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {galleryList.length > 0 ? (
          galleryList.slice(0, 7).map((item, index) => {
            const key = item.id || `${index}-${item.image}`;
            const isLoaded = loadedImages[key];

            return (
              <motion.div
                key={key}
                className={`galleryItemWrapper g${index + 1}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
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
                  onClick={() => setSelectedIndex(index)}
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

      {selectedIndex !== null && (
        <div
          className="lightboxOverlay"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="lightboxArrow left"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            <FiChevronLeft />
          </div>

          <motion.img
            src={
              galleryList[selectedIndex]?.image || fallbackImg
            }
            alt="preview"
            className="lightboxImage"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className="lightboxArrow right"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <FiChevronRight />
          </div>
        </div>
      )}
    </section>
  );
}