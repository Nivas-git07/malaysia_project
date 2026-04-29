import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import fallbackImg from "../../assets/event1.png";

export default function HomeGallery({ gallery }) {
  const navigate = useNavigate();
  const { stateId, clubId } = useParams();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loaded, setLoaded] = useState({});

  const galleryList = Array.isArray(gallery) ? gallery : [];

  useEffect(() => {
    setLoaded({});
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
    if (clubId && stateId) navigate(`/state/${stateId}/club/${clubId}/gallery`);
    else if (stateId) navigate(`/state/${stateId}/gallery`);
    else navigate("/gallery");
  };

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? galleryList.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev === galleryList.length - 1 ? 0 : prev + 1,
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

      <motion.div className="homeGalleryGrid">
        {galleryList.length > 0 ? (
          galleryList.slice(0, 7).map((item, index) => {
            const key = item.media_id || index;
            const isLoaded = loaded[key];

            return (
              <motion.div
                key={key}
                className={`galleryItemWrapper g${index + 1}`}
              >
                {!isLoaded && <div className="imageSkeleton" />}

                {item.video ? (
                  <video
                    src={item.video}
                    className={`galleryItem ${isLoaded ? "show" : "hide"}`}
                    muted
                    playsInline
                    onLoadedData={() =>
                      setLoaded((p) => ({ ...p, [key]: true }))
                    }
                    onClick={() => setSelectedIndex(index)}
                  />
                ) : (
                  <img
                    src={item.image || fallbackImg}
                    className={`galleryItem ${isLoaded ? "show" : "hide"}`}
                    onLoad={() => setLoaded((p) => ({ ...p, [key]: true }))}
                    onClick={() => setSelectedIndex(index)}
                  />
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="mfsaEmptyState">No media available</div>
        )}
      </motion.div>

      {selectedIndex !== null && (
        <div className="lightboxOverlay" onClick={() => setSelectedIndex(null)}>
          <div
            className="lightboxArrow left"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
          >
            <FiChevronLeft />
          </div>

          {galleryList[selectedIndex]?.video ? (
            <motion.video
              src={galleryList[selectedIndex].video}
              className="lightboxImage"
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <motion.img
              src={galleryList[selectedIndex]?.image || fallbackImg}
              className="lightboxImage"
              onClick={(e) => e.stopPropagation()}
            />
          )}

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
