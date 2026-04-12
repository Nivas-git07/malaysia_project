import React, { useState, useRef } from "react";
import mapImg from "../../assets/malaysia-map.png";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function StateNetworkX() {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const states = stateData?.data || [];

  const normalize = (str) =>
    str?.toLowerCase().replace(/\s+/g, "").trim();

  const stateMap = {};
  states.forEach((s) => {
    stateMap[normalize(s.state_name)] = s;
  });

  const [active, setActive] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  /* 🔥 CENTER CALCULATION */
  const getPolygonCenter = (points) => {
    const coords = points.split(" ").map(p => p.split(",").map(Number));
    let x = 0, y = 0;
    coords.forEach(([px, py]) => {
      x += px;
      y += py;
    });
    return {
      x: x / coords.length,
      y: y / coords.length,
    };
  };

  /* 🔥 COMMON FUNCTION (USED BY LEFT + RIGHT) */
  const showPopup = (stateName, pts) => {
    if (!containerRef.current) return;

    const matched = stateMap[normalize(stateName)];

    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = rect.width / 2000;
    const scaleY = rect.height / 907;

    const center = getPolygonCenter(pts);

    setIsHovering(true);

    setActive({
      id: matched?.user || null,
      name: stateName,
      clubs: matched?.clubs_count || 0,
      athletes: matched?.athletes_count || 0,
      image:
        matched?.image ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    });

    setPopupPos({
      x: center.x * scaleX,
      y: center.y * scaleY,
    });
  };

  const POLYGONS = [
    { name: "Pahang", pts: "376,441 565,411 595,442 667,536 687,591 687,663 708,753 625,731 466,626 454,616" },
    { name: "Perak", pts: "221,358 323,277 406,238 420,286 371,393 357,443 385,491 397,549 350,558 277,533" },
    { name: "Johor", pts: "544,812 568,713 644,759 699,761 729,761 743,768 775,837 808,936 757,892 729,911 697,927 568,848 685,927" },
    { name: "Terengganu", pts: "547,234 534,297 555,370 604,439 631,441 614,495 673,523 701,474 694,418 683,380 624,294" },
    { name: "Negeri Sembilan", pts: "436,771 434,697 475,651 508,651 521,663 551,683 565,690 560,727 545,757" },
    { name: "Melaka", pts: "461,778 494,768 531,768 530,780 538,815 498,803" },
    { name: "Selangor", pts: "376,703 427,667 455,653 425,577 390,568 288,551" },
    { name: "Sabah", pts: "1643,296 1626,239 1643,195 1705,137 1732,87 1746,47 1776,73 1795,82 1818,91 1836,110 1808,160 1873,142 1866,176 1898,165 1924,183 1938,190 1979,193 1984,216 1883,268 1910,289 1873,301" },
    { name: "Perlis", pts: "177,124 198,90 214,112 178,147 199,133" },
    { name: "Pulau Pinang", pts: "216,264 241,264 239,333 216,333 196,278 178,310 192,317" },
    { name: "Kelantan", pts: "369,409 397,343 425,310 425,260 462,234 482,202 498,174 530,197 549,228 523,260 535,303 524,334 544,347 553,382 523,400 404,419" },
    { name: "Sarawak", pts: "1605,262 1583,275 1552,289 1486,299 1433,336 1419,370 1386,407 1331,427 1280,451 1246,465 1243,485 1192,478 1206,531 1190,575 1160,577 1103,564 1045,541 1098,605 1142,642 1216,621 1276,632 1349,554 1379,563 1435,598 1506,586 1569,513 1635,412 1640,344 1636,294 1626,246" },
    { name: "Putrajaya", pts: "388,717 390,688 411,687 420,687 424,704 424,717 422,734 397,734 406,736" }
  ];

  return (
    <section className="mfsaStateX-section">
      <div className="mfsaStateX-container">

        {/* LEFT SIDE */}
        <div className="mfsaStateX-left">
          <span className="mfsaStateX-sub">NETWORK</span>
          <h2 className="mfsaStateX-title">Our States</h2>
          <p className="mfsaStateX-text">
            We have registered clubs in all major states across Malaysia.
          </p>

          <div className="mfsaStateX-list">
            {states.map((item) => {
              const polygon = POLYGONS.find(
                (s) => normalize(s.name) === normalize(item.state_name)
              );

              return (
                <div
                  key={item.state_name}
                  className={`mfsaStateX-item ${active?.name === item.state_name ? "active" : ""}`}
                  onMouseEnter={() => {
                    if (polygon) showPopup(item.state_name, polygon.pts);
                  }}
                  onMouseLeave={() => {
                    setIsHovering(false);
                    setActive(null);
                  }}
                >
                  <span className="mfsaStateX-radio"></span>
                  <p>{item.state_name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="mfsaStateX-right">
          <div className="map-container" ref={containerRef} style={{ position: "relative" }}>
            <img src={mapImg} alt="map" style={{ width: "100%" }} />

            {/* SVG HOVER */}
            <svg
              viewBox="0 0 2000 907"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {POLYGONS.map((s) => (
                <polygon
                  key={s.name}
                  points={s.pts}
                  fill="transparent"
                  stroke="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => showPopup(s.name, s.pts)}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      if (!isHovering) setActive(null);
                    }, 200);
                  }}
                />
              ))}
            </svg>

            {/* POPUP */}
            {active && (
              <div
                className="map-popup"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                  setIsHovering(false);
                  setActive(null);
                }}
                style={{
                  position: "absolute",
                  top: popupPos.y,
                  left: popupPos.x,
                  transform: "translate(-50%, -120%)",
                  zIndex: 100,
                }}
              >
                <div className="popup-card">
                  <div className="popup-img">
                    <img src={active.image} alt={active.name} />
                  </div>

                  <div className="popup-content">
                    <h4 className="popup-title">{active.name}</h4>

                    <div className="popup-stats">
                      <div className="statItem">
                        <span>Clubs</span>
                        <strong>{active.clubs}</strong>
                      </div>

                      <div className="statItem">
                        <span>Athletes</span>
                        <strong>{active.athletes}</strong>
                      </div>

                      <div className="statItem">
                        <span>Medals</span>
                        <strong>{active.medals || 0}</strong>
                      </div>
                    </div>

                    <button
                      className="popup-btn"
                      onClick={() => {
                        if (active?.id) navigate(`/state/${active.id}`);
                      }}
                    >
                      View State
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}