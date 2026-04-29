import { useEffect, useState } from "react";
import Navbar from "./navbar";
import video from "../assets/animate5.mp4";
import poster from "../assets/logo.jpg";
export default function SwimmerHero({ children }) {
    const [showMobileControls, setShowMobileControls] = useState(false);

    useEffect(() => {
      const updateControls = () => setShowMobileControls(window.innerWidth <= 768);
      updateControls();
      window.addEventListener("resize", updateControls);
      return () => window.removeEventListener("resize", updateControls);
    }, []);

    return (
      <>
      <Navbar/>
       <section className="herosmall">
          

           
            <video
                className="heroVideo"
                autoPlay
                muted
                loop
                playsInline
                controls={showMobileControls}
                preload="metadata"
                poster={poster}
            >
                <source src={video} type="video/mp4" />
            </video>

            {children}

        </section>
      </>
    );
}