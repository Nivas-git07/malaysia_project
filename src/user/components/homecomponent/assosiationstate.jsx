import { useState } from "react";
import mapImg from "../../assets/malaysia-map.png";
import { useNavigate } from "react-router-dom";

export default function StateNetworkX() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [popupPos, setPopupPos] = useState({ x: 0, y: 0 });

  const handleListHover = (e, state) => {
    const container = document.querySelector(".map-container");

    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    // approximate position from state config
    const x = (parseFloat(state.left) / 100) * containerRect.width;
    const y = (parseFloat(state.top) / 100) * containerRect.height;

    setActive(state);

    setPopupPos({
      x: x,
      y: y - 20,
    });
  };

  const states = [
    {
      name: "Perlis Finswimming",
      top: "20%",
      left: "38%",
      width: "60px",
      height: "60px",
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101c",
      rating: 4.2,
      price: "₹6,500",
    },
    {
      name: "Kedah Finswimming",
      top: "28%",
      left: "40%",
      width: "70px",
      height: "70px",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      rating: 4.3,
      price: "₹7,200",
    },
    {
      name: "Penang Finswimmers",
      top: "40%",
      left: "37%",
      width: "70px",
      height: "70px",
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101c",
      rating: 4.6,
      price: "₹8,100",
    },
    {
      name: "Perak Aquatics",
      top: "48%",
      left: "42%",
      width: "80px",
      height: "80px",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.4,
      price: "₹7,800",
    },
    {
      name: "Selangor Aquatics Club",
      top: "58%",
      left: "42%",
      width: "80px",
      height: "80px",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.3,
      price: "₹7,200",
    },
    {
      name: "Kuala Lumpur Finswimming",
      top: "60%",
      left: "44%",
      width: "60px",
      height: "60px",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      rating: 4.5,
      price: "₹9,606",
    },
    {
      name: "Negeri Sembilan Club",
      top: "65%",
      left: "46%",
      width: "70px",
      height: "70px",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      rating: 4.2,
      price: "₹6,900",
    },
    {
      name: "Melaka Fins Club",
      top: "70%",
      left: "48%",
      width: "70px",
      height: "70px",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      rating: 4.1,
      price: "₹6,700",
    },
    {
      name: "Johor Finswimming Association",
      top: "78%",
      left: "52%",
      width: "90px",
      height: "90px",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      rating: 4.2,
      price: "₹6,900",
    },
    {
      name: "Kelantan Fins",
      top: "35%",
      left: "55%",
      width: "70px",
      height: "70px",
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101c",
      rating: 4.3,
      price: "₹7,300",
    },
    {
      name: "Terengganu Aquatics",
      top: "45%",
      left: "55%",
      width: "70px",
      height: "70px",
      image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb2101c",
      rating: 4.4,
      price: "₹7,600",
    },
    {
      name: "Pahang Fins Club",
      top: "55%",
      left: "50%",
      width: "80px",
      height: "80px",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.3,
      price: "₹7,400",
    },
    {
      name: "Sabah Finswimming",
      top: "58%",
      left: "80%",
      width: "100px",
      height: "100px",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.5,
      price: "₹8,200",
    },
    {
      name: "Sarawak Finswimming",
      top: "60%",
      left: "70%",
      width: "110px",
      height: "110px",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      rating: 4.4,
      price: "₹8,000",
    },
  ];

  return (
    <section className="mfsaStateX-section">
      <div className="mfsaStateX-container">
        {/* LEFT */}
        <div className="mfsaStateX-left">
          <span className="mfsaStateX-sub">NETWORK</span>
          <h2 className="mfsaStateX-title">Our States</h2>

          <p className="mfsaStateX-text">
            We have registered clubs in all major states across Malaysia.
          </p>

          <div className="mfsaStateX-list">
            {states.map((item) => (
              <div
                key={item.name}
                className={`mfsaStateX-item ${
                  active?.name === item.name ? "active" : ""
                }`}
                onMouseEnter={(e) => handleListHover(e, item)}
                onMouseLeave={() => setActive(null)}
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
          <div className="map-container">
            <img src={mapImg} alt="Malaysia map" />

            {/* STATE AREAS */}
            {states.map((state) => (
              <div
                key={state.name}
                className="map-area"
                style={{
                  top: state.top,
                  left: state.left,
                  width: state.width,
                  height: state.height,
                }}
                onMouseEnter={(e) => handleEnter(e, state)}
                onMouseLeave={() => setActive(null)}
              />
            ))}

            {/* POPUP */}
            {active && (
              <div
                className="map-popup"
                style={{
                  top: popupPos.y,
                  left: popupPos.x,
                }}
                onMouseEnter={() => setActive(active)}
                onMouseLeave={() => setActive(null)}
              >
                <img src={active.image} alt="" />

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
