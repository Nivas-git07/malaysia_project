import { useEffect, useRef, useState } from "react";
import aboutImg from "../../assets/image1.jpg";

export default function HomeAbout({ name }) {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShow(true);
      } else {
        setShow(false); 
      }
    },
    { threshold: 0.3 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);

  return (
    // <section className="mfsaAboutX-section">
    //   <div className="mfsaAboutX-container">
    //     {/* LEFT IMAGE */}
    //     <div className="mfsaAboutX-imageWrap">
    //       <img src={aboutImg} alt="about swimmer" />
    //     </div>

    //     {/* RIGHT CONTENT */}
    //     <div className="mfsaAboutX-content">
    //       <h4 className="mfsaAboutX-subtitle">WHO WE ARE</h4>

    //       <h2 className="mfsaAboutX-title">
    //         The Governing Body of Finswimming in Malaysia
    //       </h2>

    //       <p className="mfsaAboutX-text">
    // Established to foster excellence in the sport, the Malaysia
    // Finswimming Association (MFA) is dedicated to discovering and
    // nurturing world-class talent. We provide a platform for athletes to
    // compete at national and international levels while promoting the
    // sport as a healthy lifestyle.
    //       </p>

    //       {/* BOXES */}
    //       <div className="mfsaAboutX-cards">
    //         <div className="mfsaAboutX-card">
    //           <h5>Our Mission</h5>
    //           <p>Building a vibrant community of elite finswimmers.</p>
    //         </div>

    //         <div className="mfsaAboutX-card">
    //           <h5>Our Vision</h5>
    //           <p>Leading the sport to Olympic recognition in Asia.</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section
      ref={sectionRef}
      className={`mfsaAboutX-section ${show ? "show" : ""}`}
    >
      <div className="mfsaAboutX-container">
        {/* IMAGE */}
        <div className="mfsaAboutX-imageWrap fade-left">
          <img src={aboutImg} alt="about swimmer" />
        </div>

        {/* CONTENT */}
        <div className="mfsaAboutX-content fade-right">
          <h4 className="mfsaAboutX-subtitle fade-up">WHO WE ARE</h4>

          <h2 className="mfsaAboutX-title fade-up delay-1">
            The Governing Body of Finswimming in Malaysia
          </h2>

          <p className="mfsaAboutX-text fade-up delay-2">
            Established to foster excellence in the sport, the Malaysia
            Finswimming Association (MFA) is dedicated to discovering and
            nurturing world-class talent. We provide a platform for athletes to
            compete at national and international levels while promoting the
            sport as a healthy lifestyle.
          </p>

          <div className="mfsaAboutX-cards">
            <div className="mfsaAboutX-card fade-up delay-3">
              <h5>Our Mission</h5>
              <p>Building a vibrant community of elite finswimmers.</p>
            </div>

            <div className="mfsaAboutX-card fade-up delay-4">
              <h5>Our Vision</h5>
              <p>Leading the sport to Olympic recognition in Asia.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
