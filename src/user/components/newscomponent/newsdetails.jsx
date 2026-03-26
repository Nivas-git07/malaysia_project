import avatar from "../../assets/logo.jpg";
import img from "../../assets/image2.jpg";

export default function NewsDetailX() {
  return (
    <section className="mfsaNewsDetailX-section">
      <div className="mfsaNewsDetailX-container">
        {/* ===== TITLE ===== */}
        <h1 className="mfsaNewsDetailX-title">
          The Evolution of Monofin Technology in Competitive Finswimming
        </h1>

        {/* ===== AUTHOR ===== */}
        <div className="mfsaNewsDetailX-author">
          <img src={avatar} alt="author" />
          <div>
            <p className="name">Admin</p>
            <span>Oct 12, 2025</span>
          </div>
        </div>

        {/* ===== HERO IMAGE ===== */}
        <div className="mfsaNewsDetailX-hero">
          <img src={img} alt="news" />
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="mfsaNewsDetailX-main">
          {/* LEFT CONTENT */}
          <div className="mfsaNewsDetailX-content">
            {/* INTRO */}
            <p className="mfsaNewsDetailX-intro">
              Finswimming is often described as the Formula 1 of the aquatic
              world. Much like high-performance racing, the difference between
              gold and silver often rests in the meticulous engineering of the
              equipment.
            </p>

            <p className="mfsaNewsDetailX-subIntro">
              The journey of the monofin began in the late 1960s with rigid
              rubber constructions that offered power but lacked responsiveness.
              Today, we stand at the precipice of a new era, where
              aerospace-grade materials and computational fluid dynamics (CFD)
              are redefining what it means to move through water.
            </p>

            {/* TITLE */}
            <h2 className="mfsaNewsDetailX-heading">
              Material Science: The Carbon Revolution
            </h2>

            <p className="mfsaNewsDetailX-text">
              The most significant leap in recent years has been the transition
              from fiberglass to multi-layered carbon fiber laminates. Unlike
              traditional materials, carbon fiber allows for “variable
              stiffness” across the blade.
            </p>

            {/* 🔥 FEATURE BLOCK */}
            <div className="mfsaNewsDetailX-feature">
              <div className="featureLeft">
                <h4>⚡ Key Technological Advancements</h4>

                <ul>
                  <li>
                    <b>Anatomic Foot-Pockets:</b> 3D-scanned custom liners that
                    eliminate energy loss through friction and discomfort.
                  </li>
                  <li>
                    <b>Hydro-Wings:</b> Side stabilizers that prevent blade
                    torsion.
                  </li>
                  <li>
                    <b>Reactive Resin Matrix:</b> Specialized adhesives that
                    maintain elasticity.
                  </li>
                </ul>
              </div>

              <div className="featureRight">
                <img src={img} alt="fin" />
              </div>
            </div>

            {/* NEXT SECTION */}
            <h2 className="mfsaNewsDetailX-heading">
              The Biomechanical Impact
            </h2>

            <p className="mfsaNewsDetailX-text">
              With better technology comes a shift in training methodology.
              Modern mono-fins require less “brute force” and more “harmonic
              resonance.” Athletes are now trained to find the natural frequency
              of their blade.
            </p>

            <p className="mfsaNewsDetailX-text">
              As we look toward the 2025 championships, the focus is shifting
              toward AI-integrated feedback systems embedded within the fin
              itself.
            </p>

            {/* MEDIA */}
            <h3 className="mfsaNewsDetailX-subHeading">Article Media</h3>

            <div className="mfsaNewsDetailX-gallery">
              <img src={img} />
              <img src={img} />
              <img src={img} />
            </div>
            <div className="mfsaLoadMoreWrapX">
              <button className="mfsaLoadMoreBtnX">Load More News →</button>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="mfsaNewsSidebarX">
            {/* ===== RELATED NEWS ===== */}
            <div className="mfsaSidebarBlockX">
              <h5 className="mfsaSidebarTitleX">Related News</h5>

              <div className="mfsaSidebarItemX">
                <img src={img} alt="" />
                <span className="tag">Competition</span>
                <p>National Championships: Venue and Dates Announced</p>
              </div>

              <div className="mfsaSidebarItemX">
                <img src={img} alt="" />
                <span className="tag">Nutrition</span>
                <p>Optimizing Recovery for High-Intensity Fin Drills</p>
              </div>
            </div>

            {/* ===== MOST READ ===== */}
            <div className="mfsaSidebarMostX">
              <h5>Most Read</h5>

              <div className="mfsaMostItemX">
                <span>01</span>
                <div>
                  <p>Understanding the Dolphin Kick Mechanics</p>
                  <small>45k Views</small>
                </div>
              </div>

              <div className="mfsaMostItemX">
                <span>02</span>
                <div>
                  <p>Olympic Recognition Status: 2024 Update</p>
                  <small>30k Views</small>
                </div>
              </div>

              <div className="mfsaMostItemX">
                <span>03</span>
                <div>
                  <p>Top 5 Finswimming Academies in Southeast Asia</p>
                  <small>28k Views</small>
                </div>
              </div>
            </div>

            {/* ===== SUBSCRIBE ===== */}
            <div className="mfsaSidebarSubscribeX">
              <h4>Stay Elite.</h4>
              <p>Get the latest technical analysis and competition updates.</p>

              <input placeholder="Your email address" />

              <button>SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
