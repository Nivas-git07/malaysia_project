import { useEffect, useRef, useState } from "react";
import aboutImg from "../../assets/image1.jpg";

export default function HomeAbout(){

  const sectionRef = useRef(null);
  const [show,setShow] = useState(false);

  useEffect(()=>{

    const observer = new IntersectionObserver(
      ([entry])=>{
        if(entry.isIntersecting){
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold:0.3 }
    );

    if(sectionRef.current){
      observer.observe(sectionRef.current);
    }

  },[]);

  return(

    <section
      ref={sectionRef}
      className={`homeAboutSection ${show ? "show" : ""}`}
    >

      <div className="homeAboutContainer">

        {/* LEFT CONTENT */}
        <div className="homeAboutLeft">

          <h3 className="homeAboutHeading">
            ABOUT FINSWIMMING Association
          </h3>

          <h2 className="homeAboutTitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>

          <p className="homeAboutPara">
            orem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula, lorem a porttitor porttitor, velit erat tincidunt lorem, in pulvinar justo turpis vitae eros. Curabitur nec nisi in ipsum dignissim lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="homeAboutRight">
          <img src={aboutImg} alt="about swimmer"/>
        </div>

      </div>

    </section>

  )
}
