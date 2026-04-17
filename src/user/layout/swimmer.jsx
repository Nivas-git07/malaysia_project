
import Navbar from "./navbar";
import video from "../assets/animate3.mp4"
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
            >
                <source src={video} type="video/mp4" />
            </video>

    
         



            {children}


        </section>
      </>
      
       
    );
}