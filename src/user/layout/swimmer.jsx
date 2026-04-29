import Navbar from "./navbar";
import video from "../assets/animate5.mp4";
import poster from "../assets/logo.jpg";
export default function Swimmer({ children }) {
    return (
      <>
      <Navbar/>
       <section className="hero">
          

            {/* VIDEO BACKGROUND */}
            <video
                className="heroVideo"
                autoPlay
                muted
                loop
                playsInline
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