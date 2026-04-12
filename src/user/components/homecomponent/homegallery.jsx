import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import fallbackImg from "../../assets/event1.png";
import { motion } from "framer-motion";

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
          {galleryList && galleryList.length > 0 ? (
            galleryList.slice(0, 7).map((item, index) => (
              <motion.img
                key={item.id || index}
                src={item.image || fallbackImg}
                alt="gallery"
                className={`galleryItem g${index + 1}`}
                onClick={() =>
                  setSelectedImage(item.image || fallbackImg)
                }
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))
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