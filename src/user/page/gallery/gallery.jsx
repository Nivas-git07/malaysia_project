import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get_particular_gallery, get_gallery } from "../../api/home_api";
import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
export default function Gallery() {
  const { stateId, clubId } = useParams();

  const params = clubId ? { clubId } : stateId ? { stateId } : null;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery", stateId, clubId],
    queryFn: () => (params ? get_particular_gallery(params) : get_gallery()),
  });

  const galleryList = Array.isArray(data?.data) ? data.data : [];

  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div>
      <Swimmer>
        <div className="homeHeroContent">
          <h1 className="homeHeroTitle">Gallery</h1>
          <p className="homeHeroSub">
            Explore memorable moments from our events, training sessions, and
            competitions.
            <br />
            Experience the passion, speed, and excellence of our finswimming
            community.
          </p>
        </div>
      </Swimmer>

      <section className="gallerySection">
        <div className="galleryContainer">
          <div className="galleryHeader">
            <h2>Gallery</h2>
            <p>Explore moments from events and competitions.</p>
          </div>

          {!isLoading && (isError || galleryList.length === 0) && (
            <div className="mfsaEmptyState">
              <p>No gallery images available.</p>
            </div>
          )}

          <div className="galleryGrid">
            {galleryList.slice(0, visibleCount).map((item, index) => (
              <div className="galleryCard" key={item.id || index}>
                <img src={item.image || img1} alt="gallery" />
              </div>
            ))}
          </div>

          {visibleCount < galleryList.length && (
            <div className="galleryFooter">
              <button className="loadBtn" onClick={handleLoadMore}>
                Load More Memories
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
