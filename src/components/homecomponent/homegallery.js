import g1 from "../../assets/g1.jpg";
import g2 from "../../assets/g2.jpg";
import g3 from "../../assets/g3.jpg";
import g4 from "../../assets/g4.jpg";
import g5 from "../../assets/g5.jpg";
import g6 from "../../assets/g6.jpg";
import g7 from "../../assets/g7.jpg";

import { FiArrowRight } from "react-icons/fi";

export default function HomeGallery(){

  return(

    <section className="homeGallerySection">

      {/* HEADER */}
      <div className="homeGalleryHeader">
        <h2 className="homeGalleryTitle">GALLERY</h2>

        <div className="homeGalleryView">
          View All <FiArrowRight/>
        </div>
      </div>

      {/* COLLAGE GRID */}
      <div className="homeGalleryGrid">

        <img src={g1} className="galleryItem g1"/>
        <img src={g2} className="galleryItem g2"/>
        <img src={g3} className="galleryItem g3"/>
        <img src={g4} className="galleryItem g4"/>
        <img src={g5} className="galleryItem g5"/>
        <img src={g6} className="galleryItem g6"/>
        <img src={g7} className="galleryItem g7"/>

      </div>

    </section>

  )
}
