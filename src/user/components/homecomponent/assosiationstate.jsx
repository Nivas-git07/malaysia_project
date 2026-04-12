import React, { useState, useRef } from "react";
import mapImg from "../../assets/malaysia-map.png";
import { get_state } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";

export default function StateNetworkX() {
  const { data: stateData } = useQuery({
    queryKey: ["states"],
    queryFn: get_state,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const states = stateData?.data || [];

  const [active, setActive] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);

  const handleHover = (e, state) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    setActive(state);
    setPopupPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="mfsaStateX-section">
      <div className="mfsaStateX-container">

        <div className="mfsaStateX-left">
          <span className="mfsaStateX-sub">NETWORK</span>
          <h2 className="mfsaStateX-title">Our States</h2>

          <div className="mfsaStateX-list">
            {states.map((item) => (
              <div
                key={item.state_name}
                className={`mfsaStateX-item ${
                  active?.name === item.state_name ? "active" : ""
                }`}
                onClick={() => {
                  setActive({
                    name: item.state_name,
                    clubs: item.clubs_count,
                    athletes: item.athletes_count,
                    image:
                      item.image ||
                      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
                  });
                  setPopupPos({ x: 400, y: 300 });
                }}
              >
                <span className="mfsaStateX-radio"></span>
                <p>{item.state_name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mfsaStateX-right">
          <div
            className="map-container"
            ref={containerRef}
            style={{ position: "relative" }}
          >
            <img
              src={mapImg}
              alt="map"
              style={{ width: "100%", height: "auto" }}
            />

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

              {/* 🔥 ALL STATES FIXED */}
              {[
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
                { name: "Kedah", pts: "214,260 210,207 196,158 237,119 263,131 289,160 320,165 328,202 305,236 286,269 267,301 251,340 286,303 240,305" },
                { name: "Putrajaya", pts: "388,717 390,688 411,687 420,687 424,704 424,717 422,734 397,734 406,736" }
              ].map((s) => (
                <polygon
                  key={s.name}
                  points={s.pts}
                  fill="transparent"
                  stroke="transparent"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    handleHover(e, {
                      name: s.name,
                      clubs: 10,
                      athletes: 20,
                      image:
                        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                    })
                  }
                  onMouseLeave={() => setActive(null)}
                />
              ))}

            </svg>

            {/* POPUP */}
            {active && (
              <div
                className="map-popup"
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