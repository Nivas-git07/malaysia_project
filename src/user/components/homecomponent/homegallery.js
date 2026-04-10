import { useState } from "react";
import g1 from "../../assets/g1.jpg";
import g2 from "../../assets/g2.jpg";
import g3 from "../../assets/g3.jpg";
import g4 from "../../assets/g4.jpg";
import g5 from "../../assets/g5.jpg";
import g6 from "../../assets/g6.jpg";
import g7 from "../../assets/g7.jpg";

import { FiArrowRight } from "react-icons/fi";

export default function HomeGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [g1, g2, g3, g4, g5, g6, g7];

  return (
    <>
      <section className="homeGallerySection">

        {/* HEADER */}
        <div className="homeGalleryHeader">
          <h2 className="homeGalleryTitle">GALLERY</h2>

          <div className="homeGalleryView">
            View All <FiArrowRight />
          </div>
        </div>

        {/* GRID */}
        <div className="homeGalleryGrid">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={`galleryItem g${index + 1}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
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
            className="lightboxImage"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}