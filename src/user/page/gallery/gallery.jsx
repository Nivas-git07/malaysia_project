import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { get_particular_gallery, get_gallery } from "../../api/home_api";
import Swimmer from "../../layout/swimmer";
import Footer from "../../layout/footer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import fallbackImg from "../../assets/event1.png";
import { get_content } from "../../api/home_api";
import { useCMSParams } from "../../../utils/cmsparam";
export default function Gallery() {
  const { stateId, clubId } = useParams();
  const isClub = !!clubId;
  const isState = !!stateId && !clubId;

  const cmsParams = useCMSParams("gallery");

  const { data: cmsData } = useQuery({
    queryKey: ["gallery-cms", cmsParams],
    queryFn: () => get_content(cmsParams),
  });

  const cms = cmsData?.data;

  console.log("The gallery content", cms);
  
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
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleLoadMore = () => setVisibleCount((p) => p + 6);

  const handlePrev = () =>
    setSelectedIndex((p) => (p === 0 ? galleryList.length - 1 : p - 1));

  const handleNext = () =>
    setSelectedIndex((p) => (p === galleryList.length - 1 ? 0 : p + 1));

  useEffect(() => {
    const onKey = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex, galleryList]);

  return (
    <div>
      <Swimmer>
        <div className="homeHeroContents">
          <h1 className="homeHeroTitle">Gallery</h1>
          <p className="homeHeroSub">
            {(
              cms?.gallery_page_description ||
              "Explore memorable moments from our events, training sessions, and competitions."
            )
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
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
            <p>
              {cms?.gallery_page_description ||
                "Explore moments from events and competitions."}
            </p>
          </div>

          {!isLoading && (isError || galleryList.length === 0) && (
            <div className="mfsaEmptyState">
              <p>No gallery media available.</p>
            </div>
          )}

          <div className="galleryGrid">
            {galleryList.slice(0, visibleCount).map((item, index) => (
              <div
                className="galleryCard"
                key={item.media_id || index}
                onClick={() => setSelectedIndex(index)}
              >
                {item.video ? (
                  <video
                    src={item.video}
                    className="galleryMedia"
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.image || fallbackImg}
                    alt="gallery"
                    className="galleryMedia"
                  />
                )}
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

      <Footer />
    </div>
  );
}
