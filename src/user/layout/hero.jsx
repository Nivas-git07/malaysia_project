import Navbar from "./navbar";
import video from "../assets/animate5.mp4";
export default function SwimmerHero({ children }) {
  return (
    <>
      <Navbar />
      <section className="herosmall">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
         
        >
          <source src={video} type="video/mp4" />
        </video>

        {children}
      </section>
    </>
  );
}
