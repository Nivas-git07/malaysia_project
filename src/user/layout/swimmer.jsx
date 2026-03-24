import Navbar from "./navbar";
import image from "../assets/event.png";
import "../style/event.css";

export default function Swimmer({ children }) {
  return (
    <section className="hero">
    
      <img src={image} alt="Event Background" className="heroImage" />
      
      {/* 2. THE DARK BLUE OVERLAY (Between Image and Text) */}
      <div className="heroOverlay"></div>

      {/* 3. NAVBAR (Positioned at the top) */}
      <div className="heroNavbarWrapper">
        <Navbar />
      </div>

      {/* 4. CENTERED CONTENT (Shield, Title, Subtitle) */}
      <div className="heroContent">
        <div className="container">
          <div className="heroFlex">
            {/* The Badge Circle */}
            <div className="heroIconBadge">
              <span className="shieldIcon">🛡️</span>
            </div>

            <h1 className="heroTitle">ALL EVENTS</h1>

            <p className="heroSubtitle">
              Johor Finswimming Association Official Competition 
              <p >Calendar</p>
            </p>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}