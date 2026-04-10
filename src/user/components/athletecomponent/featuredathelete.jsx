import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import a1 from "../../assets/feature1.png";
import a2 from "../../assets/feature2.png";
import a3 from "../../assets/feature3.png";

export default function FeaturedAthletes({ data }) {

  const athletes = [
    {
      img: a1,
      name: "Ahmad Zaki",
      record: "500m, Bi-fins • Johor Bahru Club",
      tag: "Record Holder"
    },
    {
      img: a2,
      name: "Sarah Chen",
      record: "100m, Surface • Southern Sharks",
      tag: "National Champ"
    },
    {
      img: a3,
      name: "Marcus Lim",
      record: "4×100m Relay • Kulai Dolphins",
      tag: "Rising Star"
    },
  ];

  return (
    <section className="featuredSection">

      {/* TOP */}
      <div className="featuredTop">
        <h2 className="featuredTitle">Featured Athletes</h2>

        <div className="featuredNav">
          <button><FiArrowLeft /></button>
          <button><FiArrowRight /></button>
        </div>
      </div>

      
      <div className="featuredGrid">
        {athletes.map((item, index) => (
          <div className="featureCard" key={index}>

      
            <img src={item.img} alt="" />

          
            <div className="overlay"></div>

            
            <div className="contentBox">

              <span className="tag">{item.tag}</span>

              <h3>{item.name}</h3>

              <p>{item.record}</p>

            </div>

          </div>
        ))}
      </div>

    </section>
  );
}