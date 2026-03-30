import React, { useState, useRef } from "react";
import mapImg from "../../assets/malaysia-map.png";
import { useNavigate } from "react-router-dom";

export default function StateNetworkX() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  const scaleCoords = (coords, img) => {
    if (!img) return coords;

    const scaleX = img.clientWidth / 1536;
    const scaleY = img.clientHeight / 1024;

    return coords
      .split(",")
      .map((val, i) =>
        i % 2 === 0 ? Math.round(val * scaleX) : Math.round(val * scaleY),
      )
      .join(",");
  };

  const getStateCenter = (state, img) => {
    if (!img) return { x: 0, y: 0 };

    const scaleX = img.clientWidth / 1536;
    const scaleY = img.clientHeight / 1024;

    if (state.circleCoords) {
      const [x, y] = state.circleCoords[0].split(",").map(Number);
      return { x: x * scaleX, y: y * scaleY };
    }

    if (state.rectCoords && state.rectCoords.length > 0) {
      const [x1, y1, x2, y2] = state.rectCoords[0].split(",").map(Number);
      return {
        x: ((x1 + x2) / 2) * scaleX,
        y: ((y1 + y2) / 2) * scaleY,
      };
    }

    if (state.polyCoords) {
      const points = state.polyCoords[0].split(",").map(Number);

      let sumX = 0;
      let sumY = 0;
      let count = 0;

      for (let i = 0; i < points.length; i += 2) {
        sumX += points[i];
        sumY += points[i + 1];
        count++;
      }

      return {
        x: (sumX / count) * scaleX,
        y: (sumY / count) * scaleY,
      };
    }

    return { x: 0, y: 0 };
  };

  const scaleCircle = (coords, img) => {
    if (!img) return coords;

    const [x, y, r] = coords.split(",").map(Number);

    const scaleX = img.clientWidth / 1536;
    const scaleY = img.clientHeight / 1024;

    return [
      Math.round(x * scaleX),
      Math.round(y * scaleY),
      Math.round(r * ((scaleX + scaleY) / 2)),
    ].join(",");
  };

  const handleHover = (e, state) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    setActive(state);
    setPopupPos({
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top,
    });
  };

  const states = [
    {
      name: "Sabah Finswimming",
      polyCoords: [
        "669,805,818,670,1063,494,1262,303,1301,267,1351,361,1383,409,1401,428,1429,447,1457,453,1477,461,1489,479,1188,540,1123,668,1127,697,1110,721,1110,743,1086,765,1046,780,1008,796,829,818,753,826,722,829,703,834,730,843,681,820,635,782,619,746,650,763,670,763,687,762,699,763,706,758,1151,600,1150,630,1155,639,1158,604,1276,539,1299,544,1334,551,1380,499,1195,541,1348,555,1357,550,1376,559,1399,551,1422,536,1398,513,1375,503,1151,600,703,792,1422,495",
      ],
      clubs: 12,
      athletes: 180,
      medals: 45,
      rectCoords: [],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      price: "₹8,200",
    },
    {
      name: "Pulau Pinang Finswimming",
      polyCoords: ["158,311,266,331,293,459,245,456,205,441,182,423,176,403"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      clubs: 6,
      athletes: 90,
      medals: 38,
      rating: 4.5,
      price: "₹8,200",
    },
    {
      name: "Kedah Finswimming",
      circleCoords: ["168,205,76"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.3,
      clubs: 9,
      athletes: 110,
      medals: 42,

      price: "₹7,200",
    },
    {
      name: "Selangor Finswimming",
      polyCoords: [
        "205,453,262,464,305,458,328,471,328,510,312,512,319,527,302,529,287,539,251,509",
      ],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      clubs: 15,
      athletes: 200,
      medals: 50,
      price: "₹8,200",
    },
    {
      name: "Perak Finswimming",
      polyCoords: [
        "277,379,314,353,345,356,372,356,400,356,415,349,437,371,432,383,433,405,449,412,460,413,466,429,472,437,455,445,432,448,410,455,391,459,369,467,358,470,342,477,305,451",
      ],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      clubs: 10,
      athletes: 150,
      medals: 40,
      price: "₹8,200",
    },
    {
      name: "Tunk-Jayra Finswimming",
      polyCoords: [
        "346,488,365,478,393,474,413,467,432,460,447,452,466,453,479,441,470,467,479,475,491,453,484,467,488,480,496,494,502,510,498,526,498,544,510,560,521,574,525,594,461,586,377,520,342,510",
      ],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      clubs: 5,
      athletes: 75,
      medals: 30,
      price: "₹8,200",
    },
    {
      name: "Kuala Lumpur Finswimming",
      polyCoords: [
        "283,569,300,544,325,535,340,528,357,527,367,532,384,559,404,550,389,536,348,580,313,597,377,558,389,566,404,567,301,595",
      ],
      clubs: 8,
      athletes: 120,
      medals: 35,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      price: "₹8,200",
    },
    {
      name: "Melaka Finswimming",
      clubs: 4,
      athletes: 60,
      medals: 25,
      polyCoords: [
        "340,616,338,584,361,579,371,575,392,570,407,574,428,577,408,645,424,653,351,649,348,665,415,668",
      ],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      price: "₹8,200",
    },
    {
      name: "Negeri Sembilan Finswimming",
      polyCoords: [
        "422,643,419,619,426,592,438,586,457,593,472,597,492,597,506,608,523,613,538,603,541,616,547,635,557,645,570,657,568,669,590,679,591,703,519,694,509,700",
      ],
      clubs: 7,
      athletes: 100,
      medals: 28,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      price: "₹8,200",
    },
    {
      name: "Kelantan Finswimming",
      clubs: 3,
      athletes: 50,
      medals: 20,
      polyCoords: [
        "275,343,303,278,317,221,355,180,383,212,409,233,437,255,488,312,503,371,501,408,466,436,418,344,365,365,355,353,281,371",
      ],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      price: "₹8,200",
    },
    {
      name: "Perlis Finswimming",
      clubs: 2,
      athletes: 30,
      medals: 15,
      polyCoords: [
        "210,276,248,244,285,223,310,276,286,294,275,332,206,314,187,302,275,318,161,320,200,330,231,332,254,332,268,330,172,314",
      ],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.3,
      price: "₹7,200",
    },
  ];

  return (
    <section className="mfsaStateX-section">
      <div className="mfsaStateX-container">
        <div className="mfsaStateX-left">
          <span className="mfsaStateX-sub">NETWORK</span>
          <h2 className="mfsaStateX-title">Our States</h2>
          <p className="mfsaStateX-text">
            We have registered clubs in all major states across Malaysia. Find a
            center near you to start your finswimming journey.
          </p>
          <div className="mfsaStateX-list">
            {states.map((item) => (
              <div
                key={item.name}
                className={`mfsaStateX-item ${active?.name === item.name ? "active" : ""}`}
                onMouseEnter={() => {
                  if (!imgRef.current) return;

                  const pos = getStateCenter(item, imgRef.current);

                  setActive(item);
                  setPopupPos(pos);
                }}
                onMouseLeave={() => {
                  setActive("");
                }}
                onClick={() => navigate(`/user/${item.name}`)}
              >
                <span className="mfsaStateX-radio"></span>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT MAP */}
        <div className="mfsaStateX-right">
          <div
            className="map-container"
            ref={containerRef}
            style={{ position: "relative" }}
          >
            <img
              ref={imgRef}
              src={mapImg}
              useMap="#malaysia-map"
              alt="Malaysia map"
              style={{ display: "block", width: "100%", height: "auto" }}
            />

            <map name="malaysia-map">
              {states.map((state) => (
                <React.Fragment key={state.name}>
                  {/* RECTANGLES */}
                  {state.rectCoords?.map((coords, i) => (
                    <area
                      key={`rect-${i}`}
                      shape="rect"
                      coords={scaleCoords(coords, imgRef.current)}
                      onMouseMove={(e) => handleHover(e, state)}
                      onMouseLeave={() => setActive(null)}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    />
                  ))}

                  {/* POLYGONS */}
                  {state.polyCoords?.map((coords, i) => (
                    <area
                      key={`poly-${i}`}
                      shape="poly"
                      coords={scaleCoords(coords, imgRef.current)}
                      onMouseMove={(e) => handleHover(e, state)}
                      onMouseLeave={() => setActive(null)}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    />
                  ))}

                  {/* CIRCLES */}
                  {state.circleCoords?.map((coords, i) => (
                    <area
                      key={`circle-${i}`}
                      shape="circle"
                      coords={scaleCircle(coords, imgRef.current)}
                      onMouseMove={(e) => handleHover(e, state)}
                      onMouseLeave={() => setActive(null)}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    />
                  ))}
                </React.Fragment>
              ))}
            </map>

            {active && (
              <div
                className="map-popup"
                style={{
                  position: "absolute",
                  top: popupPos.y,
                  left: popupPos.x,
                  transform: "translate(-50%, -110%)",
                  pointerEvents: "none",
                  zIndex: 100,
                }}
              >
                <div className="popup-card">
                  {/* IMAGE */}
                  <div className="popup-img">
                    <img src={active.image} alt={active.name} />
                  </div>

                  {/* CONTENT */}
                  <div className="popup-content">
                    {/* TITLE */}
                    <h4 className="popup-title">{active.name}</h4>

                    {/* STATS */}
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
                        <strong>{active.medals}</strong>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <button className="popup-btn" onClick={()=>{navigate(`/user/${active.name}`)}}>View Details →</button>
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
