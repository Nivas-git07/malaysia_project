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
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="mfsaNewsDetailX-sidebar">
            {/* RELATED */}
            <div className="mfsaNewsCardX">
              <h4>Related News</h4>

              <div className="sideItem">
                <img src={img} alt="" />
                <p>National Championships Announced</p>
              </div>

              <div className="sideItem">
                <img src={img} alt="" />
                <p>Olympic Swimmers Push Training Limits</p>
              </div>
            </div>

            {/* MOST READ */}
            <div className="mfsaNewsCardX">
              <h4>Most Read</h4>

              <div className="mostItem">
                <span>01</span>
                <p>Understanding the Dynamics of Monofins</p>
              </div>

              <div className="mostItem">
                <span>02</span>
                <p>Olympic Success Stories</p>
              </div>
            </div>

            {/* SUBSCRIBE */}
            <div className="mfsaSubscribeX">
              <h4>Stay Elite.</h4>
              <p>Get updates on competitions and news.</p>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
