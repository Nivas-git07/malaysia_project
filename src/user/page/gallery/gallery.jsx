import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get_particular_gallery, get_gallery } from "../../api/home_api";
import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import { NavLink } from "react-router-dom";
export default function Gallery() {
  const { stateId, clubId } = useParams();
   const isClub = !!clubId;
  const isState = !!stateId && !clubId;

  const params = clubId ? { clubId } : stateId ? { stateId } : null;
  const basePath = stateId
    ? clubId
      ? `/state/${stateId}/club/${clubId}`
      : `/state/${stateId}`
    : "";

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
        {basePath && (
          <nav className="heroNav">
            <ul>
              {isState && (
                <li>
                  <NavLink to={`/state/${stateId}`}>Home</NavLink>
                </li>
              )}
              {isClub && (
                <li>
                  <NavLink to={`/state/${stateId}/club/${clubId}`}>
                    Home
                  </NavLink>
                </li>
              )}

              {isState && (
                <li>
                  <NavLink to={`${basePath}/association`}>CLUBS</NavLink>
                </li>
              )}

              {isClub && (
                <li>
                  <NavLink to={`${basePath}/athlete`}>ATHLETES</NavLink>
                </li>
              )}
              <li>
                <NavLink to={basePath ? `${basePath}/event` : "/event"}>
                  EVENTS
                </NavLink>
              </li>
              <li>
                <NavLink to={basePath ? `${basePath}/news` : "/news"}>
                  NEWS
                </NavLink>
              </li>
              <li>
                <NavLink to={basePath ? `${basePath}/about` : "/about"}>
                  ABOUT
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
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
