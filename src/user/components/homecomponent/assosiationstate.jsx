import React, { useState, useRef } from "react";
import mapImg from "../../assets/malaysia-map.png";
import { useNavigate } from "react-router-dom";

export default function StateNetworkX() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

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
        "187,291,216,289,375,263,373,230,410,225,415,261,229,291,268,279,193,288,321,289,363,285,393,284,429,261,433,226",
        "364,135,370,199,370,238,424,236,416,189"
      ],
      circleCoords: ["367,135,25"], 
      rectCoords: [],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      price: "₹8,200",
    },
    {
      name: "Kedah Finswimming",
      circleCoords: ["61,53,15", "59,60,15"], 
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.3,
      price: "₹7,200",
    },
    {
      name: "Perlis Finswimming",
      // Rectangle: Top-Left (71,80) to Bottom-Right (135,100)
      // rectCoords: ["71,80,135,100"], 
      circleCoords: [
        // "98,66,15", 
        // "64,82,11",
        // "72,81,15",
        "113,84,15", // New precise coordinate
        "133,90,15",
      ], 
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.3,
      price: "₹7,200",
    }
  ];

  return (
    <section className="mfsaStateX-section">
      <div className="mfsaStateX-container">
        {/* LEFT LIST */}
        <div className="mfsaStateX-left">
          <span className="mfsaStateX-sub">NETWORK</span>
          <h2 className="mfsaStateX-title">Our States</h2>
          <div className="mfsaStateX-list">
            {states.map((item) => (
              <div
                key={item.name}
                className={`mfsaStateX-item ${active?.name === item.name ? "active" : ""}`}
                onMouseEnter={() => setActive(item)}
              >
                <span className="mfsaStateX-radio"></span>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT MAP */}
        <div className="mfsaStateX-right">
          <div className="map-container" ref={containerRef} style={{ position: "relative" }}>
            <img 
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
                    <area key={`rect-${i}`} shape="rect" coords={coords} onMouseMove={(e) => handleHover(e, state)} onMouseLeave={() => setActive(null)} href="#" onClick={(e) => e.preventDefault()} />
                  ))}
                  {/* POLYGONS */}
                  {state.polyCoords?.map((coords, i) => (
                    <area key={`poly-${i}`} shape="poly" coords={coords} onMouseMove={(e) => handleHover(e, state)} onMouseLeave={() => setActive(null)} href="#" onClick={(e) => e.preventDefault()} />
                  ))}
                  {/* CIRCLES */}
                  {state.circleCoords?.map((coords, i) => (
                    <area key={`circle-${i}`} shape="circle" coords={coords} onMouseMove={(e) => handleHover(e, state)} onMouseLeave={() => setActive(null)} href="#" onClick={(e) => e.preventDefault()} />
                  ))}
                </React.Fragment>
              ))}
            </map>

            {/* POPUP */}
            {active && (
              <div
                className="map-popup"
                style={{
                  position: "absolute",
                  top: popupPos.y,
                  left: popupPos.x,
                  transform: "translate(-50%, -105%)",
                  pointerEvents: "none", 
                  zIndex: 100,
                }}
              >
                <img src={active.image} alt={active.name} />
                <div className="popup-content">
                  <div className="popup-header">
                    <h4>{active.name}</h4>
                    <span>{active.price}</span>
                  </div>
                  <p>⭐ {active.rating} · Premium Center</p>
                  <button>Check Availability</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}