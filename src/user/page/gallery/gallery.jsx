import { FiSearch, FiFilter } from "react-icons/fi";
import img1 from "../../assets/event1.png";
import img2 from "../../assets/event2.png";
import img3 from "../../assets/event3.png";
import img4 from "../../assets/event4.png";
import img5 from "../../assets/event5.png";
import img6 from "../../assets/event6.png";
import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
export default function Gallery() {
  const images = [
    { id: 1, src: img1, tag: "NEW" },
    { id: 2, src: img2 },
    { id: 3, src: img3 },
    { id: 4, src: img4 },
    { id: 5, src: img5 },
    { id: 6, src: img6, tag: "POPULAR" },
  ];

  return (
    <div>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle"> Gallery</h1>
          <p className="homeHeroSub">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            commodi
            <br />
            Vivamus vehicula, lorem a porttitor porttitor, velit erat amet
            consectetur
          </p>
        </div>
      </Swimmer>

      <section className="gallerySection">
        <div className="galleryContainer">
          <div className="galleryHeader">
            <h2>Gallery</h2>
            <p>
              Explore moments from events, training, and competitions. Witness
              velocity and grace of Malaysia's finest finswimmers.
            </p>

            <button className="filterBtn">
              <FiFilter /> Filter Gallery
            </button>
          </div>

          <div className="galleryControls">
            <div className="searchBox">
              {/* <FiSearch />
            <input placeholder="Search by keyword..." /> */}
            </div>

            <div className="tabs">
              <button className="active">All</button>
              <button>Events</button>
              <button>Training</button>
              <button>Competition</button>
            </div>
          </div>

          <div className="galleryGrid">
            {images.map((item) => (
              <div className="galleryCard" key={item.id}>
                {item.tag && <span className="badge">{item.tag}</span>}

                <img src={item.src} alt="" />
              </div>
            ))}
          </div>

          <div className="galleryFooter">
            <p>Showing 6 of 120 moments</p>

            <div className="line"></div>

            <button className="loadBtn">Load More Memories</button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
