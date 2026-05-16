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
    { name: "Kedah", pts: "139,132,156,227,171,306,222,276,266,155,213,106,174,96" },
    { name: "Perlis", pts: "138,64,126,114,138,135,168,97" },
    { name: "Pulau Pinang", pts: "216,264 241,264 239,333 216,333 196,278 178,310 192,317" },
    { name: "Kelantan", pts: "369,409 397,343 425,310 425,260 462,234 482,202 498,174 530,197 549,228 523,260 535,303 524,334 544,347 553,382 523,400 404,419" },
    { name: "Sarawak", pts: "744,631,847,669,899,581,923,554,958,592,982,620,1009,652,979,701,936,716,831,734,773,690,737,663,1605,262 1583,275 1552,289 1486,299 1433,336 1419,370 1386,407 1331,427 1280,451 1246,465 1243,485 1192,478 1206,531 1190,575 1160,577 1103,564 1045,541 1098,605 1142,642 1216,621 1276,632 1349,554 1379,563 1435,598 1506,586 1569,513 1635,412 1640,344 1636,294 1626,246" },
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
                  <p onClick={()=>{navigate(`/state/${item.user}`)}}>{item.state_name}</p>
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

            {/* 🔥 NEW ATTRACTIVE POPUP */}
            {/* 🔥 NEW ATTRACTIVE POPUP */}
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
      transform: "translate(-50%, -115%)",
      zIndex: 1000,
      animation: "popupFade 0.25s ease",
    }}
  >
    <div
      style={{
        width: "290px",
        maxWidth: "90vw",
        borderRadius: "22px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(18px)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
        border: "1px solid rgba(255,255,255,0.5)",
        position: "relative",
      }}
    >
      {/* 🔥 FIXED SIZE TOP IMAGE */}
      <div
        style={{
          height: "120px",
          minHeight: "120px",
          maxHeight: "120px",
          overflow: "hidden",
          position: "relative",
          background: "#e5e7eb",
        }}
      >
        <img
          src={active.image}
          alt={active.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2))",
          }}
        />

        {/* STATE NAME */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "16px",
            color: "#fff",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "700",
              lineHeight: "1",
            }}
          >
            {active.name}
          </h3>

          <p
            style={{
              margin: "6px 0 0",
              fontSize: "12px",
              opacity: 0.9,
            }}
          >
            Malaysia State Network
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "18px",
        }}
      >
        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          {[
            {
              label: "Clubs",
              value: active.clubs,
            },
            {
              label: "Athletes",
              value: active.athletes,
            },
            {
              label: "Medals",
              value: active.medals || 0,
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: "#f8fafc",
                borderRadius: "14px",
                padding: "12px 8px",
                textAlign: "center",
                border: "1px solid #eef2f7",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {item.value}
              </div>

              <div
                style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  marginTop: "4px",
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => {
            if (active?.id) navigate(`/state/${active.id}`);
          }}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "14px",
            padding: "13px",
            background:
              "linear-gradient(135deg,#0f172a,#2563eb)",
            color: "#fff",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            transition: "0.3s",
            boxShadow:
              "0 10px 20px rgba(37,99,235,0.35)",
          }}
        >
          View State →
        </button>
      </div>

      {/* POINTER */}
      <div
        style={{
          position: "absolute",
          bottom: "-10px",
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: "20px",
          height: "20px",
          background: "white",
        }}
      />
    </div>

    {/* ANIMATION */}
    <style>
      {`
        @keyframes popupFade {
          from {
            opacity: 0;
            transform: translate(-50%, -100%) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -115%) scale(1);
          }
        }
      `}
    </style>
  </div>
)}
          </div>
        </div>

      </div>
    </section>
  );
}